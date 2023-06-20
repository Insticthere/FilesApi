import connectMongo from "../../utils/connectMongo.js";

export default function deletePaste(app) {
  app.get("/p/del/:id", async (c) => {
    const { id: id } = c.req.param();
    const { key } = c.req.query();

    if (!key) return c.json({ error: "Key not found." }, 200);

    if (key !== process.env.KEY) return c.json({ error: "Wrong key" }, 400);

    try {
      const client = await connectMongo();
      
      const db = client.db();

      const deleted = await db.collection("paste").deleteOne({ id });

      if (deleted.deletedCount == 0) return c.json({ message: "No url found" });
      

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
