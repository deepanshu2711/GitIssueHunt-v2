import express from "express";
import v1Routes from "./routes/v1/index.js";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", v1Routes);

app.listen(5000, () => {
  console.log(`🚀 API running at http://localhost:${5000}`);
});
