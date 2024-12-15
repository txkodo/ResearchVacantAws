import { Hono } from 'hono';
import { handle } from 'hono/aws-lambda';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

const app = new Hono();

app.get(
  '/foo/:id',
  zValidator(
    'param',
    z.object({
      id: z.string(),
    })
  ),
  async (c) => {
    return c.text(`foo!! ${c.req.param().id}`);
  }
);

app.post('/bar', async (c) => {
  c.text('bar!!');
});

export const handler = handle(app);
