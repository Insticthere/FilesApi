import { Deta } from 'deta';
import { html } from 'hono/html'

const deta = Deta();

const drive = deta.Drive('files');
const images = deta.Base('images')

export default function getImage(app) {
  app.get("/i/get/:id", async (c) => {
    const { id: id } = c.req.param();

    const data = await images.get(id)

    if (data === null) return c.json({ error :'no image found'});

    const response = await drive.get(`${id}.${data.type}`); 

    if (response == null) return c.json({ error :'no image found'});

    const buffer = Buffer.from(await response.arrayBuffer());
    const base64Data = buffer.toString('base64');
    const src = `data:${response.type};base64,${base64Data}`;

    const imageUrl = `${new URL(c.req.url).protocol}//${c.req.headers.get('host')}/i/get/${id}`

    c.header('Cache-Control', 'public, max-age=31536000, immutable');

      return c.html(
        html`
          <head>
            <title>${data.name}</title>
            <meta charset="utf-8">
            <meta name="robots" content="noindex">
            <meta name="theme-color" content="#30acff">
            <meta property="og:title" content="${data.name}">
            <meta property="og:description" content="Uploaded at ${data.date}">
            <meta property="og:image" content="${imageUrl}">
            <meta name="viewport" content="width=device-width, minimum-scale=0.1">
          </head>

          <body style="margin: 0; background: #0e0e0e; display: flex; align-items: center; justify-content: center; height: 100vh;">
            <img src="${src}" style="max-width: 100%; height: auto;">
          </body>
        `
      );     
  });
};