import { z, ZodSchema } from "zod";
import { UserSchema } from "./user.schema";
import { ThemeSchema } from "./theme.schema";
import { CommentSchema } from "./comment.schema";

export const PostSchema: ZodSchema = z.object({
  postId: z.string(),
  message: z.string(),
  images: z.array(z.string()),
  anonymous: z.boolean(),
  likes: z.array(UserSchema),
  theme: ThemeSchema,
  comments: z.array(CommentSchema),
});

export type PostType = z.infer<typeof PostSchema>;
