import { Deta } from 'deta';
import { html } from 'hono/html'

const deta = Deta();

const drive = deta.Drive('files');
const images = deta.Base('images')

export default function rawImage(app) {
  app.get("/i/raw/:id", async (c) => {
    const { id: id } = c.req.param();

    const data = await images.get(id)

    if (data === null) return c.json({ error :'no image found'});

    const response = await drive.get(`${id}.${data.type}`); 

    if (response == null) return c.json({ error : 'no image found'});

    const buffer = Buffer.from(await response.arrayBuffer());

    c.header('Cache-Control', 'public, max-age=31536000, immutable');
    c.header('Content-Type', `image/${data.type}`)
    return c.body(buffer);

  });
};