import { zValidator } from '@hono/zod-validator';
import { HTTPException } from 'hono/http-exception';
import { z } from 'zod';
import { Hono } from 'hono';
import { OPEN_WEATHER_MAP_WEATHER_URL, OPEN_WEATHER_SEARCH_URL } from './constants';
import { WeatherData, WeatherSearchData } from './types';

type Bindings = {
  OPEN_WEATHER_MAP_API: string;
  OPEN_WEATHER_MAP_SEARCH_API: string;
};
const app = new Hono<{ Bindings: Bindings }>().basePath('/api');

const searchRoute = app.get(
  '/search',
  zValidator(
    'query',
    z.object({
      q: z.string().min(3),
    }),
  ),
  async (c) => {
    const { q } = c.req.valid('query');

    const fetchUrl = `${OPEN_WEATHER_SEARCH_URL}?q=${q.trim()}&type=like&sort=population&cnt=30&appid=${
      c.env.OPEN_WEATHER_MAP_SEARCH_API
    }`;
    const data = await fetch(fetchUrl)
      .then((res) => {
        if (res.status !== 200) {
          if (res.status === 400) {
            throw new HTTPException(400, { res: res.clone() });
          }
          throw new Error('Failed to fetch');
        }
        return res;
      })
      .then((res) => res.json());

    return c.jsonT<WeatherSearchData>(data);
  },
);

type GetWeatherQuery =
  | {
      q: string;
    }
  | {
      lat: number;
      lon: number;
    };
const weatherDataRoute = app.get(
  '/weather',
  zValidator(
    'query',
    z.union([
      z.object({
        q: z.string().min(3),
      }),
      z.object({
        lat: z.preprocess((val) => Number(val), z.number()),
        lon: z.preprocess((val) => Number(val), z.number()),
      }),
    ]) as any,
  ),
  async (c) => {
    // I know...But typescript is hard shit
    const query = c.req.valid('query' as never) as GetWeatherQuery;

    let fetchUrl = OPEN_WEATHER_MAP_WEATHER_URL;
    if ('q' in query) {
      fetchUrl = fetchUrl + `?q=${query.q}&appid=${c.env.OPEN_WEATHER_MAP_API}&units=metric`;
    } else {
      fetchUrl =
        fetchUrl +
        `?lat=${query.lat}&lon=${query.lon}&appid=${c.env.OPEN_WEATHER_MAP_API}&units=metric`;
    }

    const data = await fetch(fetchUrl)
      .then((res) => {
        if (res.status !== 200) {
          if (res.status === 400) {
            throw new HTTPException(400, { res: res.clone() });
          }
          throw new Error('Failed to fetch');
        }
        return res;
      })
      .then((res) => res.json());

    return c.jsonT<WeatherData>(data);
  },
);

/**
 * Not found handler
 */
app.get('*', (c) => {
  return c.jsonT(
    {
      success: false,
      errors: {
        issues: [
          {
            code: 'not_found',
            message: 'The requested resource was not found.',
          },
        ],
        name: 'NotFound',
      },
    },
    404,
  );
});

/**
 * Error handler
 */
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    // Get the custom response
    return err.getResponse();
  }
  console.error(err);
  return c.json(
    {
      success: false,
      errors: {
        issues: [
          {
            code: 'internal_server_error',
            message: 'An internal server error occurred.',
          },
        ],
        name: 'InternalServerError',
      },
    },
    500,
  );
});

export default app;

export type AppSearch = typeof searchRoute;
export type AppWeatherData = typeof weatherDataRoute;
