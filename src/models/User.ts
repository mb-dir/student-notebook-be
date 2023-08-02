import { Document, Schema, model } from "mongoose";

export interface IUserDocument extends Document {
  username: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUserDocument>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<IUserDocument>("User", userSchema);
