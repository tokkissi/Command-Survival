import { generateImage } from "@/service/generateImage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log("이미지 생성 api에서 실행됨");

    const { prompt } = await req.json();
    console.log("받은 prompt :", prompt);
    const res = await generateImage(prompt);
    console.log("api 내 생성 주소: ", res);

    return NextResponse.json(res.url, {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
