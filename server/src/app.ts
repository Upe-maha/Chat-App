import express, { Express } from "express";
import { errorHandler } from "./middlewares/error.middleware";

const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
    res.json({ message: "Chat App API", status: "ok" });
});

app.get("/health", (req, res) => {
    res.json({ status: "healthy", timestamp: new Date() });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Error middleware (MUST be last)
app.use(errorHandler);

export default app;