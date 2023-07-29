"use client";

import useWindowWidth from "@/hooks/useWindowWidth";
import useUIStore from "@/stores/useUIStore";
import Image from "next/image";
import { useEffect } from "react";

export default function TopLogo() {
  // 현재 화면 해상도 상태 값 세팅
  const currentWindowWidth = useWindowWidth();
  const { isMobile, setIsMobile } = useUIStore();

  useEffect(() => {
    if (currentWindowWidth) {
      const isMobileSize = currentWindowWidth <= 640;
      setIsMobile(isMobileSize);
    }
  }, [currentWindowWidth, setIsMobile]);

  return (
    <div
      className={
        isMobile ? "hidden" : "" + "max-w-5xl w-full mx-auto px-2 py-1"
      }
    >
      <Image
        src={"/images/logo-title.png"}
        alt="game logo"
        width={120}
        height={100}
      />
    </div>
  );
}
