import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { deleteFile, downloadFile, getFileMetadata, streamFile, uploadFile } from "../controllers/file.controller";
import { upload } from "../config/upload";

const router = Router();

router.use(authMiddleware);

router.post("/upload", upload.single("file"), uploadFile);

router.get("/stream/:id", streamFile);

router.get("/download/:id", downloadFile);

router.get("/metadata/:id", getFileMetadata);

router.delete("/:id", deleteFile);

export default router;