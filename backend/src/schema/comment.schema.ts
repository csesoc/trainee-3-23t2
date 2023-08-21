import { ZodSchema, z } from "zod";
import { UserSchema } from "./user.schema";
import { ReplySchema } from "./reply.schema";

export const CommentSchema: ZodSchema = z.object({
  commentId: z.string(),
  message: z.string(),
  images: z.array(z.string()),
  anonymous: z.boolean(),
  likes: z.array(UserSchema),
  replies: z.array(ReplySchema),
});

export type CommentType = z.infer<typeof CommentSchema>;
