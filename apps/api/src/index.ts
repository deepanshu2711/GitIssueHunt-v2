import express from "express";
import v1Routes from "./routes/v1/index.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use("/api/v1", v1Routes);

app.listen(5081, () => {
  console.log(`🚀 API running at http://localhost:${5081}`);
});
