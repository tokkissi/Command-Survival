import { dbClient } from "@/service/mongoDB";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession();
  const email = session?.user?.email;

  if (email) {
    try {
      const db = await dbClient();

      const userData = await db
        .collection("user-data")
        .findOne({ email: email });

      // 기존 유저 데이터가 있다면 그 데이터를 반환
      if (userData) {
        return NextResponse.json(userData, { status: 200 });

        // 기존 유저 데이터가 없다면 새로 만들어서 db에 추가하고, 그 데이터를 반환
      } else {
        const newUserData = {
          email: email,
          coupon: 1,
        };
        await db.collection("user-data").insertOne(newUserData);
        return NextResponse.json(newUserData, { status: 200 });
      }
    } catch (error) {
      return new Response(JSON.stringify({ error: "user-data server error" }), {
        status: 500,
      });
    }
  } else {
    return new Response("Unauthorized", { status: 401 });
  }
}
