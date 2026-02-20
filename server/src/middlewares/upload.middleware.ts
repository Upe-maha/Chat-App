import { Request, Response, NextFunction } from "express";
import { upload } from "../config/upload";
import ApiError from "../utils/ApiError";

/**
 * Middleware to handle single file upload
 */
export const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
    upload.single("file")(req, res, (err) => {
        if (err) {
            // Handle Multer-specific errors
            return next(new ApiError(400, err.message));
        }
        next();
    });
};

/**
 * Middleware to handle multiple file uploads
 */
export const uploadMultipleMiddleware = (req: Request, res: Response, next: NextFunction) => {
    upload.array("files", 10)(req, res, (err) => { // Max 10 files
        if (err) {
            return next(new ApiError(400, err.message));
        }
        next();
    });
};