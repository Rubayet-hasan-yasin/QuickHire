import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jobRoutes from "./routes/job.routes";
import applicationRoutes from "./routes/application.routes";
import { notFoundHandler, errorHandler } from "./middleware/error.middleware";
import morgan from "morgan";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'DELETE', 'PATCH'],
}));
app.use(express.json({ limit: '10kb' }));
app.use(morgan("dev"));

app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;