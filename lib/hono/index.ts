import { zValidator } from '@hono/zod-validator';
import { HTTPException } from 'hono/http-exception';
import { z } from 'zod';
import { Hono } from 'hono';

type Bindings = {
  hono: string;
};
const app = new Hono<{ Bindings: Bindings }>().basePath('/api');

app.get(
  '/hello',
  zValidator(
    'query',
    z.object({
      name: z.string(),
    }),
  ),
  (c) => {
    const { name } = c.req.valid('query');
    return c.jsonT({
      message: `Hello ${name}!`,
    });
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

export type App = typeof app;

export default app;
