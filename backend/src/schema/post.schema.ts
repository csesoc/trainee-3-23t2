import { z, ZodSchema } from "zod";
import { UserSchema } from "./user.schema";
import { ThemeSchema } from "./theme.schema";
import { CommentSchema } from "./comment.schema";

export const PostSchema: ZodSchema = z.object({
  postId: z.string(),
  message: z.string(),
  images: z.array(z.string()),
  anonymous: z.boolean(),
  likes: z.array(z.string()),
  theme: ThemeSchema,
  author: UserSchema,
  comments: z.array(CommentSchema),
});

export type PostType = z.infer<typeof PostSchema>;

export const AllPostsSchema = z.object({
  offset: z.string().transform(Number),
});

export const NewPostSchema = z.object({
  message: z.string(),
  images: z.array(z.string()),
  anonymous: z.boolean(),
  themeId: z.string(),
});
