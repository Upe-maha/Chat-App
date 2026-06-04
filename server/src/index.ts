import app from './app';
import connectDB from './config/database';
import dotenv from "dotenv";
import http from "http";
import { getIo, initSocket } from './config/socket';

dotenv.config();

const PORT = process.env.PORT || 5000;
let server: http.Server | null = null;

const shutdown = (signal: string) => {
    console.log(`Shutting down on ${signal}`);
    try {
        getIo().close();
    } catch {
        // Socket not initialized yet or already closed.
    }

    if (server) {
        server.close(() => process.exit(0));
    } else {
        process.exit(0);
    }
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

// Start the server
const startServer = async () => {
    try {

        await connectDB();
        // socket.io need the http server instance to establish WebSocket connections, so we create the server using the Express app and then pass it to socket.io
        server = http.createServer(app);
        initSocket(server);

        // start http server that can handel both http and websocket connections
        server.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });

    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

startServer();