import { Router } from "express";
import * as repoController from "../../controllers/repo.controller.js";

const router = Router();

router.get("/", repoController.getRepo);

export default router;
