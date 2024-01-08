import { Router } from "express";
import { auth } from "../middleware/auth";
import { createTodo } from "../controllers/todoController";

export const todoRoute = Router();
todoRoute.use(auth);
todoRoute.post("/", createTodo);
