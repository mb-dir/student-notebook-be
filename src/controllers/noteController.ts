import { INoteDocument, NoteModel } from "../models/Note";
import { Request, Response } from "express";

import { IUserDocument } from "../models/User";
import mongoose from "mongoose";

export const getAllNotes = async (
  req: Request<{ user: IUserDocument }>,
  res: Response
) => {
  try {
    const page: number = req.query && req.query.page ? +req.query.page : 1;
    if (page < 1) {
      return res
        .status(400)
        .json({ error: "Page parameter must be a positive integer." });
    }
    const notesPerPage: number = 6;
    const startIndex: number = (page - 1) * notesPerPage;

    const search: string = (req.query?.search || "").toString();

    const user_id = req?.user?._id;

    const queryFilter: any = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } }, // Case-insensitive title search
            { content: { $regex: search, $options: "i" } }, // Case-insensitive content search
          ],
          user_id,
        }
      : { user_id };

    const [notes, totalNotesCount]: [INoteDocument[], number] =
      await Promise.all([
        NoteModel.find(queryFilter)
          .sort({ createdAt: -1 })
          .skip(startIndex)
          .limit(notesPerPage),
        NoteModel.countDocuments(queryFilter),
      ]);

    const notesOnCurrentPage: number = notes.length;

    return res
      .status(200)
      .json({ notes, totalNotesCount, page, notesPerPage, notesOnCurrentPage });
  } catch (error: any) {
    return res.status(500).json({ error });
  }
};

export const getNote = async (req: Request<{ _id: string }>, res: Response) => {
  try {
    const { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Invalid note ID format" });
    }

    const note: INoteDocument | null = await NoteModel.findById(_id);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    return res.status(200).json(note);
  } catch (error: any) {
    return res.status(500).json({ error });
  }
};

export const createNote = async (
  req: Request<{ user: IUserDocument }>,
  res: Response
) => {
  try {
    const { title, content, isHighPriority }: INoteDocument = req.body;
    const user_id = req?.user?._id;

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
    const newNote: INoteDocument = await NoteModel.create({
      title,
      content,
      isHighPriority,
      user_id,
    });
    return res.status(200).json({ newNote });
  } catch (error: any) {
    return res.status(500).json({ error });
  }
};

export const deleteNote = async (
  req: Request<{ _id: string }>,
  res: Response
) => {
  try {
    const { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Invalid note ID format" });
    }

    const deletedNote: INoteDocument | null = await NoteModel.findByIdAndDelete(
      _id
    );

    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    return res.status(200).json({ deletedNote });
  } catch (error: any) {
    return res.status(500).json({ error });
  }
};

export const updateNote = async (
  req: Request<{ _id: string }>,
  res: Response
) => {
  try {
    const { _id } = req.params;
    const { title, content, isHighPriority }: INoteDocument = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
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

    const oldNote: INoteDocument | null = await NoteModel.findByIdAndUpdate(
      _id,
      {
        title,
        content,
        isHighPriority,
      }
    );

    if (!oldNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    return res.status(200).json({ oldNote });
  } catch (error: any) {
    return res.status(500).json({ error });
  }
};
