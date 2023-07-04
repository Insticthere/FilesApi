import connectMongo from "../../utils/connectMongo.js";

export default function getUrl(app) {
    app.get('/u/get/:id', async (c) => {
      const { id: id } = c.req.param();
  
      try {
        const client = await connectMongo();
        const db = client.db();
        
        const url = await db.collection("urls").findOne({ id: id });
  
        if (!url) {
          return c.json({ error: "URL not found." }, 200);
        }
  
        return c.json({url : url.url, id : id});
  
      } catch (err) {
        console.log(err);
        return c.json({ error: "An error occurred while retrieving the URL." }, 500);
      }
    });
  }