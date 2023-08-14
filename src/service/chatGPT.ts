import { Configuration, OpenAIApi } from "openai";

export async function callChatGPT({
  prompt,
  conversation = [],
}: {
  prompt: string;
  conversation: {
    text: string;
    role: "user" | "assistant";
  }[];
}) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const openai = new OpenAIApi(configuration);

    const messages = conversation.map((message) => ({
      role: message.role,
      content: message.text,
    }));
    messages.push({ role: "user", content: prompt });

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 1000,
    });

    return response.data.choices[0].message;
  } catch (error) {
    console.error("Error calling chatGPT API :", error);
    return null;
  }
}
