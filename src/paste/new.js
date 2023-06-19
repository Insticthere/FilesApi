import connectMongo from "../../utils/connectMongo.js";
import { nanoid } from "nanoid";

export default function newEndpoint(app) {
  app.post("/p/new", async (c) => {
    const body = await c.req.parseBody()
    if (!body.code || body.code == "") return c.json('No code found!')
    let id = nanoid(8);
    const client = await connectMongo();
    const db = client.db();

    const urlObj = {
      code: body.code,
      time : new Date(),
      id : id
    }

    await db.collection("urls").insertOne(urlObj);

    return c.json({code : id}, 200)  

  });
}
