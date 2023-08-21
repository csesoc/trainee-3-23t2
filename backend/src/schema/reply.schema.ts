import { z, ZodSchema } from "zod";
import { UserSchema } from "./user.schema";

export const ReplySchema: ZodSchema = z.object({
  replyId: z.string(),
  message: z.string(),
  images: z.array(z.string()),
  anonymous: z.boolean(),
  likes: z.array(UserSchema),
});

export type ReplyType = z.infer<typeof ReplySchema>;
