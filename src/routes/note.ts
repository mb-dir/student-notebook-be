import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
} from "../controllers/noteController";

import { Router } from "express";

export const noteRoute = Router();

noteRoute.get("/", getAllNotes);
noteRoute.post("/", createNote);
noteRoute.delete("/:id", deleteNote);
noteRoute.put("/:id", updateNote);
