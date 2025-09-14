import { Router } from "express";
import * as issueController from "../../controllers/issues.controller.js";
import { validate } from "../../middlewares/zodMiddleware.js";
import { saveUserIssue } from "../../schemas/issues.schema.js";

const router = Router();

router.get("/", issueController.getIssues);
router.get("/details", issueController.getIssueDetails);
router.get("/saved/check", issueController.isIssueSaved);

router.post("/save", validate(saveUserIssue), issueController.SaveUserIssue);

export default router;
