import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./useLocalStorage";
import { Message } from "@/types";
import { createMessage } from "@/utils/chat";
import { chatApi } from "@/services/api";

export const CHAT_STORAGE_KEY = "chat-messages";

export const useChat = () => {
  const queryClient = useQueryClient();
  const [messages, setMessages] = useLocalStorage<Message[]>(
    CHAT_STORAGE_KEY,
    []
  );

  const mutation = useMutation({
    mutationFn: async (content: string) => {
      const userMessage = createMessage(content, "user");
      setMessages((prev) => [...prev, userMessage]);
      try {
        return await chatApi.sendMessage(content, messages);
      } catch (error) {
        // Remove the user message if the request completely fails
        setMessages((prev) => prev.filter((msg) => msg.id !== userMessage.id));
        throw error;
      }
    },
    onSuccess: (response) => {
      const aiMessage = createMessage(response.content, "assistant");
      setMessages((prev) => [...prev, aiMessage]);
    },
    onError: (error) => {
      console.error("Chat Error:", error);
    },
  });

  const sendMessage = (content: string) => {
    mutation.mutate(content);
  };

  const clearMessages = () => {
    setMessages([]);
    queryClient.clear();
  };

  return {
    messages,
    isLoading: mutation.isPending,
    error: mutation.error,
    sendMessage,
    clearMessages,
  };
};
