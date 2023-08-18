"use client";

import { useEffect, useState } from "react";
import Console from "./Console";
import { useSession } from "next-auth/react";
import { useLoadSaveData } from "@/hooks/useLoadSaveData";
import Image from "next/image";
import GameSideBar from "./GameSideBar";
import { useGameDataStore } from "@/stores/useGameDataStore";

// 세이브 데이터 가져오기. 첫 시작 유무 확인용
// 쿠키, 로컬스토리지 등은 데이터 삭제 위험이 있으므로 db에 저장함
export default function GameInterface() {
  const [loadCheck, setLoadCheck] = useState(false); // 처음하기 랜더링 여부
  const [isFirstStart, setIsFirstStart] = useState(false);

  const { gameData, setGameData } = useGameDataStore();
  const { data: session } = useSession();
  const email = session?.user?.email!;

  const {
    data: fetchedSaveData,
    isLoading,
    isError,
    error,
  } = useLoadSaveData(email);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    const err = error as Error;
    console.log(err);
    const statusCode = parseInt(err.message.split(":")[1].trim());
    switch (statusCode) {
      case 401:
        return <div>로그인 후 실행 바랍니다</div>;

      case 500:
        return <div>서버 에러가 발생했습니다</div>;

      default:
        return <div>예상치 못한 에러가 발생했습니다</div>;
    }
  }
  if (!fetchedSaveData) {
    return <div>세이브 데이터가 없습니다</div>;
  }

  if (!loadCheck) {
    return (
      <div className="relative flex justify-center items-center">
        <Image
          className="w-[400px] h-[300px]"
          src="/images/parchment.png"
          alt="parchment background"
          width={440}
          height={580}
        />
        <div className="absolute w-full h-full flex flex-col justify-center items-center gap-4 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-3xl font-bold">
          {/* 이어서 하기 선택 시, firstStart = false 세이브 데이터 불러오기 로직 진행 */}
          {fetchedSaveData && (
            <span
              className="hover:text-[#009063] hover:cursor-pointer py-2 px-4"
              onClick={() => {
                setGameData(fetchedSaveData);
                setLoadCheck(true);
                setIsFirstStart(false);
              }}
            >
              이어서 하기
            </span>
          )}
          {/* 처음부터 하기 선택 시, 상태 fistStart = true, 게임 초기 실행 로직 진행 */}
          {/* 처음부터 하기 선택 시, conesole 컴포넌트로 firstStart 상태 넘겨줌 */}
          <span
            className="hover:text-[#009063] hover:cursor-pointer py-2 px-4"
            onClick={() => {
              setLoadCheck(true);
              setIsFirstStart(true);
            }}
          >
            처음부터 하기
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded overflow-hidden max-w-5xl w-full h-full flex flex-col sm:flex-row">
      <GameSideBar />
      <Console isFirstStart={isFirstStart} />
    </div>
  );
}
