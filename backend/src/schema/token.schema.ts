import { ZodSchema, z } from "zod";

export const TokenSchema: ZodSchema = z.object({
  token: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type RefreshTokenType = z.infer<typeof TokenSchema>;
