import { Message, ChatResponse } from "@/types/index";
import { getGeminiResponse } from "@/utils/gemini";

export const chatApi = {
  sendMessage: async (
    message: string,
    messages: Message[]
  ): Promise<ChatResponse> => {
    try {
      // Input validation
      if (!message.trim()) {
        throw new Error("Message cannot be empty");
      }

      if (message.length > 4000) {
        throw new Error("Message is too long (max 4000 characters)");
      }

      // Format previous messages for context
      const conversationContext = messages
        .slice(-5) // Get last 5 messages for context
        .map(
          (msg) =>
            `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`
        )
        .join("\n");

      // Construct the prompt with clear instructions
      const fullPrompt = `
Context: You are a helpful and knowledgeable AI assistant engaging in a conversation.

Previous conversation:
${conversationContext}

Current user message: ${message}

Please provide a clear, helpful, and relevant response while maintaining context of the conversation.
Remember to:
- Be concise but thorough
- Stay on topic
- Be friendly and professional
- Provide accurate information

Response:`;

      // Get response with built-in retry logic
      const response = await getGeminiResponse(fullPrompt);

      if (!response) {
        throw new Error("Empty response received from AI");
      }

      return {
        content: response.trim(),
      };
    } catch (error) {
      console.error("Full error:", error);
      let errorMessage = "An error occurred while getting a response.";

      if (error instanceof Error) {
        if (error.message.includes("503")) {
          errorMessage =
            "The AI service is temporarily unavailable. Please try again in a few moments.";
        } else if (error.message.includes("429")) {
          errorMessage =
            "Too many requests. Please wait a moment before trying again.";
        } else if (
          error.message.includes("401") ||
          error.message.includes("403")
        ) {
          errorMessage = "Authentication error. Please check your API key.";
        } else {
          errorMessage = error.message;
        }
      }

      throw new ChatError(errorMessage, "API_ERROR");
    }
  },

  validateMessage: (message: string): boolean => {
    if (!message.trim()) {
      throw new ChatError("Message cannot be empty", "VALIDATION_ERROR");
    }
    if (message.length > 4000) {
      throw new ChatError(
        "Message is too long (max 4000 characters)",
        "VALIDATION_ERROR"
      );
    }
    return true;
  },

  // Rate limiting helper
  rateLimit: {
    requests: 0,
    lastReset: Date.now(),
    maxRequests: 10,
    timeWindow: 60000, // 1 minute

    check: function (): boolean {
      const now = Date.now();
      if (now - this.lastReset > this.timeWindow) {
        this.requests = 0;
        this.lastReset = now;
      }

      if (this.requests >= this.maxRequests) {
        throw new ChatError(
          "Rate limit exceeded. Please wait a moment before sending more messages.",
          "RATE_LIMIT_ERROR"
        );
      }

      this.requests++;
      return true;
    },
  },
};

// Custom error class for better error handling
export class ChatError extends Error {
  constructor(
    message: string,
    public code: string = "UNKNOWN_ERROR",
    public status?: number
  ) {
    super(message);
    this.name = "ChatError";
  }
}

// Retry logic with exponential backoff
export const withRetry = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: Error | null = null;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      // If it's the last retry, throw the error
      if (i === maxRetries - 1) throw lastError;

      // Calculate delay with exponential backoff
      const delay = baseDelay * Math.pow(2, i);

      // Log retry attempt
      console.log(`Attempt ${i + 1} failed, retrying in ${delay}ms...`);

      // Wait before next retry
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
};

// Helper function to send message with retry logic
export const sendMessageWithRetry = (message: string, messages: Message[]) => {
  return withRetry(async () => {
    // Check rate limit before making request
    chatApi.rateLimit.check();

    // Validate message
    chatApi.validateMessage(message);

    // Send message
    return await chatApi.sendMessage(message, messages);
  });
};

// Export types and constants
export const CHAT_CONSTANTS = {
  MAX_MESSAGE_LENGTH: 4000,
  MAX_CONTEXT_MESSAGES: 5,
  RATE_LIMIT: {
    MAX_REQUESTS: 10,
    TIME_WINDOW: 60000, // 1 minute
  },
};
