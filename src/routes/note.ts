import {
  createNote,
  deleteNote,
  getAllNotes,
  getNote,
  updateNote,
} from "../controllers/noteController";

import { Router } from "express";
import { auth } from "../middleware/auth";

export const noteRoute = Router();
noteRoute.use(auth);
noteRoute.get("/", getAllNotes);
noteRoute.get("/:_id", getNote);
noteRoute.post("/", createNote);
noteRoute.delete("/:_id", deleteNote);
noteRoute.put("/:_id", updateNote);
