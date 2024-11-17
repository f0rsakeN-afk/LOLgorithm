import { env } from "@/env";

const MODELS = {
  DEFAULT: "gemini-1.0-pro",
  FAST: "gemini-1.5-flash-latest",
  PRO: "gemini-1.0-pro",
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getGeminiResponse = async (prompt: string, retries = 3) => {
  const baseDelay = 1000;
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODELS.DEFAULT}:generateContent?key=${env.VITE_GOOGLE_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
            ],
          }),
        }
      );

      if (response.status === 503) {
        console.log(`Attempt ${i + 1}: Service unavailable, retrying...`);
        const waitTime = baseDelay * Math.pow(2, i);
        await delay(waitTime);
        continue;
      }

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Check if we have a valid response
      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error("Invalid response format from API");
      }

      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      if (i === retries - 1) {
        // If this was our last retry, throw the error
        throw error;
      }
      // Otherwise, wait and try again
      const waitTime = baseDelay * Math.pow(2, i);
      console.log(`Attempt ${i + 1} failed, retrying in ${waitTime}ms...`);
      await delay(waitTime);
    }
  }

  throw new Error("Max retries reached");
};
