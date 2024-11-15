import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "@/env";

const genAI = new GoogleGenerativeAI(env.VITE_GOOGLE_GEMINI_API_KEY);

export const getGeminiResponse = async (prompt: string) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash"' });
  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
};
