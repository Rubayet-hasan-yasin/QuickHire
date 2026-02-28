import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const validateObjectId = (req: Request, res: Response, next: NextFunction): void => {
    // Check common parameter names for IDs
    const idParams = ["id", "jobId", "applicationId"];

    for (const param of idParams) {
        const value = req.params[param];
        if (value && typeof value === 'string' && !mongoose.Types.ObjectId.isValid(value)) {
            res.status(400).json({
                success: false,
                message: `Invalid ${param} format`
            });
            return;
        }
    }

    next();
};
