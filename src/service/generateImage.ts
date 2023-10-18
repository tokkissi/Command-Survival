import { Configuration, OpenAIApi } from "openai";

export const generateImage = async (prompt: string) => {
  console.log("ai 이미지 생성 요청");
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const res = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "512x512",
  });
  return res.data.data[0];
};
