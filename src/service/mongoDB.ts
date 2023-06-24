import clientPromise from "@/util/database";

export async function dbClient() {
  const client = await clientPromise;
  return client.db("command-survival");
}
