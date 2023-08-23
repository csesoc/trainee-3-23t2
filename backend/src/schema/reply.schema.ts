import { z, ZodSchema } from "zod";
import { UserSchema } from "./user.schema";

export const ReplySchema: ZodSchema = z.object({
  replyId: z.string(),
  message: z.string(),
  images: z.array(z.string()),
  anonymous: z.boolean(),
  likes: z.array(z.string()),
  author: UserSchema,
});

export type ReplyType = z.infer<typeof ReplySchema>;

export const PostReplySchema = z.object({
  message: z.string(),
  images: z.array(z.string()),
  anonymous: z.boolean(),
});

export const LikeReplySchema = z.object({
  like: z.boolean(),
});
