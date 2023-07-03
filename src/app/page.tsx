import GameStart from "@/components/GameStart";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();
  console.log(session);
  const user = session?.user;

  return (
    <section className="h-full">
      <GameStart user={user?.email} />
    </section>
  );
}
