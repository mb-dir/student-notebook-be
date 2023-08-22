import { INoteDocument, NoteModel } from "../models/Note";
import { Request, Response } from "express";

import mongoose from "mongoose";

export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const notes = await NoteModel.find();
    return res.status(200).json({ notes });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, content, isHighPriorty }: INoteDocument = req.body;
    const newNote = await NoteModel.create({ title, content, isHighPriorty });
    return res.status(200).json({ newNote });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const deleteNote = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid note ID format" });
    }

    const deletedNote = await NoteModel.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    return res.status(200).json({ deletedNote });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
