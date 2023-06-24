import { Deta } from 'deta';

const deta = Deta();

const drive = deta.Drive('files');
const images = deta.Base('images')

export default function delImage(app) {
  app.get("/i/del/:id", async (c) => {
    const { id: id } = c.req.param();
    const { key } = c.req.query();

    if (!key) return c.json({ error: "No key" }, 400);
    if (key !== process.env.KEY) return c.json({ error: "Wrong key" }, 400);

    const data = await images.get(id)

    if (data === null) return c.json('no image found');

    await images.delete(data.key)
    await drive.delete(`${id}.${data.type}`); 

    return c.json('deleted')
  });
};