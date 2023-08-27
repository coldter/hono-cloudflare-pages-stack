import { handle } from 'hono/cloudflare-pages';
import app from '../../lib/hono';

export const onRequest = handle(app);
