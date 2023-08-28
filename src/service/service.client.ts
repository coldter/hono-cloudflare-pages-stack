import { hc } from 'hono/client';
import type { AppSearch, AppWeatherData } from '../../lib/hono/index';

export const appSearchClient = hc<AppSearch>('/');
export const appWeatherDataClient = hc<AppWeatherData>('/');
