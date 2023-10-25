import { dbClient } from "@/service/mongoDB";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession();

    const email = session?.user?.email;

    if (!email) {
      return new Response("Unauthorized", { status: 401 });
    }

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
    return NextResponse.json(
      { message: "delete GameData failed" },
      { status: 500 }
    );
  }
}
