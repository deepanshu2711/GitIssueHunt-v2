import z from "zod";

export const getIssuesQuerySchema = z.object({
  label: z.string().optional(),
  lang: z.string().optional(),
  page: z.string().optional(),
});

export const getIssueDetailsSchema = z.object({
  owner: z.string(),
  repo: z.string(),
  issueNumber: z.string(),
});

export const repositorySchema = z.object({
  owner: z.string().min(1, "Repository owner is required"),
  name: z.string().min(1, "Repository name is required"),
  url: z.string().url("Repository URL must be valid"),
});

export const issueSchema = z.object({
  number: z.number().int().positive("Issue number must be positive"),
  url: z.string().url("Issue URL must be valid"),
  title: z.string().min(1, "Title is required"),
  body: z.string().optional(),
  labels: z.array(z.string()).optional(),
  status: z.enum(["open", "closed"]).default("open"),
  savedAt: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date().optional(),
  ),
});

export const saveUserIssue = z.object({
  userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId"),
  repository: repositorySchema,
  issue: issueSchema,
});

export const isSavedIssueSchema = z.object({
  userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId"),
  url: z.string().url("Repository URL must be valid"),
});

export type SaveUserIssueInput = z.infer<typeof saveUserIssue>;
export type GetUserDetiailsInput = z.infer<typeof getIssueDetailsSchema>;
export type IsSavedIssueInput = z.infer<typeof isSavedIssueSchema>;
