import { Router } from "express";
import { deletUser, getAllUsers, getUserById, updateProfilePicture, updateUser } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { uploadProfilePictureMiddleware } from "../middlewares/upload.middleware";


const router = Router();

// router.post("/", createUser);

//public routes
router.get("/", getAllUsers);
router.get("/:id", getUserById);

//Protected routes (auth.middleware.ts)
router.post("/:id/profile-picture", authMiddleware, uploadProfilePictureMiddleware, updateProfilePicture);
router.put("/:id/profile-picture", authMiddleware, uploadProfilePictureMiddleware, updateProfilePicture);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deletUser);

export default router;
