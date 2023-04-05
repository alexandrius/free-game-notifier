import { MongoClient } from "mongodb";
import { Hono } from "hono";

const mongoUrl = `mongodb://127.0.0.1:27017/?directConnection=true`;

console.log(mongoUrl);
const client = new MongoClient(mongoUrl);
await client.connect();
const db = client.db("FreeStuff");
const collection = db.collection("Games");
const result = await collection.find();
const array = await result.toArray();

const app = new Hono();
app.get("/", (c) => c.text("Hello Bun!"));
app.get("/api/games", (c) => c.json(array));

export default {
  port: 3000,
  fetch: app.fetch,
};

console.log(`Listening on http://localhost:3000...`);
