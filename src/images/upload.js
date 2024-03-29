import { Deta } from 'deta';
import { nanoid } from "nanoid";

const deta = Deta();

const drive = deta.Drive('files');
const images = deta.Base('images')

export default function uploadImage(app) {
  app.post("/i/new", async (c) => {
    
    const { image } = await c.req.parseBody();

    const { key } = c.req.query();
  
    if (!image || image.type.split("/")[0] !== "image") return c.json({error : 'please provide a image'});

    if (!key) return c.json({ error: "No key" }, 400);
    if (key !== process.env.KEY) return c.json({ error: "Wrong key" }, 400);
  
    let id = nanoid(8);
      
    const buffer = await image.arrayBuffer();

    const view = new Uint8Array(buffer);
  
    const removedPart = image.type.split("/").pop();

    const data = {
      key : id,
      date : Date.now(),
      name : image.name,
      type : removedPart,
      size: image.size,
    }

    await images.put(data);
    await drive.put(`${id}.${removedPart}`, { data: view });

    return c.json({
      id : id,
      url : `${new URL(c.req.url).protocol}//${c.req.headers.get('host')}/i/get/${id}`,
      image: image.name
    }, 200);
     
  });
}