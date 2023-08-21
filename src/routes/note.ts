import { createNote, getAllNotes } from "../controllers/noteController";

import { Router } from "express";

export const noteRoute = Router();

noteRoute.get("/", getAllNotes);
noteRoute.post("/", createNote);
