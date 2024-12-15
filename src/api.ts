import { Hono } from 'hono';
import { handle } from 'hono/aws-lambda';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} from '@aws-sdk/client-dynamodb';

const app = new Hono();

const { TABLE_NAME } = z.object({ TABLE_NAME: z.string() }).parse(process.env);

app.get(
  '/record/:id',
  zValidator(
    'param',
    z.object({
      id: z.string(),
    })
  ),
  async (c) => {
    const { id } = c.req.param();
    const db = new DynamoDBClient();
    const res = await db.send(
      new GetItemCommand({
        TableName: TABLE_NAME,
        Key: { id: { S: id } },
      })
    );
    return c.json(res.Item);
  }
);

app.post(
  '/record',
  zValidator(
    'json',
    z.object({
      id: z.string(),
      text: z.string(),
    })
  ),
  async (c) => {
    const { id, text } = await c.req.json();

    const db = new DynamoDBClient();
    const res = await db.send(
      new PutItemCommand({
        TableName: TABLE_NAME,
        Item: {
          id: { S: id },
          text: { S: text },
        },
      })
    );
    console.log(res);
    return c.json({ message: 'success' });
  }
);

export const handler = handle(app);
