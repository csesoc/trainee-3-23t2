import { ZodSchema, z } from "zod";

export const UserSchema: ZodSchema = z.object({
  userId: z.string(),
  username: z.string(),
  email: z.string(),
  description: z.string(),
  profilePicture: z.string(),
});

export type UserType = z.infer<typeof UserSchema>;

export const UserRegisterSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

export const UserLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const UpdateUserSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
  description: z.string(),
  profilePicture: z.string(),
});
