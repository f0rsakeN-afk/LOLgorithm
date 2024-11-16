import { Message, ChatResponse } from "@/types/index";
import { getGeminiResponse } from "@/utils/gemini";

export const chatApi = {
  sendMessage: async (
    message: string,
    messages: Message[],
    p0: { maxRetries: number; baseDelay: number; maxDelay: number }
  ): Promise<ChatResponse> => {
    try {
      // Format previous messages for context
      const conversationContext = messages
        .slice(-5) // Get last 5 messages for context
        .map((msg) => `${msg.role}: ${msg.content}`)
        .join("\n");

      // Construct the full prompt with context
      const fullPrompt = `
Previous conversation:
${conversationContext}

Current message: ${message}

Please provide a response considering the above context.`;

      // Get response from Gemini
      const response = await getGeminiResponse(fullPrompt);

      return {
        content: response,
      };
    } catch (error) {
      // Proper error handling
      const errorMessage =
        error instanceof Error ? error.message : "Failed to get response";
      throw new Error(`Chat API Error: ${errorMessage}`);
    }
  },

  // Optional: Add streaming support
  streamMessage: async function* (message: string, messages: Message[]) {
    try {
      const conversationContext = messages
        .slice(-5)
        .map((msg) => `${msg.role}: ${msg.content}`)
        .join("\n");

      const fullPrompt = `
Previous conversation:
${conversationContext}

Current message: ${message}`;

      // Implement streaming logic here when needed
      yield {
        content: "Streaming response...",
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to stream response";
      throw new Error(`Chat API Stream Error: ${errorMessage}`);
    }
  },

  // Optional: Add rate limiting check
  checkRateLimit: async (): Promise<boolean> => {
    // Implement rate limiting logic here
    return true;
  },

  // Optional: Add message validation
  validateMessage: (message: string): boolean => {
    if (!message.trim()) {
      throw new Error("Message cannot be empty");
    }
    if (message.length > 4000) {
      throw new Error("Message is too long");
    }
    return true;
  },
};

// Error handling utility
export class ChatError extends Error {
  constructor(message: string, public code: string, public status?: number) {
    super(message);
    this.name = "ChatError";
  }
}

// Optional: Add retry logic
export const withRetry = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: Error | null = null;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        await new Promise((resolve) =>
          setTimeout(resolve, delay * Math.pow(2, i))
        );
      }
    }
  }

  throw lastError;
};

// Usage example with retry wrapper
export const sendMessageWithRetry = (message: string, messages: Message[]) => {
  return withRetry(() => chatApi.sendMessage(message, messages));
};
