import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import User from "../models/User";
import ApiError from "../utils/ApiError";

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await User.find().select("-password -__v");

    res.status(200).json({
        success: true,
        message: "Uers fetched sucessfully",
        data: users,
    });
}
)



export const getUserById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findById(id).select("-password -__v");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: user,
    });
});
