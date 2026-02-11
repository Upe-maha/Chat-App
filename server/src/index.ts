import app from './app';
import connectDB from './config/database';
import dotenv from "dotenv";
import { initGridFS } from './config/gridfs';
import http from "http";
import { initSocket } from './config/socket';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Start the server
const startServer = async () => {
    try {

        await connectDB();
        initGridFS();

        // socket.io need the http server instance to establish WebSocket connections, so we create the server using the Express app and then pass it to socket.io
        const server = http.createServer(app);
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