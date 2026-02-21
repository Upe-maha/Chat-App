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
    const rawFilename = typeof req.params.filename === 'string' ? req.params.filename : req.params.filename?.[0];

    if (!rawFilename) {
        throw new ApiError(400, "Filename is required");
    }


    const filename = path.basename(rawFilename); // Prevent directory traversal
    const filePath = getLocalFilePath(filename);

    // use async file check
    try {
        await fs.promises.access(filePath);
    } catch {
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
    const rawFilename = typeof req.params.filename === 'string' ? req.params.filename : req.params.filename?.[0];

    if (!rawFilename) {
        throw new ApiError(400, "Filename is required");
    }

    const filename = path.basename(rawFilename); // security: sanitize stat
    const filePath = getLocalFilePath(filename);

    // use async stat
    let fileStats;
    try {
        fileStats = await fs.promises.stat(filePath);
    } catch (error: any) {
        if (error.code === "ENOENT") {
            throw new ApiError(404, "File not found");
        }
        throw new ApiError(500, "Error accessing file");
    }

    const totalSize = fileStats.size;
    const fileExt = path.extname(filename).toLowerCase();

    //Determine MIME type
    const mimeTypes: Record<string, string> = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.mp4': 'video/mp4',
        '.webm': 'video/webm',
        '.mp3': 'audio/mpeg',
        '.wav': 'audio/wav',
        '.pdf': 'application/pdf'
    }
    const contentType = mimeTypes[fileExt] || "application/octet-stream";

    // handle range requests for video/audio streaming
    const range = req.headers.range;

    let rangeStart = 0;
    let rangeEnd = totalSize - 1;
    let contentLength = totalSize;

    if (range) {
        const rangeParts = range.replace(/bytes=/, "").split("-");
        rangeStart = parseInt(rangeParts[0], 10);
        rangeEnd = rangeParts[1] ? parseInt(rangeParts[1], 10) : totalSize - 1;
        contentLength = rangeEnd - rangeStart + 1;
    }

    res.writeHead(200, {
        "Content-Range": `bytes ${rangeStart}-${rangeEnd}/${totalSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": contentType,
    });

    const fileStream = fs.createReadStream(filePath, { start: rangeStart, end: rangeEnd });
    fileStream.pipe(res);

    fileStream.on("error", () => {
        throw new ApiError(500, "Error streaming file");
    });
});

/**
 * Delete file
 */
export const deleteFile = asyncHandler(async (req: Request, res: Response) => {
    const rawFilename = typeof req.params.filename === 'string' ? req.params.filename : req.params.filename?.[0];

    if (!rawFilename) {
        throw new ApiError(400, "Filename is required");
    }

    const filename = path.basename(rawFilename); // Prevent directory traversal
    const filePath = getLocalFilePath(filename);

    try {
        await fs.promises.access(filePath);
    } catch {
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
    const rawFilename = typeof req.params.filename === 'string' ? req.params.filename : req.params.filename?.[0];

    if (!rawFilename) {
        throw new ApiError(400, "Filename is required");
    }

    const filename = path.basename(rawFilename); // Prevent directory traversal
    const filePath = getLocalFilePath(filename);

    let fileStats;
    try {
        fileStats = await fs.promises.stat(filePath);
    } catch {
        throw new ApiError(404, "File not found");
    }

    res.status(200).json({
        success: true,
        data: {
            filename,
            size: fileStats.size,
            contentType: path.extname(filename),
            createdAt: fileStats.birthtime,
            modifiedAt: fileStats.mtime,
        },
    });
});