"use client";

import { useRef, useState } from "react";
import AITextBubble from "./AITextBubble";
import UserTextBubble from "./UserTextBubble";

export default function Console() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [ask, setAsk] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = () => {
    if (inputRef.current === null) return;
    if (inputRef.current.value === "") return;

    setIsLoading(true);
    fetch("/api/play", {
      method: "POST",
      body: JSON.stringify({ prompt: inputRef.current.value }),
    })
      .then((res) => res.json())
      .then((res) => {
        setAsk(inputRef.current!.value);
        setAnswer(res);
      })
      .catch((error) => console.error("api call error: ", error))
      .finally(() => {
        inputRef.current!.value = "";
        setIsLoading(false);
      });
  };

  return (
    <div className="p-4 m-4 border bg-gray-300">
      {/* 기존 질문과 답변 데이터 보여주기. 게임 첫 시작 시 고려해서 만들 것 */}
      {/* 기존 데이터를 상태로 가지고, map으로 랜더링. key를 가지면 추가 데이터만 랜더링 됨 */}

      {/* 현재 입력한 질문과 그 답변 랜더링 */}
      <div className="w-full flex flex-col p-6 gap-6">
        {ask && <UserTextBubble text={ask} />}

        {answer && <AITextBubble text={answer} isLoding={isLoading} />}
      </div>

      <div className="flex rounded-md mt-8 m-4 overflow-hidden">
        <input
          className="bg-white w-full p-2 border outline-gray-600"
          placeholder="여기에 입력해주세요"
          type="text"
          required
          ref={inputRef}
        />
        <button
          className="py-2 px-4 bg-gray-200 whitespace-nowrap border-2 border-gray-300 shadow-sm"
          onClick={handleClick}
        >
          전송
        </button>
      </div>
    </div>
  );
}
