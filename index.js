import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'
import getEndpoint from "./src/get.js";
import upload from "./src/upload.js";

const app = new Hono()

app.use('*', prettyJSON())

getEndpoint(app)
upload(app)

serve({
    fetch: app.fetch,
    port: 8787,
  })

app.get('/api/upload/', (c) => c.text('Provide a url', 400))
app.get('/api/get', (c) => c.text('Provide a url', 400))
app.get('/api/*', (c) => {
  return c.json('API endpoint is not found', 404)
})

export default app;
  

