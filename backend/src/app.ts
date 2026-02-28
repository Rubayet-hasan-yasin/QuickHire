import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import type { Request, Response, NextFunction } from "express";
import jobRoutes from "./routes/job.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import { notFoundHandler, errorHandler } from "./middleware/error.middleware.js";
import morgan from "morgan";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  methods: ['GET', 'POST', 'DELETE', 'PATCH'],
}));
app.use(express.json({ limit: '10kb' }));
app.use(morgan("dev"));


app.use((req: Request, res: Response, next: NextFunction) => {
  connectDB().then(() => next()).catch(next);
});

app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;