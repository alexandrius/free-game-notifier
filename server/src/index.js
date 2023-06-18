import { initCollection } from "mongo-http";
import { Hono } from "hono";

let gameCollection;
const app = new Hono();

app.use("*", async (c, next) => {
  if (!gameCollection) {
    gameCollection = initCollection({
      appId: "data-rutly",
      apiKey: c.env.MONGODB_API_KEY,
      // TODO: Fix these vars
      databaseName: "FreeGameNotifier",
      dataSource: "FreeGamesNotifier",
      collectionName: "Games",
    });
  }
  await next();
});

app.get("/", (c) => c.text("Hello Bun!"));

app.get("/api/games", async (c) => {
  const result = await gameCollection.findOne({});
  return c.json(result);
});
// app.get("/api/games/:id", (c) => {
//   // console.log(c.req.param("id"));
// });

export default {
  fetch: app.fetch,
};
