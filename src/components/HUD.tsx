import Image from "next/image";
import HealthBar from "./HealthBar";
import { useState } from "react";
import ModalPortal from "./ui/ModalPortal";
import InfoModal from "./ui/InfoModal";
import DetailAttribute from "./DetailAttribute";
import DetailItems from "./DetailItems";
import useUIStore from "@/stores/useUIStore";
import { useGameDataStore } from "@/stores/useGameDataStore";

export default function HUD() {
  const [openModal, setOpenModal] = useState(false);
  const [select, setSelect] = useState<string>("");
  const { gameData } = useGameDataStore();
  const { isMobile, menuToggled, setMenuToggled } = useUIStore();

  const toggleBtnSize = 16;
  const mobileIconSize = 30;

  const handleToggle = () => {
    setMenuToggled(!menuToggled);
  };

  return (
    <section className="w-full text-base sm:w-48 " onClick={handleToggle}>
      <HealthBar
        maxHP={gameData.gameState ? gameData.gameState.attribute.maxHP : 10}
        currentHP={gameData.gameState ? gameData.gameState.hp : 10}
      />
      <div className="flex flex-col items-center">
        <div
          className="flex items-center justify-center font-bold my-1"
          onClick={handleToggle}
        >
          <p className="text-xs sm:text-xl">
            보스까지{" "}
            {gameData.gameState
              ? gameData.gameState.maxFloor - gameData.gameState.currentFloor
              : process.env.NEXT_PUBLIC_DEFAULT_MAX_FLOOR}
            턴 남음!
          </p>
          {menuToggled && (
            <Image
              className="ml-2 sm:hidden"
              src="/images/toggle-up.png"
              alt="toggle up option icon"
              width={toggleBtnSize}
              height={toggleBtnSize}
            />
          )}
          {!menuToggled && (
            <Image
              className="ml-2 sm:hidden"
              src="/images/toggle-down.png"
              alt="toggle down option icon"
              width={toggleBtnSize}
              height={toggleBtnSize}
            />
          )}
        </div>

        {((isMobile && menuToggled) || !isMobile) && (
          <div className="flex items-center">
            <div
              className="hover:cursor-pointer hover:opacity-60"
              onClick={() => {
                setOpenModal(true);
                setSelect("attribute");
              }}
            >
              <Image
                src="/images/attribute-fist.png"
                alt="attributes icon"
                width={mobileIconSize}
                height={mobileIconSize}
              />
            </div>

            <div
              className="hover:cursor-pointer hover:opacity-60"
              onClick={() => {
                setOpenModal(true);
                setSelect("items");
              }}
            >
              <Image
                className="border-2 bg-white border-white rounded-full"
                src="/images/bag.png"
                alt="items icon"
                width={mobileIconSize - 2}
                height={mobileIconSize - 2}
              />
            </div>
          </div>
        )}
      </div>

      {openModal && select === "attribute" && (
        <ModalPortal>
          <InfoModal onClose={() => setOpenModal(false)}>
            <DetailAttribute />
          </InfoModal>
        </ModalPortal>
      )}
      {openModal && select === "items" && (
        <ModalPortal>
          <InfoModal onClose={() => setOpenModal(false)}>
            <DetailItems />
          </InfoModal>
        </ModalPortal>
      )}
    </section>
  );
}
