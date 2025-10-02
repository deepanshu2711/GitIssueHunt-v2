import { Router } from "express";
import authRouter from "./auth.routes.js";
import issuesRouter from "./issues.routes.js";
import repoRouter from "./repo.routes.js";
import aiRouter from "./ai.routes.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/issues", issuesRouter);
router.use("/repo", repoRouter);
router.use("/ai", aiRouter);

export default router;
