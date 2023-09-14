import { useSession } from "next-auth/react";
import Avatar from "./Avatar";
import useUIStore from "@/stores/useUIStore";
import { useUserData } from "@/stores/useUserData";

export default function MenuList() {
  const { userData } = useUserData();
  const { data: session } = useSession();
  const userImage = session?.user?.image;
  const fullEmail = session?.user?.email;
  const email = fullEmail?.split("@")[0];

  const { menuToggled, isMobile } = useUIStore();

  const isMobileMenuFolded = isMobile && !menuToggled ? true : false;

  const handleAiImgGengeration = () => {};
  const handleGoTitle = () => {};
  const handleLogout = () => {};

  return (
    <section
      className={
        isMobileMenuFolded
          ? "hidden"
          : "flex flex-col w-full text-base font-bold sm:w-44 mt-2"
      }
    >
      <div className="flex items-center mb-4 justify-center">
        {session && <Avatar userImage={userImage} isMobile={isMobile} />}
        <span className="text-sm ml-2">{email} 님 모험 중</span>
      </div>

      <div className="text-sm text-center mb-2">
        <p className="mb-2">
          Ai 이미지 쿠폰{" "}
          <span className="text-blue-600">{userData.coupon}</span>개
        </p>
        <p className="text-xs text-gray-600 mb-2">(게임 클리어시 쿠폰 +1)</p>
      </div>

      <div className="flex flex-col gap-3 items-center justify-center w-full">
        <button
          className="w-44 text-base py-1 text-center text-white rounded-lg bg-gray-600 shadow-xl hover:cursor-pointer hover:opacity-70 hover:bg-white hover:text-gray-800"
          onClick={handleAiImgGengeration}
        >
          Ai 이미지 생성
        </button>
        <button
          className="w-44 py-1 text-center text-white rounded-lg hover:cursor-pointer hover:opacity-70 bg-gray-600 shadow-xl hover:bg-white hover:text-gray-800"
          onClick={handleGoTitle}
        >
          타이틀로 돌아가기
        </button>
        <button
          className="w-44  py-1 text-center text-white rounded-lg  bg-gray-600 shadow-xl hover:cursor-pointer hover:opacity-70 hover:bg-white hover:text-gray-800"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
    </section>
  );
}
