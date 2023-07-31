import { Request, Response } from "express";
import { UserModel, IUserDocument } from "../models/User";

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users: IUserDocument[] = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
}
