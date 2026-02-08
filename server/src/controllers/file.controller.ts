import mongoose from "mongoose";
import { getGridFSBucket } from "../config/gridfs";
import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
import { Request, Response } from "express";
import { Readable } from "stream";
import { resolve } from "dns";
import { rejects } from "assert";

// export const uploadFile = asyncHandler(async (req: Request, res: Response) => {
//     if (!req.file) {
//         throw new ApiError(400, "No file uploaded.");
//     }

//     const bucket = getGridFSBucket();

//     const { originalname, mimetype, buffer } = req.file;

//     const uploadStream = bucket.openUploadStream(originalname, {
//         metadata: {
//             contentType: mimetype,
//             uploadedBy: req.user?.id,
//             uploadDate: new Date(),
//         }
//     })

//     const readable = Readable.from(buffer); //turns buffer into a stream
//     readable.pipe(uploadStream);

//     // streaming is async, Stream emit events "error", 'finish', 'close'
//     uploadStream.on('error', (err) => {
//         console.error("Erroruploading file:", err);
//         throw new ApiError(500, "Error uploading file");
//     });


// });

// better way using promises 
export const uploadFile = asyncHandler(async (req: Request, res: Response) => {
    if (!req.file) {
        throw new ApiError(400, "No file uploaded.");
    }

    const bucket = getGridFSBucket();

    const { originalname, mimetype, buffer } = req.file;

    try {
        const fileId = await new Promise<string>((resolve, reject) => {
            const uploadStream = bucket.openUploadStream(originalname, {
                metadata: {
                    contentType: mimetype,
                    uploadedBy: req.user?.id,
                    uploadDate: new Date(),
                },
            });
            const readable = Readable.from(buffer);//Converting the buffer into a readable stream
            readable.pipe(uploadStream);

            uploadStream.on("finish", () => {
                resolve(uploadStream.id.toString());
            });

            uploadStream.on("error", (err) => {
                console.error("Error uploading file:", err);
                reject(err);
            });
        });

        // send the message for sucess
        res.status(201).json({
            sucess: true,
            message: "File uploaded successfully",
            data: {
                fileId,
                filiname: originalname,
                contentType: mimetype,
                size: req.file?.size,
            },
        });
    } catch (error) {
        throw new ApiError(500, "Error uploading file");
    }
});

export const streamFile = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const bucket = getGridFSBucket();


    if (!id) {
        throw new ApiError(400, "File ID is required");
    }

    const fileId = Array.isArray(id) ? id[0] : id; // Handle case where id might be an array

    if (!mongoose.Types.ObjectId.isValid(fileId)) {
        throw new ApiError(400, "Invalid file ID");
    }

    try {
        const objectId = new mongoose.Types.ObjectId(fileId);
        // const cursor= bucket.find({ _id: objectId })
        // const file = await cursor.toArray();
        const files = await bucket.find({ _id: objectId }).toArray();

        if (!files || files.length === 0) {
            throw new ApiError(404, "File not found");
        }

        const file = files[0];
        const fileSize = file.length;
        const range = req.headers.range;

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunkSize = end - start + 1;

            res.status(206);
            res.set({
                "Content-Reange": `bytes ${start} - ${end} / ${fileSize}`,
                "Content-Length": chunkSize,
                "Content-Type": file.metadata?.contentType || "application/octet-stream",
            });

            const downloadStream = bucket.openDownloadStream(objectId, {
                start,
                end: end + 1,
            });

            await new Promise<void>((resolve, reject) => {
                downloadStream.pipe(res);
                downloadStream.on("error", reject);
                res.on("error", reject);
                res.on("finish", resolve);
            });
        } else {
            res.set({
                "Content-Length": fileSize.toString(),
                "Content-Type": file.metadata?.contentType || "application/octet-stream",
                "Content-Disposition": `inline; filename = "${file.filename}"`,
            });

            const downloadStream = bucket.openDownloadStream(objectId)

            await new Promise<void>((resolve, reject) => {
                downloadStream.pipe(res);
                downloadStream.on("error", reject);
                res.on("error", reject);
                res.on("finish", resolve);
            });
        }
    } catch (error) {
        if (!res.headersSent) {
            throw new ApiError(500, "Error streaming file");
        }
    };
})


export const downloadFile = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const bucket = getGridFSBucket();


    if (!id) {
        throw new ApiError(400, "File ID is required");
    }

    const fileId = Array.isArray(id) ? id[0] : id; // Handle case where id might be an array

    if (!mongoose.Types.ObjectId.isValid(fileId)) {
        throw new ApiError(400, "Invalid file ID");
    }

    try {
        const objectId = new mongoose.Types.ObjectId(fileId);
        const files = await bucket.find({ _id: objectId }).toArray();

        if (!files || files.length === 0) {
            throw new ApiError(404, "File not found");
        }

        const file = files[0];

        // Force download (attachment vs inline)
        res.set({
            "Content-Type": file.metadata?.contentType || "application/octet-stream",
            "Content-Disposition": `attachment; filename="${file.filename}"`, // ← Forces download
            "Content-Length": file.length.toString(),
        });

        const downloadStream = bucket.openDownloadStream(objectId);

        await new Promise<void>((resolve, reject) => {
            downloadStream.pipe(res);
            downloadStream.on("error", reject);
            res.on("error", reject);
            res.on("finish", resolve);
        });
    } catch (error) {
        if (!res.headersSent) {
            throw new ApiError(500, "Error downloading file");
        }
    }
});


export const getFileMetadata = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const bucket = getGridFSBucket();

    if (!id) {
        throw new ApiError(400, "File ID is required");
    }

    const fileId = Array.isArray(id) ? id[0] : id; // Handle case where id might be an array

    if (!mongoose.Types.ObjectId.isValid(fileId)) {
        throw new ApiError(400, "Invalid file ID");
    }

    try {
        const objectId = new mongoose.Types.ObjectId(fileId);
        const files = await bucket.find({ _id: objectId }).toArray();

        if (!files || files.length === 0) {
            throw new ApiError(404, "File not found");
        }

        const file = files[0];

        res.status(200).json({
            success: true,
            data: {
                fileId: file._id.toString(),
                filename: file.filename,
                contentType: file.metadata?.conentType || "application/octet-stream",
                size: file.length,
                uploadData: file.uploadDate,
                metaData: file.metadata,
            }
        });
    } catch (error) {
        throw new ApiError(500, "Error fetching file metadata");
    }
});


export const deleteFile = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.id;
    const bucket = getGridFSBucket();

    if (!id) {
        throw new ApiError(400, "File ID is required");
    }

    const fileId = Array.isArray(id) ? id[0] : id; // Handle case where id might be an array

    if (!mongoose.Types.ObjectId.isValid(fileId)) {
        throw new ApiError(400, "Invalid file ID");
    }

});