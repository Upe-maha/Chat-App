import { Router } from "express";
import { uploadMiddleware } from "../middlewares/upload.middleware";
import { deleteFile, downloadFile, streamFile, uploadFile } from "../controllers/file.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware); // Protect all file routes

router.post("/upload", uploadMiddleware, uploadFile);

router.get("/download/*filePath", downloadFile);

router.get("/stream/*filePath", streamFile);

router.delete("/delete/*filePath", deleteFile);

export default router;
