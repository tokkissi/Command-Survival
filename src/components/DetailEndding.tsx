import Link from "next/link";

type DetailEnddingProps = {
  isVictory: boolean;
};

export default function DetailEndding({ isVictory }: DetailEnddingProps) {
  const hoverStyle = "hover:cursor-pointer hover:text-pink-600";

  return (
    <div className="text-lg">
      <p className="mb-6">{isVictory ? "승리!" : "패배..."}</p>
      <p>{isVictory ? "ai 이미지 쿠폰 1개 획득!" : "다시 도전해보세요!"}</p>
      <div className="flex flex-col mt-8 gap-2 ">
        <Link href={"/"} className={hoverStyle}>
          ◾ 새 게임 하기
        </Link>

        <Link href={"/ai-image-generator"} className={hoverStyle}>
          ◾ ai 이미지 생성 하기
        </Link>
      </div>
    </div>
  );
}
