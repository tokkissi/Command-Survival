import { callChatGPT } from "@/service/chatGPT";
import { formatGptResponse } from "@/util/gptResponseFommatter";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt, conversation } = await req.json();

  try {
    const response = await callChatGPT({ prompt, conversation });

    if (!response || !response.content) {
      return new Response(
        JSON.stringify({ error: "Response is null or undefined" }),
        { status: 500 }
      );
    }
    const content = JSON.stringify(response?.content);

    return NextResponse.json(formatGptResponse(content), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
