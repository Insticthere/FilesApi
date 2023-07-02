import connectMongo from "../../utils/connectMongo.js";
import { nanoid } from "nanoid";

export default function uploadPaste(app) {
  app.post("/p/new", async (c) => {
    let lang;
    const body = await c.req.parseBody()
    if (!body.code || body.code == "") return c.json({error : 'No code found!'})
    if (!body.lang || body.lang == "") lang = null;
    lang = body.lang;
    let id = nanoid(8);
    const client = await connectMongo();
    const db = client.db();

    const urlObj = {
      code: body.code,
      time : Date.now(),
      id : id,
      lang : lang,
    };

    await db.collection("paste").insertOne(urlObj);

    return c.json({code : id}, 200)  

  });
}
