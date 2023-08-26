import axios from "axios";

export const askAIWithUserInput = async (userInput: {
  prompt: string;
  conversation: {
    text: string;
    role: "user" | "assistant" | "system";
  }[];
}) => {
  const response = await axios.post("/api/play", userInput);
  console.log("api 요청 body", userInput);
  if (response.status !== 200) {
    throw new Error(`에러 코드: ${response.status}`);
  }

  return response.data;
};
