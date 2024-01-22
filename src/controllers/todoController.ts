import { ITodoDocument, TodoModel } from "../models/Todo";
import { Request, Response } from "express";

import { IUserDocument } from "../models/User";
import isValidDateFormat from "../helpers/validDateFormat";
import mongoose from "mongoose";

export const getAllTodos = async (
  req: Request<{ user: IUserDocument }>,
  res: Response
) => {
  try {
    const user_id = req?.user?._id;
    const todos: ITodoDocument[] = await TodoModel.find({ user_id });

    return res.status(200).json(todos);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getTodo = async (req: Request<{ _id: string }>, res: Response) => {
  try {
    const { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Invalid Todo ID format" });
    }

    const todo: ITodoDocument | null = await TodoModel.findById(_id);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    return res.status(200).json(todo);
  } catch (error: any) {
    return res.status(500).json({ error });
  }
};

export const createTodo = async (
  req: Request<{ user: IUserDocument }>,
  res: Response
) => {
  try {
    const { content, endDate }: ITodoDocument = req.body;
    const user_id = req?.user?._id;

    if (typeof content !== "string" || content.trim() === "") {
      return res
        .status(400)
        .json({ error: "Content must be a non-empty string" });
    }

    // Check if endDate is a valid date
    if (!isValidDateFormat(endDate)) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    const parsedEndDate = new Date(endDate);

    // Check if endDate is not in the past
    const currentDate = new Date();
    if (parsedEndDate < currentDate) {
      return res.status(400).json({ error: "End date must be in the future" });
    }

    const newTodo: ITodoDocument = await TodoModel.create({
      content,
      endDate: parsedEndDate,
      user_id,
    });

    return res.status(200).json(newTodo);
  } catch (error: any) {
    return res.status(500).json({ error });
  }
};

export const deleteTodo = async (
  req: Request<{ _id: string }>,
  res: Response
) => {
  try {
    const { _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(400).json({ error: "Invalid todo ID format" });

    const deletedTodo: ITodoDocument | null = await TodoModel.findByIdAndDelete(
      _id
    );

    if (!deletedTodo) return res.status(404).json({ error: "Note not found" });

    return res.status(200).json(deletedTodo);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const updateTodo = async (
  req: Request<{ _id: string }>,
  res: Response
) => {
  try {
    const { content, endDate }: ITodoDocument = req.body;
    const { _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(400).json({ error: "Invalid todo ID format" });

    if (typeof content !== "string" || content.trim() === "") {
      return res
        .status(400)
        .json({ error: "Content must be a non-empty string" });
    }

    // Check if endDate is a valid date
    if (!isValidDateFormat(endDate)) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    const parsedEndDate = new Date(endDate);

    // Check if endDate is not in the past
    const currentDate = new Date();
    if (parsedEndDate < currentDate)
      return res.status(400).json({ error: "End date must be in the future" });

    const oldTodo: ITodoDocument | null = await TodoModel.findByIdAndUpdate(
      _id,
      { content, endDate }
    );

    if (!oldTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    return res.status(200).json(oldTodo);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
function parseISO(endDate: string) {
  throw new Error("Function not implemented.");
}
