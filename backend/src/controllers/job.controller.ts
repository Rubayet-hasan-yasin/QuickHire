import type { Request, Response } from "express";
import Job from "../models/Job";
import { jobSchema } from "../validations/job.validation";

export const getJobs = async (req: Request, res: Response) => {
    const { search, category, location } = req.query;

    let filter: any = {};

    if (search) {
        filter.title = { $regex: search, $options: "i" };
    }

    if (category) {
        filter.category = category;
    }

    if (location) {
        filter.location = location;
    }

    const jobs = await Job.find(filter).sort({ createdAt: -1 });

    res.json({ success: true, data: jobs });
};

export const getJobById = async (req: Request, res: Response) => {
    const job = await Job.findById(req.params.id);

    if (!job) {
        return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.json({ success: true, data: job });
};

export const createJob = async (req: Request, res: Response) => {
    const { title, company, location, category, description } = req.body;


    const job = await Job.create({
        title,
        company,
        location,
        category,
        description
    });

    res.status(201).json({ success: true, data: job });
};

export const deleteJob = async (req: Request, res: Response) => {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
        return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.json({ success: true, message: "Job deleted", data: null });
};