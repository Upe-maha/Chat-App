import { Request, Response, NextFunction } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import { verifyAccessToken } from "../utils/jwt";

// Extend Express Request to include user
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                username: string;
                email: string;
            };
        }
    }
}

export const authMiddleware = asyncHandler(
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            throw new ApiError(401, "Access token is missing")
        }

        const paylod = verifyAccessToken(token);

        req.user = {
            id: paylod.id,
            username: paylod.username,
            email: paylod.email,
        }

        next();

    }
)