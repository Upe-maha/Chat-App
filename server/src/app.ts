import express, { Express, Response, Request } from "express";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import chatRoutes from "./routes/chat.routes";
import messageRoutes from "./routes/message.routes";
import fileRoutes from "./routes/file.routes";

const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Chat App API", status: "ok" });
});

app.get("/health", (req: Request, res: Response) => {
    res.json({ status: "healthy", timestamp: new Date() });
});

//API routes

app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/chats", chatRoutes);

app.use("/api/messages", messageRoutes);

app.use("/api/files", fileRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
    res.status(404).json({ error: "Route not found" });
});

// Error middleware (MUST be last)
app.use(errorHandler);

export default app;