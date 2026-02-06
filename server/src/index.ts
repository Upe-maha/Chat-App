import app from './app';
import connectDB from './config/database';
import dotenv from "dotenv";
import { initGridFS } from './config/gridfs';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Start the server
const startServer = async () => {
    try {

        await connectDB();
        initGridFS();

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });

    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

startServer();