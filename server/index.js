import { MongoClient } from "mongodb";
import { Hono } from "hono";

const mongoUrl = `mongodb://127.0.0.1:27017/?directConnection=true`;

console.log(mongoUrl);
const client = new MongoClient(mongoUrl);
await client.connect();
const db = client.db("FreeStuff");
const gameCollection = db.collection("Games");

const app = new Hono();
app.get("/", (c) => c.text("Hello Bun!"));
app.get("/api/games", async (c) => {
  const result = await gameCollection.find();
  const array = await result.toArray();

  return c.json(array);
});
app.get("/api/games/:id", (c) => {
  console.log(c.req.param("id"));
});

export default {
  port: 3000,
  fetch: app.fetch,
};

console.log(`Listening on http://localhost:3000...`);
