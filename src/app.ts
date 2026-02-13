import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import resumeRoutes from "./modules/resume/resume.routes";
import interviewRoutes from "./modules/interview/interview.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Import routes

app.get("/health", (req, res) => {
    res.json({ status: "OK" });
});

app.use("/api/auth", authRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/interviews", interviewRoutes);


app.use(errorHandler);
export default app;