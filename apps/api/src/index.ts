import express from "express";
import v1Routes from "./routes/v1/index.js";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import { errorHandler, notFound } from "./utils/responses.js";
dotenv.config();

const app = express();

app.set("trust proxy", true);
app.use(express.json());
app.use(
  cors({
    origin: "https://git-issue-hunt.deepxdev.com",
    credentials: true,
  }),
);

app.use("/api/v1", v1Routes);

// 404 handler
app.use(notFound as any);

// global error handler
app.use(errorHandler as any);

app.listen(5081, () => {
  console.log(`🚀 API running at http://localhost:${5081}`);
  connectDB();
});
