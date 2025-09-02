import { Router } from "express";
import * as issueController from "../../controllers/issues.controller.js";
import { validate } from "../../middlewares/zodMiddleware.js";
import { getIssuesQuerySchema } from "../../schemas/issues.schema.js";

const router = Router();

router.get(
  "/",
  validate(getIssuesQuerySchema, "params"),
  issueController.getIssues,
);

export default router;
