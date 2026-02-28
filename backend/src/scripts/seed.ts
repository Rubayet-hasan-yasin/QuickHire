import mongoose from "mongoose";
import dotenv from "dotenv";
import Job from "../models/Job.js";
import Application from "../models/Application.js";

// Load env vars
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("✅ MongoDB connected for seeding");
    } catch (error) {
        console.error("❌ DB connection failed:", error);
        process.exit(1);
    }
};

const seedData = async () => {
    try {
        await connectDB();

        console.log("Clearing existing data...");
        await Job.deleteMany({});
        await Application.deleteMany({});

        console.log("Inserting jobs...");
        const jobs = await Job.insertMany([
            {
                title: "Frontend Developer",
                company: "Tech Corp",
                location: "Remote",
                category: "Engineering",
                description: "Looking for an experienced React developer to build modern web applications."
            },
            {
                title: "Backend Engineer",
                company: "Data Systems Inc",
                location: "New York, NY",
                category: "Engineering",
                description: "Node.js and Express expert needed for scalable APIs."
            },
            {
                title: "Product Manager",
                company: "Innovate LLC",
                location: "San Francisco, CA",
                category: "Product",
                description: "Drive product vision and strategy for our core platform."
            },
            {
                title: "UX Designer",
                company: "Creative Agency",
                location: "London, UK",
                category: "Design",
                description: "Design intuitive user interfaces and experiences."
            }
        ]);

        console.log("Inserting applications...");
        await Application.insertMany([
            {
                jobId: jobs[0]?._id, // Apply to first job
                name: "John Doe",
                email: "john@example.com",
                resumeLink: "https://example.com/resume/johndoe.pdf",
                coverNote: "I love React and would be a great fit!"
            },
            {
                jobId: jobs[1]?._id, // Apply to second job
                name: "Jane Smith",
                email: "jane@example.com",
                resumeLink: "https://example.com/resume/janesmith.pdf",
                coverNote: "Experienced backend engineer ready to scale your APIs."
            },
            {
                jobId: jobs[0]?._id, // Another application for the first job
                name: "Alice Johnson",
                email: "alice@example.com",
                resumeLink: "https://example.com/resume/alicej.pdf",
                coverNote: "Frontend is my passion."
            }
        ]);

        console.log("✅ Seeding completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
};

seedData();
