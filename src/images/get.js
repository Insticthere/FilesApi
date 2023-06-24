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
            <div style="background-color:black; text-align:center; padding: 5px;">
                <img src="${src}">
            </div>
            `
      )     
  });
};