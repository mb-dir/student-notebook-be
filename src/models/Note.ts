import { Document, Schema, model } from "mongoose";

export interface INoteDocument extends Document {
  title: string;
  content: string;
  isHighPriority: boolean;
  user_id: string;
}

const noteSchema = new Schema<INoteDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    isHighPriority: {
      type: Boolean,
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

export const NoteModel = model<INoteDocument>("Note", noteSchema);
