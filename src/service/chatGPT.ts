import { Configuration, OpenAIApi } from "openai";

export async function callChatGPT(prompt: string) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const openai = new OpenAIApi(configuration);
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "you are a smart doctor",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 1000,
    });

    return response.data.choices[0].message;
  } catch (error) {
    console.error("Error calling chatGPT API :", error);
    return null;
  }
}
