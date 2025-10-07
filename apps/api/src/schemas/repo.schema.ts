import z from "zod";

export const getRepoDetailsSchema = z.object({
  owner: z.string(),
  repo: z.string(),
});

export type GetRepoDetailsInputType = z.infer<typeof getRepoDetailsSchema>;
