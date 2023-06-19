import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import getUrl from "./src/url/get.js";
import uploadUrl from "./src/url/upload.js";
import deleteUrl from "./src/url/delete.js";
import uploadPaste from './src/paste/new.js';
import getPaste from './src/paste/get.js';

const app = new Hono({ strict: false })

getUrl(app)
uploadUrl(app)
deleteUrl(app)
uploadPaste(app)
getPaste(app)

serve({
    fetch: app.fetch,
    port: 8787,
  })

// u for url, i for images, p for paste bin, f for files

app.get('/u/upload', (c) => c.text('Provide a url', 400))
app.get('/u/get', (c) => c.text('Provide a code', 400))
app.get('/u/del', (c) => c.text('Provide a code', 400))
app.get('/p/get', (c) => c.text('Provide a code', 400))
export default app;
  

