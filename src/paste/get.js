import connectMongo from "../../utils/connectMongo.js";

export default function getPaste(app) {
  app.get("/p/get/:id", async (c) => {
    const { id: id } = c.req.param();
    const client = await connectMongo();
    const db = client.db();

    const paste = await db.collection("paste").findOne({ id: id });

    if (!paste) return c.json({error : "No paste found."})

    return c.json({ 
      code : paste.code,
      lang : paste.lang,
      timer : paste.time,
      id : paste.id
    }, 200); 

  });
}
