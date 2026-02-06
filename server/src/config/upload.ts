import multer from "multer";

const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",

    "video/mp4",
    "video/webm",
    "video/x-msvideo",

    "audio/mpeg",
    "audio/wav",

    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
]

export const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 100 * 1024 * 1024 // 100 MB max file size
    },
    fileFilter: (req, file, cd) => {
        if (allowedMimeTypes.includes(file.mimetype)) {
            cd(null, true);
        } else {
            cd(new Error(`Unsupported file type: ${file.mimetype}`));
        }
    }
})