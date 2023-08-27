import {
  createNote,
  deleteNote,
  getAllNotes,
  getNote,
  updateNote,
} from "../controllers/noteController";

import { Router } from "express";

export const noteRoute = Router();

noteRoute.get("/", getAllNotes);
noteRoute.get("/:id", getNote);
noteRoute.post("/", createNote);
noteRoute.delete("/:id", deleteNote);
noteRoute.put("/:id", updateNote);
