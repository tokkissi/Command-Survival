import { signOut, useSession } from "next-auth/react";
import Avatar from "./Avatar";
import useUIStore from "@/stores/useUIStore";
import { useUserData } from "@/stores/useUserData";
import Link from "next/link";
import GoBackIcon from "./ui/icons/GoBackIcon";
import { useRouter } from "next/navigation";

export default function MenuList({ isAiPage = false }: { isAiPage?: boolean }) {
  const { userData } = useUserData();
  const { data: session } = useSession();
  const userImage = session?.user?.image;
  const fullEmail = session?.user?.email;
  const email = fullEmail?.split("@")[0];
  const router = useRouter();

  const { menuToggled, isMobile } = useUIStore();

  const isMobileMenuFolded =
    !isAiPage && isMobile && !menuToggled ? true : false;

  return (
    <section
      className={
        isMobileMenuFolded
          ? "hidden"
          : "flex flex-col w-full text-base font-bold sm:w-44 mt-2"
      }
    >
      {/* ai 페이지가 아니거나, ai 페이지지만 모바일 아닌 경우 */}
      {(!isAiPage || (isAiPage && !isMobile)) && (
        <>
          <div className="flex items-center mb-4 justify-center">
            {session && <Avatar userImage={userImage} isMobile={isMobile} />}
            <span className="text-sm ml-2">{email} 님 모험 중</span>
          </div>

          <div className="text-sm text-center mb-2">
            <p className="mb-2">
              Ai 이미지 쿠폰{" "}
              <span className="text-blue-600">{userData.coupon}</span>개
            </p>
            <p className="text-xs text-gray-600 mb-2">
              (게임 클리어시 쿠폰 +1)
            </p>
          </div>

          <div className="flex flex-col gap-3 items-center justify-center w-full">
            {!isAiPage && (
              <Link
                href={"/ai-image-generator"}
                className="w-44 text-base py-1 text-center text-white rounded-lg bg-gray-600 shadow-xl hover:cursor-pointer hover:opacity-70 hover:bg-white hover:text-gray-800"
              >
                Ai 이미지 생성
              </Link>
            )}
            <Link
              href={"/"}
              className="w-44 py-1 text-center text-white rounded-lg hover:cursor-pointer hover:opacity-70 bg-gray-600 shadow-xl hover:bg-white hover:text-gray-800"
            >
              타이틀로 돌아가기
            </Link>
            <button
              className="w-44  py-1 text-center text-white rounded-lg  bg-gray-600 shadow-xl hover:cursor-pointer hover:opacity-70 hover:bg-white hover:text-gray-800"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              로그아웃
            </button>
          </div>
        </>
      )}

      {/* ai 페이지 모바일 ui */}
      {isAiPage && isMobile && (
        <div className="flex text-xs relative">
          <div
            className="mr-4 flex justify-center items-center hover:cursor-pointer"
            onClick={() => {
              router.back();
            }}
          >
            <GoBackIcon />
          </div>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="font-bold">
              남은 쿠폰 <span className="text-blue-600">{userData.coupon}</span>{" "}
              개
            </div>
            <div className="text-[8px] text-gray-600">
              게임 클리어 시 획득 가능
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
