import connectMongo from "../../utils/connectMongo.js";

export default function deleteUrl(app) {
  app.get("/u/del/:id", async (c) => {
    const { id: id } = c.req.param();
    const { key } = c.req.query();

    if (!key) return c.json({ error: "Key not found." }, 200);
    if (key !== process.env.KEY) return c.json({ error: "Wrong key" }, 400);

    try {
      const client = await connectMongo();
      const db = client.db();

      const url = await db.collection("urls").findOne({ id: id });

      if (!url) return c.json({ message: "No url found" });

      await db.collection("urls").deleteOne({ id });

      return c.json({ message: "URL deleted successfully." });

    } catch (err) {
      console.log(err);
      return c.json(
        { error: "An error occurred while deleting the URL." },
        500
      );
    }
  });
}
