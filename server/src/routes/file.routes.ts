import { Router } from "express";
import { uploadMiddleware } from "../middlewares/upload.middleware";
import { deleteFile, downloadFile, streamFile, uploadFile } from "../controllers/file.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware); // Protect all file routes

router.post("/upload", uploadMiddleware, uploadFile);

router.get("/download/:filename", downloadFile);

router.get("/stream/:filename", streamFile);

router.delete("/delete/:filename", deleteFile);

export default router;
