import { dbClient } from "@/service/mongoDB";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    console.log("db저장 api 실행시작");
    const { gameData, conversationHistory } = await req.json();
    console.log("JSON 파싱 결과:", gameData, conversationHistory);

    const session = await getServerSession();
    console.log("세션 정보:", session);

    const email = session?.user?.email;

    if (!email) {
      return new Response("Unauthorized", { status: 401 });
    }

    console.log("savedata/save api 실행됨");
    console.log("게임 데이터 저장할 api 내부 데이터 : ", gameData);
    console.log("게임 데이터 저장할 api 내부 대화이력 : ", conversationHistory);

    const db = await dbClient();
    console.log("DB 연결 상태:", db ? "연결됨" : "연결 실패");

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

    if (result.modifiedCount === 1) {
      console.log("문서가 수정되었습니다.");
    } else if (result.upsertedCount === 1) {
      console.log("문서가 새로 생성되었습니다.");
    }

    console.log("업데이트 결과:", result); // 추가된 로그

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "게임 데이터 및 대화 이력 저장 중 서버 에러" },
      { status: 500 }
    );
  }
}
