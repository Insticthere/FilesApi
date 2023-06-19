import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { html } from 'hono/html'
import getEndpoint from "./src/url/get.js";
import upload from "./src/url/upload.js";

const app = new Hono({ strict: false })

getEndpoint(app)
upload(app)

serve({
    fetch: app.fetch,
    port: 8787,
  })

// s for url, i for images, p for paste bin, f for files

app.get('/api/upload', (c) => c.text('Provide a url', 400))
app.get('/api/get', (c) => c.text('Provide a url', 400))
app.get('/api/*', (c) => {
  return c.json('API endpoint is not found', 404)
})

export default app;
  

