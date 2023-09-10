"use client";

import { useEffect, useRef, useState } from "react";
import useUIStore from "@/stores/useUIStore";
import TextBubble from "./ui/conversation/TextBubble";
import { useMutation } from "@tanstack/react-query";
import { askAIWithUserInput } from "@/service/conversation";
import { startSystemPrompt } from "@/Prompt_libaray/startPrompt";
import { useGameDataStore } from "@/stores/useGameDataStore";
import { normalEventPrompt } from "@/Prompt_libaray/normalEventPrompt";
import { useUserData } from "@/stores/useUserData";
import ModalPortal from "./ui/ModalPortal";
import InfoModal from "./ui/InfoModal";
import DetailEndding from "./DetailEndding";
import { battlePrompt } from "@/Prompt_libaray/battlePrompt";

export default function Console({ isFirstStart }: { isFirstStart: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [conversationHistory, setConversationHistory] = useState<
    {
      text: string;
      role: "user" | "assistant";
    }[]
  >([]);
  const { isMobile } = useUIStore();
  const { setGameData, gameData, incrementFloor } = useGameDataStore();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isVictory, setIsVictory] = useState<boolean>(false);
  const [shouldIncrementFloor, setShouldIncrementFloor] = useState(true);

  const flexiblePadding = isMobile ? "" : "p-4";
  const flexibleFontSize = isMobile ? "text-sm" : "text-base";

  const checkChoiceFormat = (text: string): boolean => {
    // 1. 선택지 1
    // 2. 선택지 2
    // 3. 선택지 3
    // 위와 같은 형식을 가진 문자열이라고 가정
    const regex = /\d\.\s+.+/g;
    const matches = text.match(regex);
    if (matches === null) {
      return false;
    }
    return matches.length >= 1;
  };

  const mutation = useMutation(askAIWithUserInput, {
    onSuccess: (res) => {
      console.log("요청 성공 시 현재 층 확인: ", gameData.currentFloor);
      console.log("요청 성공 시 최대 층 확인: ", gameData.maxFloor);

      // 초기 응답 형식에 맞지 않아 parsing 하지 못할 때, 사용할 기본값
      const defaultAtk = parseInt(process.env.NEXT_PUBLIC_DEFAULT_ATK!);
      const defaultDef = parseInt(process.env.NEXT_PUBLIC_DEFAULT_DEF!);
      const defaultMaxHP = parseInt(process.env.NEXT_PUBLIC_DEFAULT_MAXHP!);
      const defaultItems = process.env.NEXT_PUBLIC_DEFAULT_ITEMS;

      // 선택지 응답 형식이 없다면 다시 API 호출
      if (!checkChoiceFormat(res)) {
        console.log("선택지 불량. 재요청함");
        setShouldIncrementFloor(false);
        mutation.mutate({
          prompt: normalEventPrompt + " 반드시 선택지 3개를 포함해야 해",
          conversation: [...conversationHistory],
        });
        return;
      }

      setShouldIncrementFloor(true);

      // 형식에 맞으면 parsing하여 추출해서 각데이터를 전역 상수로 세팅.
      // 형식에 맞지 않으면 기본값을 세팅
      if (isFirstStart) {
        const atk = parseInt(res.match(/ATK:\s*(\d+)/)?.[1] || defaultAtk);
        const def = parseInt(res.match(/DEF:\s*(\d+)/)?.[1] || defaultDef);
        const maxhp = parseInt(
          res.match(/maxHP:\s*(\d+)/)?.[1] || defaultMaxHP
        );
        const itemsMatch = res.match(/소지품:\s*\[(.*?)\]/);

        const items = itemsMatch ? itemsMatch[1] : defaultItems;
        setGameData({
          attribute: {
            ATK: atk,
            DEF: def,
            maxHP: maxhp,
          },
          items: items,
          hp: maxhp,
          maxFloor: Number(process.env.NEXT_PUBLIC_DEFAULT_MAX_FLOOR),
          currentFloor: gameData.currentFloor,
        });
      }

      const battleInfo = {
        ATK: gameData.attribute.ATK,
        DEF: gameData.attribute.DEF,
        hp: gameData.hp,
        currentFloor: gameData.currentFloor,
      };
      let battleLog = "";

      if (gameData.currentFloor !== 0 && gameData.currentFloor % 5 === 0) {
        battleLog = battlePrompt(battleInfo);
      }

      const combinedResponse = `${battleLog}\n\n${res}`;

      const remainingHpMatch = battleLog.match(/남은 체력:\s*(\d+)/);

      if (remainingHpMatch) {
        const remainingHp = parseInt(remainingHpMatch[1]);
        // 승리 시 gameData의 hp 갱신
        if (!battleLog.includes("전투 패배!")) {
          setGameData((prevData) => ({
            ...prevData,
            hp: remainingHp,
          }));
        } else {
          // 패배 시, gameData의 hp를 0로 갱신
          setGameData((prevData) => ({
            ...prevData,
            hp: 0,
          }));
        }
      }

      setConversationHistory((preHistory) => [
        ...preHistory.slice(0, preHistory.length - 1),
        { role: "assistant", text: combinedResponse },
      ]);
    },
    onError: (error) => {
      console.error("api call error: ", error);
      setConversationHistory((preHistory) => [
        ...preHistory.slice(0, preHistory.length - 1),
        {
          role: "assistant",
          text: "서버 요청에 실패했습니다. 다시 질문해주세요",
        },
      ]);
    },
  });

  const { incrementCoupon } = useUserData();

  useEffect(() => {
    if (isFirstStart) {
      setConversationHistory((preHistory) => [
        { role: "assistant", text: "세계관 설정 중..." },
      ]);
      mutation.mutate({
        prompt: startSystemPrompt,
        conversation: [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstStart]);

  useEffect(() => {
    console.log("층 확인", gameData.currentFloor);
  }, [gameData.currentFloor]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputRef.current === null) return;
    if (inputRef.current.value === "") return;

    const userInputAsk = inputRef.current.value;

    const maxFloor = parseInt(process.env.NEXT_PUBLIC_DEFAULT_MAX_FLOOR!);
    let newFloor = 0;

    // 입력 시 층 증가
    if (shouldIncrementFloor) {
      newFloor = incrementFloor();
      console.log("증가된 뉴 플로어", newFloor);
    }

    // 마지막 층 도달 시 보스 전투
    if (newFloor === maxFloor) {
      let battleLog = battlePrompt({
        ATK: gameData.attribute.ATK,
        DEF: gameData.attribute.DEF,
        hp: gameData.hp,
        currentFloor: newFloor,
      });

      // 패배 조건을 확인
      const isDefeated = battleLog.includes("전투 패배!");

      // 패배 로그 또는 승리 로그 랜더링
      setConversationHistory((preHistory) => [
        ...preHistory,
        { role: "assistant", text: battleLog },
      ]);

      // 패배 또는 승리에 따른 후속 처리
      setTimeout(() => {
        if (isDefeated) {
          handleBattleDefeat();
        } else {
          handleVictory();
        }
      }, 1500);

      // 10층에서는 이후 API 호출을 하지 않도록 함수 종료
      return;
    }
    // 5의 배수로 전투 로그가 발생하지만 마지막 층이 아닌 경우 승리 시 일반 이벤트 api 요청 필요
    else if (newFloor % 5 === 0 && newFloor !== maxFloor) {
      let battleLog = battlePrompt({
        ATK: gameData.attribute.ATK,
        DEF: gameData.attribute.DEF,
        hp: gameData.hp,
        currentFloor: newFloor,
      });

      const isDefeated = battleLog.includes("전투 패배!");

      if (isDefeated) {
        setConversationHistory((preHistory) => [
          ...preHistory,
          { role: "assistant", text: battleLog },
        ]);

        setTimeout(() => {
          handleBattleDefeat();
        }, 1500);
        return;
      } else {
        setConversationHistory((preHistory) => [
          ...preHistory,
          { role: "assistant", text: battleLog },
        ]);
        // 승리 시, handleVictory는 실행하지 않고, API 호출
        mutation.mutate({
          prompt: normalEventPrompt,
          conversation: [...conversationHistory],
        });
        return;
      }
    } else {
      setConversationHistory((preHistory) => [
        ...preHistory,
        { role: "user", text: userInputAsk },
        { role: "assistant", text: "로딩 중..." },
      ]);
      inputRef.current!.value = "";

      let systemContent = "";

      mutation.mutate({
        prompt: userInputAsk,
        conversation: [
          ...conversationHistory.slice(-4),
          { role: "system", text: systemContent },
        ],
      });
    }
  };

  const handleVictory = () => {
    // 모달로 승리 이미지 보여주고, 유저 쿠폰 수 +1 해주고 보여준 뒤, 타이틀로 리다이렉트
    incrementCoupon();

    setIsVictory(true);
    setShowModal(true);
  };

  const handleBattleDefeat = () => {
    // 모달로 패배 이미지 보여주고, 타이틀로 리다이렉트
    setIsVictory(false);
    setShowModal(true);
  };

  return (
    <div
      className={`border bg-gray-500/70 w-full h-full flex flex-col overflow-auto ${flexiblePadding}`}
    >
      {/* 기존 질문과 답변 데이터 보여주기. 게임 첫 시작 시 고려해서 만들 것 */}

      {/* 여백 혹은 질문 쌓일 공간 */}
      <div className="grow"></div>

      <div className={`w-full flex flex-col p-6 gap-6 ${flexibleFontSize}`}>
        {/* 새로하기를 눌렀을 경우 system 명령어 요청 보내서 답변 받아 랜더링 추가 예정 */}
        {conversationHistory.map((message, index) => (
          <TextBubble
            text={message.text}
            role={message.role}
            isLoading={
              mutation.isLoading && index === conversationHistory.length - 1
            }
            key={index}
          />
        ))}
      </div>

      <form
        className="flex rounded-md mt-8 m-4 overflow-hidden"
        onSubmit={handleSubmit}
      >
        <input
          className="bg-white w-full px-2 border outline-gray-600"
          placeholder="다음에 할 행동을 30자 이내로 적어주세요"
          type="text"
          required
          ref={inputRef}
        />
        <button
          className="py-1 px-4 bg-gray-200 whitespace-nowrap border-2 border-gray-300 shadow-sm"
          type="submit"
        >
          전송
        </button>
      </form>

      {showModal && (
        <ModalPortal>
          <InfoModal onClose={() => setShowModal(false)}>
            <DetailEndding isVictory={isVictory} />
          </InfoModal>
        </ModalPortal>
      )}
    </div>
  );
}
