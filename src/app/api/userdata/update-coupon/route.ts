import { dbClient } from "@/service/mongoDB";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { coupon } = await req.json();
    const session = await getServerSession();
    const email = session?.user?.email;

    if (!email) {
      return new Response("Unauthorized", { status: 401 });
    }

    const db = await dbClient();
    const result = await db
      .collection("user-data")
      .updateOne({ email: email }, { $set: { coupon: coupon } });

    if (result.modifiedCount === 1) {
      return NextResponse.json(
        { message: "쿠폰이 업데이트되었습니다" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "사용자를 찾을 수 없습니다" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "coupon upload server error" },
      { status: 500 }
    );
  }
}
