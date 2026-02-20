import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { saveFileToLocal, deleteLocalFile, getLocalFilePath } from "../services/storage.service";
import ApiError from "../utils/ApiError";
import fs from "fs";
import path from "path";

/**
 * Upload file
 */
export const uploadFile = asyncHandler(async (req: Request, res: Response) => {
    if (!req.file) {
        throw new ApiError(400, "No file uploaded");
    }

    // Save file to local storage
    const fileUrl = await saveFileToLocal(req.file);

    res.status(201).json({
        success: true,
        message: "File uploaded successfully",
        data: {
            fileUrl,
            filename: req.file.originalname,
            contentType: req.file.mimetype,
            size: req.file.size,
        },
    });
});

/**
 * Download file
 */
export const downloadFile = asyncHandler(async (req: Request, res: Response) => {
    const filename = typeof req.params.filename === 'string' ? req.params.filename : req.params.filename?.[0];

    if (!filename) {
        throw new ApiError(400, "Filename is required");
    }

    const filePath = getLocalFilePath(filename);

    if (!fs.existsSync(filePath)) {
        throw new ApiError(404, "File not found");
    }

    // Set proper content-disposition header
    res.download(filePath, filename, (err) => {
        if (err) {
            throw new ApiError(500, "Error downloading file");
        }
    });
});

/**
 * Stream file
 */
export const streamFile = asyncHandler(async (req: Request, res: Response) => {
    const filename = typeof req.params.filename === 'string' ? req.params.filename : req.params.filename?.[0];

    if (!filename) {
        throw new ApiError(400, "Filename is required");
    }

    const filePath = getLocalFilePath(filename);

    if (!fs.existsSync(filePath)) {
        throw new ApiError(404, "File not found");
    }

    const stat = fs.statSync(filePath);
    const ext = path.extname(filename).toLowerCase();

    // Set appropriate content type based on file extension
    let contentType = "application/octet-stream";
    if ([".jpg", ".jpeg"].includes(ext)) contentType = "image/jpeg";
    else if (ext === ".png") contentType = "image/png";
    else if (ext === ".gif") contentType = "image/gif";
    else if (ext === ".mp4") contentType = "video/mp4";
    else if (ext === ".webm") contentType = "video/webm";
    else if (ext === ".mp3") contentType = "audio/mpeg";
    else if (ext === ".wav") contentType = "audio/wav";
    else if (ext === ".pdf") contentType = "application/pdf";

    res.writeHead(200, {
        "Content-Type": contentType,
        "Content-Length": stat.size,
        "Accept-Ranges": "bytes",
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);

    readStream.on("error", () => {
        throw new ApiError(500, "Error streaming file");
    });
});

/**
 * Delete file
 */
export const deleteFile = asyncHandler(async (req: Request, res: Response) => {
    const filename = typeof req.params.filename === 'string' ? req.params.filename : req.params.filename?.[0];

    if (!filename) {
        throw new ApiError(400, "Filename is required");
    }

    const filePath = getLocalFilePath(filename);

    if (!fs.existsSync(filePath)) {
        throw new ApiError(404, "File not found");
    }

    await deleteLocalFile(filename);

    res.status(200).json({
        success: true,
        message: "File deleted successfully",
    });
});

/**
 * Get file metadata
 */
export const getFileMetadata = asyncHandler(async (req: Request, res: Response) => {
    const filename = typeof req.params.filename === 'string' ? req.params.filename : req.params.filename?.[0];

    if (!filename) {
        throw new ApiError(400, "Filename is required");
    }

    const filePath = getLocalFilePath(filename);

    if (!fs.existsSync(filePath)) {
        throw new ApiError(404, "File not found");
    }

    const stat = fs.statSync(filePath);

    res.status(200).json({
        success: true,
        data: {
            filename,
            size: stat.size,
            contentType: path.extname(filename),
            createdAt: stat.birthtime,
            modifiedAt: stat.mtime,
        },
    });
});