import { Request, Response, NextFunction } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import { verifyAccessToken } from "../utils/jwt";

// Added the src.types (custom TypeScript type definitions for your Express app.)
// // Extend Express Request to include user
// declare global {
//     namespace Express {
//         interface Request {
//             user?: {
//                 id: string;
//                 username: string;
//                 email: string;
//             };
//         }
//     }
// }

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

        let payload;
        try {
            payload = verifyAccessToken(token);
        } catch (error) {
            throw new ApiError(401, "Invalid or expired access token");
        }

        req.user = {
            id: payload.id,
            username: payload.username,
            email: payload.email,
        }

        next();

    }
)