import { dbClient } from "@/service/mongoDB";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession();
  const email = session?.user?.email;

  if (email) {
    const db = await dbClient();

    return db
      .collection("save-data")
      .findOne({ email: email }, { sort: { createdAt: -1 } })
      .then((res) => NextResponse.json(res, { status: 200 }))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  } else {
    return new Response("Unauthorized", { status: 401 });
  }
}
