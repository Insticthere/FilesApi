import connectMongo from "../../utils/connectMongo.js";
import { nanoid } from "nanoid";
let regex =
  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

let customCode = false;

export default function uploadUrl(app) {
  app.post("/u/upload", async (c) => {

    let id = nanoid(8);
    const { code, key, url: urlParam } = await c.req.parseBody();

    if (urlParam == undefined || urlParam == "") return c.json({ error: "Provide a url" }, 400);

    if (code !== undefined && code !== "") {
      if (!key) return c.json({ error: "No key" }, 400);
      if (key !== process.env.KEY) return c.json({ error: "Wrong key" }, 400);
      customCode = true;
      id = code;
    }

    if (!urlParam.match(regex))
      return c.json({ error: "Please provide a valid URL." }, 400);

    try {
      const client = await connectMongo();
      const db = client.db();

      // Check if URL already exists in the database

      const existingData = await db.collection("urls").findOne({
        $or: [{ url: urlParam }, { id: id }],
      });

      const existingUrl = existingData?.url;
      const existingId = existingData?.id;

      if (existingUrl == urlParam && !customCode)
        return c.json({ id: existingId });

      if (customCode && existingUrl === urlParam && existingId === code)
        return c.json({ id: existingId });

      if (customCode && existingId === code)
        return c.json({
          error: "id already exists, please delete the old one.",
        });

      const urlObj = {
        id: id,
        url: urlParam,
        createdAt: Date.now(),
      };

      await db.collection("urls").insertOne(urlObj);

      return c.json({ id });
    } catch (err) {
      console.log(err);
      return c.json({ error: "An error occurred while saving the URL." }, 500);
    }
  });
}