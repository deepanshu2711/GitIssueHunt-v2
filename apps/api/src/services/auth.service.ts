import { z } from "zod";
import { User } from "../models/auth.model.js";
import { authUserSchema } from "../schemas/auth.schema.js";

type CreateUserInput = z.infer<typeof authUserSchema>;

export const createOrFindUser = async (data: CreateUserInput) => {
  return (
    (await User.findOne({ githubId: data.githubId })) ??
    (await User.create(data))
  );
};
