import mongoose, { mongo } from "mongoose";

let bucket: mongoose.mongo.GridFSBucket | null = null;


export const initGridFS = () => {
    mongoose.connection.once("open", () => {
        const db = mongoose.connection.getClient().db();

        bucket = new mongoose.mongo.GridFSBucket(db, {
            bucketName: "uploads"
        });
        console.log("GridFS Bucket initialized");
    });
};

export const getGridFSBucket = (): mongoose.mongo.GridFSBucket => {
    if (!bucket) {
        throw new Error("GridFS Bucket not initialized. Call initGridFS() first.");
    }
    return bucket;
}