import { callChatGPT } from "@/service/chatGPT";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  try {
    const response = await callChatGPT(prompt);

    return NextResponse.json(JSON.stringify(response?.content), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}