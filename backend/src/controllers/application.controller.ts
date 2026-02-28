import type { Request, Response } from "express";
import Application from "../models/Application";


export const createApplication = async (req: Request, res: Response) => {
    const { jobId, name, email, resumeLink, coverNote } = req.body;


    const application = await Application.create({
        jobId,
        name,
        email,
        resumeLink,
        coverNote
    });

    res.status(201).json({ success: true, data: application });
};