import { Message } from "@/types";

export const createMessage = (
  content: string,
  role: Message["role"]
): Message => ({
  id: crypto.randomUUID(),
  content,
  role,
  timestamp: Date.now(),
});
