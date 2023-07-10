import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import getUrl from "./src/url/get.js";
import uploadUrl from "./src/url/upload.js";
import deleteUrl from "./src/url/delete.js";
import uploadPaste from './src/paste/new.js';
import getPaste from './src/paste/get.js';
import deletePaste from './src/paste/delete.js';
import uploadImage from './src/images/upload.js';
import getImage from './src/images/get.js';
import delImage from './src/images/delete.js';
import rawImage from './src/images/raw.js';

const app = new Hono({ strict: false })

app.use( // no questions to be asked for this
  '*',
  cors({
    
  })
)

getUrl(app)
uploadUrl(app)
deleteUrl(app)
uploadPaste(app)
getPaste(app)
deletePaste(app)
uploadImage(app)
getImage(app)
delImage(app)
rawImage(app)

serve({
    fetch: app.fetch,
    port: 8787,
  })

// u for url, i for images, p for paste bin, f for files

app.get('/', (c) => c.text('Just a basic file api!', 200))

app.get('/u/get', (c) => c.json('Provide a code', 400))
app.get('/u/del', (c) => c.json('Provide a code', 400))
app.get('/p/get', (c) => c.json('Provide a code', 400))
export default app;