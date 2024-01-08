import { Document, Schema, model } from "mongoose";

export interface ITodoDocument extends Document {
  content: string;
  user_id: string;
  endDate: Date;
}

const todoSchema = new Schema<ITodoDocument>(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    endDate: {
      type: Date,
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

export const NoteModel = model<ITodoDocument>("Todo", todoSchema);
