"use client";

import MenuList from "@/components/MenuList";
import useSpeechToText from "@/hooks/useSpeechToText";
import { generateImageWithUserInput } from "@/service/imageService";
import { updateUserCoupon } from "@/service/userService";
import useUIStore from "@/stores/useUIStore";
import { useUserData } from "@/stores/useUserData";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PulseLoader } from "react-spinners";

export const metadata = {
  title: "AI Image Generator",
  description: "AI 이미지 생성하기",
};

export default function AiGeneratorPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [prevPrompt, setPrevPrompt] = useState<string>("");
  const [inputText, setInputText] = useState<string>(""); // useState로 상태 관리
  const [couponTextColor, setCouponTextColor] = useState("text-red-600");
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null); // settimeout 초기화를 위한 타임아웃 id 저장
  const router = useRouter();

  const { isMobile } = useUIStore();
  const { userData, decrementCoupon } = useUserData();
  const { transcript, listening, toggleListening, resetScript, stopListening } =
    useSpeechToText();

  const flexiblePadding = isMobile ? "" : "p-4";
  const flexibleFontSize = isMobile ? "text-[8px]" : "text-sm";
  const flexibleImageSize = isMobile ? 128 : 256; // 일단 모바일과 pc 화면 크기는 같게함

  const mutation = useMutation(generateImageWithUserInput, {
    onSuccess: (data: string) => {
      setImageUrl(data);
      resetScript();
    },
  });

  // 언 마운트 시, 음성인식 값을 초기화하고 음성인식 함수를 클린업 함수로 실행
  useEffect(() => {
    const cleanup = async () => {
      await stopListening();
      resetScript();
    };

    // stopListening 이 비동기 함수이므로 return 뒤가 아니라 선언 후 호출
    cleanup().catch((err) => console.error("Cleanup failed", err));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 음성인식으로 받은 값을 상태로 설정
  useEffect(() => {
    setInputText(transcript);
  }, [transcript]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isInputEmptyOrWhitespace = inputText.trim() === "";

    // 공백 문자만 입력되었거나 입력된 것이 없을 시, 이미지 생성 요청 안함
    if (userData.coupon > 0 && !isInputEmptyOrWhitespace) {
      mutation.mutate(inputText);
      setPrevPrompt(inputText);
      setInputText("");

      try {
        const decrementCouponResponse = await updateUserCoupon(
          userData.coupon - 1
        );

        if (decrementCouponResponse.status === 200) {
          decrementCoupon();
        }
      } catch (error) {
        console.error("쿠폰 업데이트 실패", error);
      }
    }

    await stopListening();
  };

  const handleSubmitButtonClick = () => {
    if (userData.coupon < 1) {
      setCouponTextColor("text-blue-400");

      // 이전 설정한 타임아웃이 있으면 취소
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }

      // 새 타임아웃 설정
      timeoutIdRef.current = setTimeout(
        () => setCouponTextColor("text-red-400"),
        300
      );
    }
  };

  const handleVoiceButtonClick = () => {
    if (!listening) {
      resetScript();
    }
    toggleListening();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  return (
    <div className="p-2 h-full">
      <div className="rounded overflow-hidden max-w-5xl w-full h-full flex flex-col mx-auto sm:flex-row ">
        <section className="flex flex-col p-2 items-center bg-white/80">
          <MenuList isAiPage />
        </section>
        <div
          className={`relative border bg-gray-500/70 w-full h-full flex flex-col overflow-auto ${flexiblePadding} ${flexibleFontSize} font-bold bg-white/90`}
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
              생성할 이미지를 영단어 키워드로 입력해주세요. 예) rainbow cat
            </p>
            {!mutation.isLoading && userData.coupon < 1 && (
              <p
                className={`${couponTextColor} mt-2 transition-colors duration-500 ease-in-out`}
              >
                이미지 생성에 사용할 쿠폰이 없습니다
                <br />
                <span
                  className="text-blue-500 hover:text-blue-400 hover:cursor-pointer"
                  onClick={() => {
                    router.push("/play");
                  }}
                >
                  👉게임을 플레이
                </span>
                해서 쿠폰을 얻어보세요!
              </p>
            )}
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
            className="sticky bottom-0 min-h-[30px] flex rounded-md mt-8 m-4 overflow-hidden border-2 border-gray-800"
            onSubmit={handleFormSubmit}
          >
            <input
              className="bg-white w-full px-2"
              placeholder="생성할 이미지의 키워드를 적어주세요"
              type="text"
              value={inputText}
              onChange={handleInputChange}
              required
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
                className="py-1 px-4 bg-gray-200 whitespace-nowrap border-2 border-gray-300 shadow-sm hover:cursor-pointer hover:bg-gray-300"
                type="submit"
                disabled={mutation.isLoading}
                onClick={handleSubmitButtonClick}
              >
                전송
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
