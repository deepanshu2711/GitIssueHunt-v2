import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express + Turborepo 👋");
});

app.listen(5000, () => {
  console.log(`🚀 API running at http://localhost:${5000}`);
});
