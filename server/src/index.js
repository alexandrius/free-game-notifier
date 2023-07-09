import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";
import { serveStatic } from "hono/cloudflare-workers";
import { cors } from "hono/cors";
import { initCollection } from "mongo-http";

import { addTotalHeaders, fakeId } from "./utils";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
  "Access-Control-Max-Age": "86400",
};

let gameCollection;
const app = new Hono();

app.use("/api/*", cors(corsHeaders));

app.use(
  "/admin/*",
  async (c, next) =>
    await basicAuth({
      username: "alexandrius",
      password: c.env.ADMIN_PASSWORD,
    })(c, next)
);

app.use("*", async (c, next) => {
  if (!gameCollection) {
    gameCollection = initCollection({
      appId: "data-rutly",
      apiKey: c.env.MONGODB_API_KEY,
      databaseName: "FreeGamesNotifier",
      dataSource: "FreeGamesNotifier",
      collectionName: "Games",
    });
  }
  await next();
});

app.get("/", (c) => c.text("Hello Workers!"));

// Serve react admin
app.use("/_expo/*", serveStatic({ root: "./" }));
app.use("/admin", serveStatic({ path: "./" }));

// Api
app.get("/api/games", async (c) => {
  const { documents } = await gameCollection.find({});
  addTotalHeaders(c, documents);
  fakeId(documents);
  return c.json(documents);
});

app.post("/api/games", async (c) => {
  const body = await c.req.json();

  await gameCollection.insertOne(body);
  return c.json({ success: true });
});

// app.get("/api/games/:id", (c) => {
//   // console.log(c.req.param("id"));
// });

export default {
  fetch: app.fetch,
};
