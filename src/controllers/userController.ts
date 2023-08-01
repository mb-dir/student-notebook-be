import { Request, Response } from "express";
import "dotenv/config";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel, IUserDocument } from "../models/User";

const _createToken = (_id: string) => {
  return jwt.sign({ _id }, process.env.SECRET || "", { expiresIn: "3d" });
};

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password }: IUserDocument = req.body;
  try {
    if (!email || !password || !username) {
      return res.status(400).json({ error: "You must filled in all fields" });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ error: "You have provided invalid email format" });
    }
    if (!validator.isStrongPassword(password)) {
      return res
        .status(400)
        .json({ error: "You must provide strong password" });
    }

    const isAlreadyExits: boolean = !!(await UserModel.findOne({ email }));

    if (isAlreadyExits) {
      return res
        .status(409)
        .json({ error: "User with this email already exists" });
    }

    const salt: string = await bcrypt.genSalt(5);
    const hashedPassword: string = await bcrypt.hash(password, salt);

    const user: IUserDocument = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });
    const token: string = _createToken(user._id);

    return res
      .status(200)
      .json({ token, username: user.username, email: user.email });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password }: IUserDocument = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "You must filled in all fields" });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ error: "You have provided invalid email format" });
    }

    const user: IUserDocument | null = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Incorrect email" });
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.password
    );

    if (isPasswordValid) {
      const token: string = _createToken(user._id);

      return res
        .status(200)
        .json({ token, username: user.username, email: user.email });
    } else {
      return res.status(401).json({ error: "Incorrect password" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};
