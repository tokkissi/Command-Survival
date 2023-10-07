import { dbClient } from "@/service/mongoDB";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession();
    console.log("세션 정보:", session);

    const email = session?.user?.email;

    if (!email) {
      return new Response("Unauthorized", { status: 401 });
    }

    console.log("savedata/delete api 실행됨");

    const db = await dbClient();
    const result = await db.collection("save-data").deleteOne({ email: email });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "No gameData found to delete" },
        { status: 404 }
      );
    } else {
      return NextResponse.json(
        {
          message: "GameData deleted successfully",
          deletedCount: result.deletedCount,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log("게임 데이터 삭제 api 에러 발생");
    return NextResponse.json(
      { message: "delete GameData failed" },
      { status: 500 }
    );
  }
}
