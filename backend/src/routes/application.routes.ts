import express from "express";
import { createApplication } from "../controllers/application.controller.js";
import { validateRequest } from "../middleware/validate.middleware.js";
import { applicationSchema } from "../validations/application.validation.js";

const router = express.Router();

router.post("/", validateRequest(applicationSchema), createApplication);

export default router;