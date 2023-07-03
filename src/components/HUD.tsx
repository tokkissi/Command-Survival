import useGameDataStore from "@/stores/useGameDataStore";
import Image from "next/image";
import HealthBar from "./HealthBar";
import { useState } from "react";
import ModalPortal from "./ui/ModalPortal";
import InfoModal from "./ui/InfoModal";
import DetailAttribute from "./DetailAttribute";
import DetailItems from "./DetailItems";

export default function HUD() {
  const [openModal, setOpenModal] = useState(false);
  const [select, setSelect] = useState<string>("");
  const { hp, currentFloor, maxFloor, attribute } = useGameDataStore();
  const maxHP = attribute.maxHP;
  return (
    <div className="bg-slate-400/70 rounded p-2 absolute">
      <HealthBar maxHP={maxHP} currentHP={hp} />
      <div className="flex items-center justify-between">
        <div className="font-bold text-2xl my-2 ml-2 text">
          보스까지 {maxFloor - currentFloor + 1}턴 남음!
        </div>

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
              width={50}
              height={50}
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
              width={46}
              height={46}
            />
          </div>
        </div>
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
    </div>
  );
}
