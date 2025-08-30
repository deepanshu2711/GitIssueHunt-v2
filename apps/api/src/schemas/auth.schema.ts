import z from "zod";

export const authUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  userName: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  avatarUrl: z.string().min(1, "avatarUrl is required"),
  githubId: z.string().min(1, "githubId is required"),
  githubAccessToken: z.string().min(1, "githubAccessToken is required"),
});
