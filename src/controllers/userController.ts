import { Request, Response } from "express";
import { UserModel, IUserDocument } from "../models/User";

export const registerUser = async (req: Request, res: Response) => {
  res.status(200).json({ message: "User can register" });
};

export const loginUser = async (req: Request, res: Response) => {
  res.status(200).json({ message: "User can login" });
};
