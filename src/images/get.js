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

    const imageUrl = `https://${c.req.headers.get('host')}/i/raw/${id}`

    c.header('Cache-Control', 'public, max-age=31536000, immutable');

    return c.html(
         html`
      <html style="height: 100%;">
        <head>
          <title>${data.name}</title>
          <meta charset="utf-8">
          <meta name="robots" content="noindex">
          <meta name="theme-color" content="#30acff">
          <meta property="og:title" content="${data.name}">
          <meta property="og:description" content="Uploaded at ${data.date}">
          <meta property="og:image" content="${imageUrl}">
          <meta property="twitter:card" content="summary_large_image">
          <meta name="viewport" content="width=device-width, minimum-scale=0.1">
        </head>

        <body style="margin: 0px; background: #0e0e0e; height: 100%;">
          <img src="${src}" style="display: block;-webkit-user-select: none;margin: auto;background-color: hsl(0, 0%, 90%);transition: background-color 300ms;">
        </body>
      </html>
            `
      )     
  });
};