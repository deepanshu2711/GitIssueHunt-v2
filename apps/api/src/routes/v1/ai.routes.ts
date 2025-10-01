import { Router } from "express";
import { validate } from "../../middlewares/zodMiddleware.js";
import { summarizeIssueSchema } from "../../schemas/ai.schema.js";
import * as aiController from "../../controllers/ai.controller.js";

const router = Router();

router.post(
  "/summarize-issue",
  validate(summarizeIssueSchema),
  aiController.summarizeIssue,
);

export default router;
