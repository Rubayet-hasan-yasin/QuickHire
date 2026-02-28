import type { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export const validateRequest = (schema: z.ZodSchema) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await schema.parseAsync(req.body);
            next();
        } catch (error: any) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors: error.issues.map((e: any) => ({ path: e.path.join('.'), message: e.message }))
                });
                return;
            }
            next(error);
        }
    };
};
