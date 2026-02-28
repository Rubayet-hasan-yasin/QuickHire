import express from "express";
import { getJobs, getJobById, createJob, deleteJob } from "../controllers/job.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { jobSchema } from "../validations/job.validation";
import { validateObjectId } from "../middleware/validateObjectId.middleware";

const router = express.Router();

router.get("/", getJobs);
router.get("/:id", validateObjectId, getJobById);
router.post("/", validateRequest(jobSchema), createJob);
router.delete("/:id", validateObjectId, deleteJob);

export default router;