import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userController";

export const userRoute = Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
