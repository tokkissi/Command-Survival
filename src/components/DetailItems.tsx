import useGameDataStore from "@/stores/useGameDataStore";

export default function DetailItems() {
  const { items } = useGameDataStore();
  return (
    <div className="text-lg">
      <p className="mb-8">보유한 아이템</p>
      <div className="text-base">
        {items.length > 0 ? items.join(", ") : "없음"}
      </div>
    </div>
  );
}
