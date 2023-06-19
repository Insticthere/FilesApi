import { serve } from '@hono/node-server'
import { Hono } from 'hono'
// import { html } from 'hono/html'
import getUrl from "./src/url/get.js";
import uploadUrl from "./src/url/upload.js";
import deleteUrl from "./src/url/delete.js";
import uploadPaste from './src/paste/new.js';

const app = new Hono({ strict: false })

getUrl(app)
uploadUrl(app)
deleteUrl(app)
uploadPaste(app)

serve({
    fetch: app.fetch,
    port: 8787,
  })

// u for url, i for images, p for paste bin, f for files

app.get('/u/upload', (c) => c.text('Provide a url', 400))
app.get('/u/get', (c) => c.text('Provide a code', 400))
app.get('/u/del', (c) => c.text('Provide a code', 400))
app.get('/p', (c) => c.text('Provide a code', 400))



app.get('/u/*', (c) => {
  return c.json('API endpoint is not found', 404)
})
app.get('/p/*', (c) => {
  return c.json('API endpoint is not found', 404)
})

export default app;
  

