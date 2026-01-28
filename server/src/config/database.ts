
import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    try {
        const mongoURL = process.env.MONGODB_URL;
        if (!mongoURL) {
            throw new Error('MONGODB_URL is not defined in .env file');
        }
        await mongoose.connect(mongoURL);
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
}

export default connectDB;