import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Application from "../models/Application.js";

export const createApplication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { jobId, name, email, resumeLink, coverNote } = req.body;

        const application = await Application.create({
            jobId: new mongoose.Types.ObjectId(jobId),
            name,
            email,
            resumeLink,
            coverNote
        });

        res.status(201).json({ success: true, data: application });
    } catch (error) {
        next(error);
    }
};