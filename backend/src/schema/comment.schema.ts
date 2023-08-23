import { ZodSchema, z } from "zod";
import { ReplySchema } from "./reply.schema";
import { UserSchema } from "./user.schema";

export const CommentSchema: ZodSchema = z.object({
  commentId: z.string(),
  author: UserSchema,
  message: z.string(),
  images: z.array(z.string()),
  anonymous: z.boolean(),
  likes: z.array(z.string()),
  replies: z.array(ReplySchema),
});

export type CommentType = z.infer<typeof CommentSchema>;
