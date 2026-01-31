import { Router } from "express";
import { createUser, deletUser, getAllUsers, getUserById, updateUser } from "../controllers/user.controller";


const router = Router();

router.post("/", createUser);

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.put("/:id", updateUser);

router.delete("/:id", deletUser);

export default router;