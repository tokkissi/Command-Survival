import { useGameDataStore } from "@/stores/useGameDataStore";

export default function DetailItems() {
  const { gameData } = useGameDataStore();
  return (
    <div className="text-lg">
      <p className="mb-8">보유한 아이템</p>
      <div className="text-base">
        {gameData.items.length > 0 ? gameData.items.join(", ") : "없음"}
      </div>
    </div>
  );
}
