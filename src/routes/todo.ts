import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodo,
  updateTodo,
} from "../controllers/todoController";

import { Router } from "express";
import { auth } from "../middleware/auth";

export const todoRoute = Router();
todoRoute.use(auth);
todoRoute.post("/", createTodo);
todoRoute.get("/", getAllTodos);
todoRoute.get("/:_id", getTodo);
todoRoute.delete("/:_id", deleteTodo);
todoRoute.put("/:_id", updateTodo);
