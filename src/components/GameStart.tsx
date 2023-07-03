"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Button from "./ui/Button";
import { useRouter } from "next/navigation";

type Props = {
  user: string | undefined | null;
};

export default function GameStart({ user }: Props) {
  const router = useRouter();
  const handleClickStartBtn = () => {
    router.push("/play");
  };

  return (
    <div className="h-full flex justify-center items-center">
      <div className="flex flex-col">
        <Image
          src="/images/logo-title.png"
          alt="game title logo"
          width={500}
          height={400}
        />
        <Button
          text={user ? "게임 시작" : "로그인 후 게임 시작"}
          onClick={user ? handleClickStartBtn : () => signIn()}
        />
      </div>
    </div>
  );
}
