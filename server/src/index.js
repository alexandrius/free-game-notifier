import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";
import { serveStatic } from "hono/cloudflare-workers";
import { initCollection } from "mongo-http";

let gameCollection;
const app = new Hono();

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
      databaseName: "FreeGameNotifier",
      dataSource: "FreeGamesNotifier",
      collectionName: "Games",
    });
  }
  await next();
});

app.get("/", (c) => c.text("Hello Workers!"));


// Serve react admin
app.use("/assets/*", serveStatic({ root: "./" }));
app.use("/vite.svg", serveStatic({ path: "./vite.svg" }));
app.use("/admin", serveStatic({ path: "./" }));

app.get("/api/games", async (c) => {
  const { documents } = await gameCollection.find({});
  return c.json(documents);
});

// app.get("/api/games/:id", (c) => {
//   // console.log(c.req.param("id"));
// });

export default {
  fetch: app.fetch,
};
