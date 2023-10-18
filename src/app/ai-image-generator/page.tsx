"use client";

import MenuList from "@/components/MenuList";
import { generateImageWithUserInput } from "@/service/imageService";
import useUIStore from "@/stores/useUIStore";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRef, useState } from "react";
import { PulseLoader } from "react-spinners";

export default function AiGeneratorPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [prevPrompt, setPrevPrompt] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { isMobile } = useUIStore();

  const flexiblePadding = isMobile ? "" : "p-4";
  const flexibleFontSize = isMobile ? "text-[8px]" : "text-sm";
  const flexibleImageSize = isMobile ? 128 : 256; // 일단 모바일과 pc 화면 크기는 같게함

  const mutation = useMutation(generateImageWithUserInput, {
    onSuccess: (data: string) => {
      setImageUrl(data);
    },
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isInputEmptyOrWhitespace = inputRef.current
      ? inputRef.current?.value.trim() === ""
      : true;

    // 공백 문자만 입력되었거나 입력된 것이 없을 시, 이미지 생성 요청 안함
    if (inputRef.current && !isInputEmptyOrWhitespace) {
      mutation.mutate(inputRef.current.value);
      if (inputRef.current) {
        setPrevPrompt(inputRef.current.value);
      }
      inputRef.current.value = "";
    }
  };

  return (
    <div className="p-2 h-full">
      <div className="relative rounded overflow-hidden max-w-5xl w-full h-full flex flex-col mx-auto sm:flex-row ">
        <section className="flex flex-col p-2 items-center bg-white/80">
          <MenuList isAiPage />
        </section>
        <div
          className={`border bg-gray-500/70 w-full h-full flex flex-col overflow-auto ${flexiblePadding} ${flexibleFontSize} font-bold bg-white/90`}
        >
          {/* 빈 공간 상하좌우 가운데에 이미지 삽입 */}
          <div className="flex-grow flex flex-col items-center justify-center">
            {!imageUrl && (
              <Image
                src="/images/default-image.png"
                alt="Default Image"
                width={flexibleImageSize}
                height={flexibleImageSize}
              />
            )}
            {imageUrl && (
              <Image
                src={imageUrl}
                alt="Generated Image"
                width={flexibleImageSize}
                height={flexibleImageSize}
              />
            )}
            {prevPrompt && !mutation.isLoading && (
              <p className="mt-2 mb-2">
                사용한 프롬프트: &quot;{prevPrompt}&quot;
              </p>
            )}
            <p className={`text-gray-600/80`}>
              생성할 이미지를 영단어 키워드로 입력해주세요
            </p>
            {mutation.isLoading && (
              <div className="flex flex-col justify-center items-center">
                <PulseLoader
                  color="#785466"
                  size={6}
                  cssOverride={{ margin: "0.5rem 0 0.5rem 0" }}
                />

                <p>이미지 생성 중...</p>
              </div>
            )}
          </div>

          <div></div>

          {/* 여백 혹은 질문 쌓일 공간 */}
          <div className="grow"></div>

          <form
            className="flex rounded-md mt-8 m-4 overflow-hidden border-2 border-gray-800"
            onSubmit={handleFormSubmit}
          >
            <input
              className="bg-white w-full px-2"
              placeholder="생성할 이미지의 키워드를 적어주세요"
              type="text"
              ref={inputRef}
              required
            />
            <button
              className="py-1 px-4 bg-gray-200 whitespace-nowrap border-2 border-gray-300 shadow-sm hover:cursor-pointer hover:bg-gray-300"
              type="submit"
              disabled={mutation.isLoading}
            >
              전송
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
