import { Hono } from 'hono'
import { handle } from 'hono/aws-lambda'

const app = new Hono()

app.get('/foo', (c) => c.text('foo!!'))

app.get('/bar', (c) => c.text('bar!!'))

export const handler = handle(app)