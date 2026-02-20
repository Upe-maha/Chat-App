import fs from 'fs';
import path from 'path';
import { getStoragePath } from '../config/storage.config';
import ApiError from '../utils/ApiError';

// this is JSDoc comment for documentation purposes only.
/**
 * Save file to local storage
 * @param file - Multer file object
 * @returns File URL
 */

export const saveFileToLocal = async (file: Express.Multer.File): Promise<string> => {
    const uploadDir = getStoragePath();
    const filename = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(uploadDir, filename);

    try {
        await fs.promises.writeFile(filePath, file.buffer);// write file buffer to disk

        const fileUrl = `${process.env.BASE_URL || "http://localhost:5000"}/files/${filename}`;
        return fileUrl;
    } catch (error) {
        throw new ApiError(500, "Failed to save file to local storage");
    }
}

/** 
 * delete file from local storage
 * @param filename - name of the file to delete
 * @returns void
*/
export const deleteLocalFile = async (filename: string): Promise<void> => {
    const uploadDir = getStoragePath();
    const filePath = path.join(uploadDir, filename);

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
export const getLocalFilePath = (filename: string): string => {
    const uploadDir = getStoragePath();
    // const filePath = path.join(uploadDir, filename);
    // return filePath;
    return path.join(uploadDir, filename);
};