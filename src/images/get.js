import { Deta } from 'deta';
import { html } from 'hono/html'

const deta = Deta();

const drive = deta.Drive('files');
const images = deta.Base('images')

export default function getImage(app) {
  app.get("/i/get/:id", async (c) => {
    const { id: id } = c.req.param();

    const data = await images.get(id)

    if (data === null) return c.json('no image found');

    const response = await drive.get(`${id}.${data.type}`); 

    if (response == null) return c.json('no image found');

    const buffer = Buffer.from(await response.arrayBuffer());
    const base64Data = buffer.toString('base64');
    const src = `data:${response.type};base64,${base64Data}`;

    return c.html(
         html`
         <head>
         <title>${data.name}</title>
          </head>
          <body style="margin: 0px; background: #0e0e0e; height: 100%">
          <img src="${src}" style="display: block;-webkit-user-select: none;margin: auto;background-color: hsl(0, 0%, 90%);transition: background-color 300ms;">
          </body>
            `
      )     
  });
};