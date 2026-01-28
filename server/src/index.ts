import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/database";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

connectDB();

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello from TypeScript server!" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});