import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();
  console.log(session);
  const user = session?.user;

  return (
    <section className="">
      <p>로그인 안해도 보임</p>
      {user && <p>{user.email}로그인 됨</p>}
    </section>
  );
}
