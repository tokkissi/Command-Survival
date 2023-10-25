import { dbClient } from "@/service/mongoDB";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { gameData, conversationHistory } = await req.json();

    const session = await getServerSession();

    const email = session?.user?.email;

    if (!email) {
      return new Response("Unauthorized", { status: 401 });
    }

    const db = await dbClient();

    const currentDate = new Date();

    // 문서가 존재하는지 확인
    const existingDoc = await db
      .collection("save-data")
      .findOne({ email: email });

    // 문서가 존재하지 않는 경우 createdAt도 설정
    const setData = existingDoc
      ? {
          conversationHistory: conversationHistory,
          email: gameData.email,
          gameState: gameData.gameState,
        }
      : {
          conversationHistory: conversationHistory,
          email: gameData.email,
          gameState: gameData.gameState,
          createdAt: currentDate,
        };

    const result = await db.collection("save-data").updateOne(
      { email: email },
      {
        $set: setData,
      },
      { upsert: true }
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "게임 데이터 및 대화 이력 저장 중 서버 에러" },
      { status: 500 }
    );
  }
}
