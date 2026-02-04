import express, { Express } from "express";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import chatRoutes from "./routes/chat.routes";

const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get("/", (req: express.Request, res: express.Response) => {
    res.json({ message: "Chat App API", status: "ok" });
});

app.get("/health", (req: express.Request, res: express.Response) => {
    res.json({ status: "healthy", timestamp: new Date() });
});

//API routes

app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/chats", chatRoutes);

// 404 handler
app.use((req: express.Request, res: express.Response) => {
    res.status(404).json({ error: "Route not found" });
});

// Error middleware (MUST be last)
app.use(errorHandler);

export default app;