import fs from 'fs';
import path from 'path';
import { getStoragePath } from '../config/storage.config';
import ApiError from '../utils/ApiError';

const STREAM_ROUTE_BASE = "/api/files/stream";

const toUrlPath = (relativePath: string) => relativePath.split(path.sep).join("/");

const encodeUrlPath = (relativePath: string) =>
    toUrlPath(relativePath).split("/").map(encodeURIComponent).join("/");

const ensureSafeRelativePath = (relativePath: string): string => {
    if (!relativePath || typeof relativePath !== "string") {
        throw new ApiError(400, "File path is required");
    }

    const normalized = path.normalize(relativePath);
    if (path.isAbsolute(normalized)) {
        throw new ApiError(400, "Invalid file path");
    }

    const segments = normalized.split(path.sep);
    if (segments.includes("..")) {
        throw new ApiError(400, "Invalid file path");
    }

    return normalized;
};

const resolveLocalPath = (relativePath: string): string => {
    const uploadDir = getStoragePath();
    const safePath = ensureSafeRelativePath(relativePath);
    const resolvedPath = path.resolve(uploadDir, safePath);
    const relative = path.relative(uploadDir, resolvedPath);

    if (relative.startsWith("..") || path.isAbsolute(relative)) {
        throw new ApiError(400, "Invalid file path");
    }

    return resolvedPath;
};

export const buildFileUrl = (relativePath: string): string => {
    const baseUrl = process.env.BASE_URL || "http://localhost:5000";
    const encodedPath = encodeUrlPath(relativePath);
    return `${baseUrl}${STREAM_ROUTE_BASE}/${encodedPath}`;
};

export const getRelativePathFromFileUrl = (fileUrl: string): string | null => {
    if (!fileUrl) {
        return null;
    }

    try {
        const url = new URL(fileUrl, "http://localhost");
        const marker = `${STREAM_ROUTE_BASE}/`;
        if (!url.pathname.startsWith(marker)) {
            return null;
        }

        const relativePath = url.pathname.slice(marker.length);
        return decodeURIComponent(relativePath);
    } catch {
        return null;
    }
};

// this is JSDoc comment for documentation purposes only.
/**
 * Save file to local storage
 * @param file - Multer file object
 * @returns File URL
 */

export const saveFileToLocal = async (
    file: Express.Multer.File,
    options: { subPath?: string; fileName?: string } = {}
): Promise<string> => {
    const uploadDir = getStoragePath(options.subPath);
    const safeOriginalName = path.basename(file.originalname);
    const filename = options.fileName || `${Date.now()}-${safeOriginalName}`;
    const filePath = path.join(uploadDir, filename);

    try {
        await fs.promises.writeFile(filePath, file.buffer);// write file buffer to disk

        const relativePath = options.subPath
            ? path.join(options.subPath, filename)
            : filename;
        return buildFileUrl(relativePath);
    } catch (error) {
        throw new ApiError(500, "Failed to save file to local storage");
    }
}

/** 
 * delete file from local storage
 * @param filename - name of the file to delete
 * @returns void
*/
export const deleteLocalFile = async (relativePath: string): Promise<void> => {
    const filePath = resolveLocalPath(relativePath);

    try {
        if (fs.existsSync(filePath)) {
            await fs.promises.unlink(filePath);
        }
    } catch (error) {
        throw new ApiError(500, "Failed to delete file from local storage");
    }
};

/** 
 * get file path from local storage
 * @param filename - name of the file
 * @returns file path
*/
export const getLocalFilePath = (relativePath: string): string => {
    return resolveLocalPath(relativePath);
};