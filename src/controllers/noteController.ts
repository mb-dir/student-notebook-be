import { INoteDocument, NoteModel } from "../models/Note";
import { Request, Response } from "express";

import mongoose from "mongoose";

export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const page: number = req.query && req.query.page ? +req.query.page : 1;
    if (page < 1) {
      return res
        .status(400)
        .json({ error: "Page parameter must be a positive integer." });
    }
    const itemsPerPage: number = 6;
    const startIndex: number = (page - 1) * itemsPerPage;

    const search: string = (req.query?.search || "").toString();

    const queryFilter: any = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } }, // Case-insensitive title search
            { content: { $regex: search, $options: "i" } }, // Case-insensitive content search
          ],
        }
      : {};

    const [notes, totalNotesCount]: [INoteDocument[], number] =
      await Promise.all([
        NoteModel.find(queryFilter)
          .sort({ createdAt: -1 })
          .skip(startIndex)
          .limit(itemsPerPage),
        NoteModel.countDocuments(queryFilter),
      ]);
    return res.status(200).json({ notes, totalNotesCount, page, itemsPerPage });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, content, isHighPriority }: INoteDocument = req.body;
    if (typeof title !== "string" || title.trim() === "") {
      return res
        .status(400)
        .json({ error: "Title must be a non-empty string" });
    }

    if (typeof content !== "string" || content.trim() === "") {
      return res
        .status(400)
        .json({ error: "Content must be a non-empty string" });
    }

    if (typeof isHighPriority !== "boolean") {
      return res
        .status(400)
        .json({ error: "You have to specify the priority of the note" });
    }
    const newNote = await NoteModel.create({ title, content, isHighPriority });
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

export const updateNote = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { title, content, isHighPriority }: INoteDocument = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid note ID format" });
    }

    if (typeof title !== "string" || title.trim() === "") {
      return res
        .status(400)
        .json({ error: "Title must be a non-empty string" });
    }

    if (typeof content !== "string" || content.trim() === "") {
      return res
        .status(400)
        .json({ error: "Content must be a non-empty string" });
    }

    if (typeof isHighPriority !== "boolean") {
      return res
        .status(400)
        .json({ error: "You have to specify the priority of the note" });
    }

    const updatedNote = await NoteModel.findByIdAndUpdate(id, {
      title,
      content,
      isHighPriority,
    });

    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    return res.status(200).json({ updatedNote });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
