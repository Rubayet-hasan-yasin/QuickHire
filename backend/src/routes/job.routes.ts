import express from "express";
import { getJobs, getJobById, createJob, deleteJob } from "../controllers/job.controller.js";
import { validateRequest } from "../middleware/validate.middleware.js";
import { jobSchema } from "../validations/job.validation.js";
import { validateObjectId } from "../middleware/validateObjectId.middleware.js";

const router = express.Router();

router.get("/", getJobs);
router.get("/:id", validateObjectId, getJobById);
router.post("/", validateRequest(jobSchema), createJob);
router.delete("/:id", validateObjectId, deleteJob);

export default router;