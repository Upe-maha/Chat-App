import multer from "multer";
import path from "path";

const IMAGE_MIME_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
];

const VIDEO_MIME_TYPES = [
    "video/mp4",
    "video/webm",
    "video/x-msvideo", // .avi
];

const AUDIO_MIME_TYPES = [
    "audio/mpeg", // .mp3
    "audio/wav",
];

const DOCUMENT_MIME_TYPES = [
    "application/pdf",
    "application/msword", // .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    "text/plain",
];

export const allowedMimeTypes = [
    ...IMAGE_MIME_TYPES,
    ...VIDEO_MIME_TYPES,
    ...AUDIO_MIME_TYPES,
    ...DOCUMENT_MIME_TYPES,
];

const allowedExtensions = [
    ".jpg", ".jpeg", ".png", ".gif",
    ".mp4", ".webm", ".avi",
    ".mp3", ".wav",
    ".pdf", ".doc", ".docx",
    ".txt",
];

const storage = multer.memoryStorage();

export const upload = multer({
    storage,
    limits: {
        fileSize: 20 * 1024 * 1024, // 20 MB max file size
        files: 5, // Max number of files
    },

    fileFilter: (req: Express.Request, file: Express.Multer.File, cd: multer.FileFilterCallback) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedMimeTypes.includes(file.mimetype) &&
            allowedExtensions.includes(ext)) {
            cd(null, true);
        } else {
            cd(new Error(`Unsupported file type: ${file.mimetype}`));
        }
    }
})