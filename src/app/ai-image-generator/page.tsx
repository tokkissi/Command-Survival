"use client";

import MenuList from "@/components/MenuList";
import useUIStore from "@/stores/useUIStore";

export default function AiGeneratorPage() {
  const { isMobile } = useUIStore();

  const flexiblePadding = isMobile ? "" : "p-4";
  const flexibleFontSize = isMobile ? "text-sm" : "text-base";

  return (
    <div className="p-2 h-full">
      <div className="relative rounded overflow-hidden max-w-5xl w-full h-full flex flex-col mx-auto sm:flex-row ">
        <section className="flex flex-col p-2 items-center bg-white/80">
          <MenuList isAiPage />
        </section>
        <div
          className={`border bg-gray-500/70 w-full h-full flex flex-col overflow-auto ${flexiblePadding}`}
        >
          {/* 기존 질문과 답변 데이터 보여주기. 게임 첫 시작 시 고려해서 만들 것 */}

          {/* 여백 혹은 질문 쌓일 공간 */}
          <div className="grow"></div>

          <div
            className={`w-full flex flex-col p-6 gap-6 ${flexibleFontSize}`}
          ></div>

          <form className="flex rounded-md mt-8 m-4 overflow-hidden">
            <input
              className="bg-white w-full px-2 border outline-gray-600"
              placeholder="다음에 할 행동을 30자 이내로 적어주세요"
              type="text"
              required
            />
            <button
              className="py-1 px-4 bg-gray-200 whitespace-nowrap border-2 border-gray-300 shadow-sm"
              type="submit"
            >
              전송
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
