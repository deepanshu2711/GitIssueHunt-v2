import { Router } from "express";
import { validate } from "../../middlewares/zodMiddleware.js";
import { summarizeIssueSchema } from "../../schemas/ai.schema.js";
import * as aiController from "../../controllers/ai.controller.js";
import { rateLimiter } from "../../middlewares/rateLimiter.js";

const router = Router();

router.use(rateLimiter({ windowSeconds: 86400, maxRequests: 5 }));

router.post(
  "/summarize-issue",
  validate(summarizeIssueSchema),
  aiController.summarizeIssue,
);

export default router;
