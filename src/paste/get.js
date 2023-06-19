import connectMongo from "../../utils/connectMongo.js";

export default function getPaste(app) {
  app.get("/p/:id", async (c) => {
    const { id: id } = c.req.param();
    const client = await connectMongo();
    const db = client.db();

    const url = await db.collection("paste").findOne({ id: id });

    if (!url) return c.json("No paste found.")

    return c.json({url}, 200)  

  });
}
