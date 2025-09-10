import { Router } from "express";
import * as issueController from "../../controllers/issues.controller.js";

const router = Router();

router.get("/", issueController.getIssues);
router.get("/details", issueController.getIssueDetails);

export default router;
