import { z } from "zod";

export const applicationSchema = z.object({
  jobId: z.string().min(1, "Job ID is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  resumeLink: z.string().url("Invalid resume URL"),
  coverNote: z.string().min(1, "Cover note is required")
});