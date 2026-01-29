import ApiError from "../utils/ApiError";

import { Request, Response, NextFunction } from "express";

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.error
        });
    }

    console.error('Unhandled Error:', err);

    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        errors: []
    });
}