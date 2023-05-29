"use client";

import { useRef, useState } from "react";

export default function Console() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [ask, setAsk] = useState("");
  const [answer, setAnswer] = useState("");
  const handleClick = async () => {
    if (inputRef.current === null) return;
    if (inputRef.current.value === "") return;

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
      });
  };

  return (
    <div className="p-4 m-4 border">
      <p className="bg-slate-200 border-2 py-2 px-4 m-4">질문: {ask}</p>
      <p className="bg-slate-200 border-2 py-2 px-4 m-4">ai답변: {answer}</p>
      <div className="flex rounded-md mt-8 m-4 overflow-hidden">
        <input
          className="bg-slate-200 w-full p-2 border outline-gray-600"
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
