import {
  createNote,
  deleteNote,
  getAllNotes,
} from "../controllers/noteController";

import { Router } from "express";

export const noteRoute = Router();

noteRoute.get("/", getAllNotes);
noteRoute.post("/", createNote);
noteRoute.delete("/:id", deleteNote);
