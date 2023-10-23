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
import { updateUserCoupon } from "@/service/userService";
import { ConversationHistoryType } from "@/model/gameData";
import { deleteGameData, saveGameDataAndHistory } from "@/service/gameService";
import { useSession } from "next-auth/react";
import useSpeechToText from "@/hooks/useSpeechToText";

export default function Console({
  isFirstStart,
  onChangeFirstStart,
}: {
  isFirstStart: boolean;
  onChangeFirstStart: () => void;
}) {
  const [inputText, setInputText] = useState<string>("");
  const [conversationHistory, setConversationHistory] = useState<
    ConversationHistoryType[]
  >([]);
  const { isMobile } = useUIStore();
  const { setGameData, gameData, incrementFloor } = useGameDataStore();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isVictory, setIsVictory] = useState<boolean>(false);
  const [shouldIncrementFloor, setShouldIncrementFloor] = useState(true);
  const [isGPTResponseReceived, setIsGPTResponseReceived] = useState(false);

  const { data: session } = useSession();

  const flexiblePadding = isMobile ? "" : "p-4";
  const flexibleFontSize = isMobile ? "text-[8px]" : "text-sm";

  const { incrementCoupon } = useUserData();
  const { transcript, listening, toggleListening, resetScript, stopListening } =
    useSpeechToText();

  console.log("conversationHistory : ", conversationHistory);
  console.log("console 컴포넌트 내의 gameData : ", gameData);

  useEffect(() => {
    console.log("isFirstStart 변경됨: ", isFirstStart);
  }, [isFirstStart]);

  useEffect(() => {
    console.log("Console 컴포넌트 재렌더링");
  });

  useEffect(() => {
    console.log("transcript updated: ", transcript);
  }, [transcript]);

  useEffect(() => {
    console.log("inputText 업데이트: ", inputText);
  }, [inputText]);

  const checkChoiceFormat = (text: string): boolean => {
    // 1. 선택지 1
    // 2. 선택지 2
    // 3. 선택지 3
    // 위와 같은 형식을 가진 문자열이라고 가정

    console.log("받은 응답 이벤트 내용: ", text);

    // <br /> 태그를 '\n'으로 치환
    const replacedText = text.replace(/<br \/>/g, "\n");

    // 줄바꿈 문자를 기준으로 텍스트를 분리
    const lines = replacedText.split("\n");

    // 선택지가 있는 라인만 필터링
    const choiceLines = lines.filter((line) => /\d\.\s+.+/.test(line));

    // 선택지가 3개 이하인지 확인
    if (choiceLines.length < 3) {
      return false;
    }

    return true;
  };

  const saveGameDataMutation = useMutation(saveGameDataAndHistory, {
    onSuccess: (res) => {
      console.log("저장한 게임 데이터 : ", res);
      console.log("게임 데이터 저장 성공");
    },
    onError: (error) => {
      console.error("게임 데이터 저장 실패: ", error);
    },
  });

  const mutation = useMutation(askAIWithUserInput, {
    onSuccess: (res) => {
      console.log(
        "요청 성공 시 현재 층 확인: ",
        gameData.gameState.currentFloor
      );
      console.log("요청 성공 시 최대 층 확인: ", gameData.gameState.maxFloor);

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
        console.log("isFirstStart 시, 문자열 파싱하여 게임 데이터 상태 갱신함");
        const atk = parseInt(res.match(/ATK:\s*(\d+)/)?.[1] || defaultAtk);
        const def = parseInt(res.match(/DEF:\s*(\d+)/)?.[1] || defaultDef);
        const maxhp = parseInt(
          res.match(/maxHP:\s*(\d+)/)?.[1] || defaultMaxHP
        );
        const itemsMatch = res.match(/소지품:\s*\[(.*?)\]/);

        const items = itemsMatch ? itemsMatch[1] : defaultItems;
        setGameData((prevData) => ({
          ...prevData,
          email: session?.user?.email!,
          gameState: {
            attribute: {
              ATK: atk,
              DEF: def,
              maxHP: maxhp,
            },
            items: items,
            hp: maxhp,
            maxFloor: Number(process.env.NEXT_PUBLIC_DEFAULT_MAX_FLOOR),
            currentFloor: prevData.gameState.currentFloor,
          },
        }));

        onChangeFirstStart();
      }

      const battleInfo = {
        ATK: gameData.gameState.attribute.ATK,
        DEF: gameData.gameState.attribute.DEF,
        hp: gameData.gameState.hp,
        currentFloor: gameData.gameState.currentFloor,
      };
      let battleLog = "";

      if (
        gameData.gameState.currentFloor !== 0 &&
        gameData.gameState.currentFloor % 5 === 0
      ) {
        battleLog = battlePrompt(battleInfo);

        if (!checkChoiceFormat(res)) {
          console.log("전투 승리 후 선택지 불량. 재요청함");
          mutation.mutate({
            prompt: normalEventPrompt,
            conversation: [...conversationHistory],
          });
          return;
        }
      }

      console.log("battleLog 확인:", battleLog);

      const combinedResponse = `${battleLog}\n\n${res}`;

      updateGameDataAfterBattle(battleLog);

      setConversationHistory((preHistory) => [
        ...preHistory.slice(0, preHistory.length - 1),
        { role: "assistant", text: combinedResponse },
      ]);

      setIsGPTResponseReceived(true);
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
    if (gameData.gameState) {
      console.log("층 확인", gameData.gameState?.currentFloor);
    }
  }, [gameData.gameState]);

  useEffect(() => {
    // gameData 또는 conversationHistory가 변경되면 DB에 저장
    if (isGPTResponseReceived) {
      saveGameDataMutation.mutate({
        gameData,
        conversationHistory,
      });
      setIsGPTResponseReceived(false); // 초기화
    }
  }, [
    gameData,
    conversationHistory,
    saveGameDataMutation,
    isGPTResponseReceived,
  ]);

  useEffect(() => {
    if (!isFirstStart && conversationHistory.length < 1) {
      setConversationHistory(gameData.conversationHistory);
    }
  }, [isFirstStart, conversationHistory, gameData.conversationHistory]);

  // 언 마운트 시, 음성인식 함수를 클린업 함수로 실행
  useEffect(() => {
    const cleanup = async () => {
      console.log("Cleaning up...");
      await stopListening();
      resetScript();
    };

    // stopListening 이 비동기 함수이므로 return 뒤가 아니라 선언 후 호출
    cleanup().catch((err) => console.error("Cleanup failed", err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 음성인식으로 받은 값을 상태로 설정
  useEffect(() => {
    console.log("음성인식으로 받은 값 세팅 useEffect: ", transcript);

    setInputText(transcript);
  }, [transcript]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userInputAsk = inputText;

    const maxFloor = parseInt(process.env.NEXT_PUBLIC_DEFAULT_MAX_FLOOR!);
    let newFloor = 0;

    // 빈문자열이 아닐 경우만 api 요청
    if (userInputAsk !== "") {
      // 입력 시 층 증가
      if (shouldIncrementFloor) {
        newFloor = incrementFloor();
        console.log("증가된 뉴 플로어", newFloor);
      }

      // 마지막 층 도달 시 보스 전투
      if (
        newFloor === maxFloor ||
        (newFloor % 5 === 0 && newFloor !== maxFloor)
      ) {
        if (newFloor === maxFloor) {
          deleteGameData();
        }

        setConversationHistory((preHistory) => [
          ...preHistory,
          { role: "user", text: userInputAsk },
        ]);

        let battleLog = battlePrompt({
          ATK: gameData.gameState.attribute.ATK,
          DEF: gameData.gameState.attribute.DEF,
          hp: gameData.gameState.hp,
          currentFloor: newFloor,
        });

        console.log("배틀로그 생성됨 :", battleLog);

        const isDefeated = battleLog.includes("전투 패배!");

        if (isDefeated) {
          addBattleLogAndAction(battleLog, handleBattleDefeat, true);
        } else {
          if (newFloor === maxFloor) {
            updateGameDataAfterBattle(battleLog);
            addBattleLogAndAction(battleLog, handleVictory, true);
          } else {
            addBattleLogAndAction(battleLog, () => {}, false);
            mutation.mutate({
              prompt: normalEventPrompt,
              conversation: [...conversationHistory],
            });
          }
        }

        return;
      } else {
        setConversationHistory((preHistory) => [
          ...preHistory,
          { role: "user", text: userInputAsk },
          { role: "assistant", text: "로딩 중..." },
        ]);

        let systemContent = "";

        mutation.mutate({
          prompt: userInputAsk,
          conversation: [
            ...conversationHistory.slice(-4),
            { role: "system", text: systemContent },
          ],
        });
      }
    }

    // 전송 버튼 클릭 시 음성인식 중단
    await stopListening();
    setInputText("");
  };

  const updateGameDataAfterBattle = (battleLog: string) => {
    const remainingHpMatch = battleLog.match(/남은 체력:\s*(\d+)/);
    console.log("remainingHpMatch 확인 : ", remainingHpMatch);

    if (remainingHpMatch) {
      const remainingHp = parseInt(remainingHpMatch[1]);
      // 승리 시 gameData의 hp 갱신
      if (!battleLog.includes("전투 패배!")) {
        setGameData((prevData) => ({
          ...prevData,
          gameState: {
            ...prevData.gameState,
            hp: remainingHp,
          },
        }));
      } else {
        // 패배 시, gameData의 hp를 0로 갱신
        setGameData((prevData) => ({
          ...prevData,
          gameState: {
            ...prevData.gameState,
            hp: 0,
          },
        }));
      }
    }
  };

  const handleVictory = async () => {
    // 모달로 승리 이미지 보여주고, 유저 쿠폰 수 +1 해주고 보여준 뒤, 타이틀로 리다이렉트
    console.log("승리 함수 실행");

    try {
      // 현재 쿠폰 수 가져오기
      const currentCoupon = useUserData.getState().userData.coupon;

      // API 호출을 통해 쿠폰 수를 1 증가시키고 결과를 받음
      const updateCouponResponse = await updateUserCoupon(currentCoupon + 1);
      console.log("쿠폰 업데이트 응답 결과:  ", updateCouponResponse);

      // db에 쿠폰 증가 요청 응답이 정상이라면 store의 전역 상태의 쿠폰 수도 증가 시킴
      if (updateCouponResponse.status === 200) {
        incrementCoupon();
      }

      setIsVictory(true);
      setShowModal(true);
    } catch (error) {
      console.error("쿠폰 업데이트 실패:", error);
    }
  };

  const handleBattleDefeat = () => {
    // 모달로 패배 이미지 보여주고, 타이틀로sssssss 리다이렉트
    setIsVictory(false);
    setShowModal(true);
  };

  const addBattleLogAndAction = (
    battleLog: string,
    action: () => void,
    isSpecial: boolean = false
  ) => {
    setConversationHistory((preHistory: ConversationHistoryType[]) => {
      const newHistory: ConversationHistoryType[] = [
        ...preHistory,
        { role: "assistant", text: battleLog },
      ];

      // isSpecial 일 경우만 특수한 버블 추가
      if (isSpecial) {
        newHistory.push({
          role: "assistant",
          text: "여기를 눌러서 이세계에서 탈출하기! 👈",
          onClick: action,
          isSpecial: true,
        });
      }
      return newHistory;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleVoiceButtonClick = () => {
    console.log(
      "handleVoiceButtonClick called. Current listening state: ",
      listening
    );

    if (!listening) {
      resetScript();
    }
    toggleListening();
    console.log("토글 리스닝 실행");
  };

  return (
    <div
      className={`border bg-gray-500/70 w-full h-full flex flex-col overflow-y-auto ${flexiblePadding} ${flexibleFontSize}`}
    >
      {/* 기존 질문과 답변 데이터 보여주기. 게임 첫 시작 시 고려해서 만들 것 */}

      {/* 여백 혹은 질문 쌓일 공간 */}
      <div className="grow"></div>

      <div className={`w-full flex flex-col p-6 gap-6`}>
        {/* 새로하기를 눌렀을 경우 system 명령어 요청 보내서 답변 받아 랜더링 추가 예정 */}
        {conversationHistory.map((message, index) => (
          <TextBubble
            text={message.text}
            role={message.role}
            isLoading={
              mutation.isLoading && index === conversationHistory.length - 1
            }
            onClick={message.onClick}
            isSpecial={message.isSpecial}
            key={index}
          />
        ))}
      </div>

      <form className="flex mt-8 m-4" onSubmit={handleSubmit}>
        <input
          className="bg-white w-full px-2 border rounded-md outline-gray-600"
          placeholder="다음에 할 행동을 적어주세요(음성은 영어만 가능)"
          type="text"
          value={inputText}
          required
          onChange={handleInputChange}
        />
        <div className="relative">
          <button
            className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-gray-200 border-2 border-gray-300 shadow-sm hover:cursor-pointer hover:bg-gray-300" // 오른쪽과 위에 위치
            type="button"
            onClick={handleVoiceButtonClick}
          >
            {listening ? "🛑" : "🎤"}
          </button>
          <button
            className={`py-1 px-4 bg-gray-200 whitespace-nowrap border-2 rounded-md border-gray-300 shadow-sm ${
              mutation.isLoading && "bg-gray-400"
            }`}
            type="submit"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "전송 중" : "전송"}
          </button>
        </div>
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
