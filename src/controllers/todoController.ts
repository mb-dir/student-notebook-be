import { ITodoDocument, TodoModel } from "../models/Todo";
import { Request, Response } from "express";

import { IUserDocument } from "../models/User";
import mongoose from "mongoose";

export const createTodo = async (
  req: Request<{ user: IUserDocument }>,
  res: Response
) => {
  return res.status(200).json({ msg: "It works" });
};
