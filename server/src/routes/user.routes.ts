import { Router } from "express";
import { deletUser, getAllUsers, getUserById, updateUser } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";


const router = Router();

// router.post("/", createUser);

//public routes
router.get("/", getAllUsers);
router.get("/:id", getUserById);

//Protected routes (auth.middleware.ts)
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deletUser);

export default router;
