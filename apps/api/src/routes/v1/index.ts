import { Router } from "express";
import authRouter from "./auth.routes.js";
import issuesRouter from "./issues.routes.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/issues", issuesRouter);

export default router;
