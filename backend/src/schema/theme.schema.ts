import { ZodSchema, z } from "zod";

export const ThemeSchema: ZodSchema = z.object({
  themeId: z.string(),
  name: z.string(),
  image: z.string(),
  backgroundColor: z.string(),
  textColor: z.string()
});

export type ThemeType = z.infer<typeof ThemeSchema>;
