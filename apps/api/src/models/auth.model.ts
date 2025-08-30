import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  name: string;
  userName: string;
  email: string;
  avatarUrl: string;
  githubId: string;
  githubAccessToken: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
    },
    avatarUrl: {
      type: String,
      required: true,
    },
    githubId: {
      type: String,
      required: true,
      unique: true,
    },
    githubAccessToken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const User = model("user", userSchema);
