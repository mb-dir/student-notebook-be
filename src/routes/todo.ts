import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../controllers/todoController";

import { Router } from "express";
import { auth } from "../middleware/auth";

export const todoRoute = Router();
todoRoute.use(auth);
todoRoute.post("/", createTodo);
todoRoute.get("/", getAllTodos);
todoRoute.delete("/:_id", deleteTodo);
todoRoute.put("/:_id", updateTodo);
