import { z } from "zod";

const envSchema = z.object({
  VITE_GOOGLE_GEMINI_API_KEY: z.string().min(1),
});

export const env = envSchema.parse({
  VITE_GOOGLE_GEMINI_API_KEY: import.meta.env.VITE_GOOGLE_GEMINI_API_KEY,
});