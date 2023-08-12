"use client";

import { useEffect, useRef, useState } from "react";
import useUIStore from "@/stores/useUIStore";
import { formatGptResponse } from "@/util/gptResponseFommatter";
import TextBubble from "./ui/conversation/TextBubble";

export default function Console() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [conversationHistory, setConversationHistory] = useState<
    {
      text: string;
      role: "user" | "assistant";
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isMobile } = useUIStore();
  const flexiblePadding = isMobile ? "" : "p-4";
  const flexibleFontSize = isMobile ? "text-sm" : "text-base";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputRef.current === null) return;
    if (inputRef.current.value === "") return;

    const userInputAsk = inputRef.current.value;

    setIsLoading(true);
    setConversationHistory((preHistory) => [
      ...preHistory,
      { role: "user", text: userInputAsk },
      { role: "assistant", text: "로딩 중..." },
    ]);
    inputRef.current!.value = "";

    // 유저 입력을 전송하여 답함
    // 최신 대화 4개만 새 대화에 반영하도록 함
    fetch("/api/play", {
      method: "POST",
      body: JSON.stringify({
        prompt: userInputAsk,
        conversation: conversationHistory.slice(-4),
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`에러 코드 :${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        setConversationHistory((preHistory) => [
          ...preHistory.slice(0, preHistory.length - 1), // 마지막 로딩 중인 메시지를 제외한 이력
          { role: "assistant", text: formatGptResponse(res) },
        ]);
      })
      .catch((error) => {
        console.error("api call error: ", error);
        setConversationHistory((preHistory) => [
          ...preHistory.slice(0, preHistory.length - 1), // 마지막 로딩 중인 메시지를 제외한 이력
          {
            role: "assistant",
            text: "서버 요청에 실패했습니다. 다시 질문해주세요",
          },
        ]);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
            isLoading={isLoading && index === conversationHistory.length - 1}
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

      {/* <div className="flex rounded-md mt-8 m-4 overflow-hidden">
        <input
          className="bg-white w-full px-2 border outline-gray-600"
          placeholder="다음에 할 행동을 30자 이내로 적어주세요"
          type="text"
          required
          ref={inputRef}
        />
        <button
          className="py-1 px-4 bg-gray-200 whitespace-nowrap border-2 border-gray-300 shadow-sm"
          onClick={handleClick}
        >
          전송
        </button>
      </div> */}
    </div>
  );
}
