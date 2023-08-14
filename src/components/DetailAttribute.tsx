import { useGameDataStore } from "@/stores/useGameDataStore";

export default function DetailAttribute() {
  const { gameData } = useGameDataStore();
  return (
    <div className="text-lg">
      <p className="mb-4">현재 능력치</p>
      <div className="text-base mb-8">
        <p>ATK: {gameData.attribute.ATK}</p>
        <p>DEF: {gameData.attribute.DEF}</p>
        <p>maxHP: {gameData.attribute.maxHP}</p>
      </div>
      <div className="text-xs">
        <p>적에게 주는 피해 = ATK</p>
        <p>적에게 받는 피해 = 적에게 받을 피해 - DEF</p>
      </div>
    </div>
  );
}
