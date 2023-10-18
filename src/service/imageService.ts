import axios from "axios";

export const generateImageWithUserInput = async (userInput: string) => {
  const response = await axios.post("/api/generate-image", {
    prompt: userInput,
  });
  if (response.status !== 200) {
    throw new Error(`에러 코드: ${response.status}`);
  }

  return response.data;
};
