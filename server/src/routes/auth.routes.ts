import { Router } from 'express';
import {
    loginUser,
    registerUser,
    refreshToken,
    logoutUser
} from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh', refreshToken);

// Protected routes
router.post('/logout', authMiddleware, logoutUser);

export default router;