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

export type GetUserDetiailsInput = z.infer<typeof getIssueDetailsSchema>;
