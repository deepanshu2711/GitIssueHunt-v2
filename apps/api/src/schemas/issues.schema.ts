import z from "zod";

export const getIssuesQuerySchema = z.object({
  label: z.string().optional(),
  lang: z.string().optional(),
  page: z.string().optional(),
});
