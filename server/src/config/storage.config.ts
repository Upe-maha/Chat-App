import path from "path";
import fs from "fs";
import ApiError from "../utils/ApiError";

const isProduction = process.env.NODE_ENV === "production";

export const storageConfig = {
    local: {
        path: path.resolve(process.cwd(), "uploads"),
    },
    cloud: {
        provider: "s3", // future use
        bucket: process.env.CLOUD_BUCKET || "",
        baseUrl: process.env.CLOUD_BASE_URL || "",
    },
};

export const getStoragePath = () => {
    if (isProduction) {
        if (!storageConfig.cloud.bucket) {
            throw new ApiError(500, "Cloud storage is not configured");
        }
        return storageConfig.cloud.bucket;
    }

    const uploadPath = storageConfig.local.path;

    // Ensure directory exists (VERY IMPORTANT)
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }

    return uploadPath;
};