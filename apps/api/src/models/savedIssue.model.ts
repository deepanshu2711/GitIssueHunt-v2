import { model, Schema } from "mongoose";

export interface IRepository {
  owner: string;
  name: string;
  url: string;
}

export interface IIssue {
  number: number;
  url: string;
  title: string;
  body?: string;
  labels?: string[];
  status: "open" | "closed";
  savedAt?: Date;
}

export interface ISavedIssue extends Document {
  userId: Schema.Types.ObjectId;
  repository: IRepository;
  issue: IIssue;
  createdAt: Date;
  updatedAt: Date;
}

const SavedIssueSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    repository: {
      owner: { type: String, required: true },
      name: { type: String, required: true },
      url: { type: String, required: true },
    },

    issue: {
      number: { type: Number, required: true },
      url: { type: String, required: true },
      title: { type: String, required: true },
      body: { type: String },
      labels: [{ type: String }],
      status: { type: String, enum: ["open", "closed"], default: "open" },
      savedAt: { type: Date, default: Date.now },
    },
  },
  { timestamps: true },
);

SavedIssueSchema.index({ userId: 1, "issue.url": 1 }, { unique: true });

export const SavedIssue = model("SavedIssue", SavedIssueSchema);
