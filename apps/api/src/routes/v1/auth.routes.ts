import { Router } from "express";
import * as authController from "../../controllers/auth.controller.js";
import { validate } from "../../middlewares/zodMiddleware.js";
import { authUserSchema } from "../../schemas/auth.schema.js";

const router = Router();

router.post("/", validate(authUserSchema), authController.githubAuth);

export default router;
