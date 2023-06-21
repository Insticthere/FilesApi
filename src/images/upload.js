import { Deta } from 'deta';
import { nanoid } from "nanoid";
import { extension } from "mime-types";

const deta = Deta();

const drive = deta.Drive('files');

export default function uploadImage(app) {
  app.post("/i/new", async (c) => {
  
    let id = nanoid(8);
    
    const { img : image } = await c.req.parseBody()
  
    if (!image || image.type.split("/")[0] !== "image") return c.json('please provide a image');
  
    const buffer = await image.arrayBuffer();
    const view = new Uint8Array(buffer);
  
    const removedPart = image.type.split("/").pop();
    
    await drive.put(`${id}.${removedPart}`, { data: view });
    return c.text(`uploaded as ${id}`, 200);
     
  });
}