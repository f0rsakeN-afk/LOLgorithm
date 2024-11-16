export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: number;
}

export interface ChatResponse {
  content: string;
  error?: string;
}
