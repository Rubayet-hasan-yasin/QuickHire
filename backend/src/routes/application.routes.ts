import express from "express";
import { createApplication } from "../controllers/application.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { applicationSchema } from "../validations/application.validation";

const router = express.Router();

router.post("/", validateRequest(applicationSchema), createApplication);

export default router;