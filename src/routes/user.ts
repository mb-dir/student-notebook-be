import { loginUser, registerUser } from "../controllers/userController";

import { Router } from "express";

export const userRoute = Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
