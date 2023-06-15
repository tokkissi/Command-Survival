import Image from "next/image";
import { Black_Han_Sans } from "next/font/google";

type Props = {
  text: string;
  onClick: () => void;
};

const blackHanSans = Black_Han_Sans({ weight: "400", subsets: ["latin"] });

// 한글 8자 이내로 사용
export default function Button({ text, onClick }: Props) {
  return (
    <button
      className={`${blackHanSans.className} relative mx-auto font-bold text-xl  text-[#333333] hover:text-[#009063]`}
      onClick={onClick}
    >
      <Image
        className="w-80 h-20"
        src="/images/btn_row_removebg.png"
        alt="button image"
        width={400}
        height={150}
      />
      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-[4px] ">
        {text}
      </span>
    </button>
  );
}
