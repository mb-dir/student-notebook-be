import { INoteDocument, NoteModel } from "../models/Note";
import { Request, Response } from "express";

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
