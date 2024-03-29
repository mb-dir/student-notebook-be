import { Document, Schema, model } from "mongoose";

export interface ITodoDocument extends Document {
  content: string;
  user_id: string;
  endDate: string;
}

const todoSchema = new Schema<ITodoDocument>(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const TodoModel = model<ITodoDocument>("Todo", todoSchema);
