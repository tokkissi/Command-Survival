import useGameDataStore from "@/stores/useGameDataStore";

export default function DetailAttribute() {
  const { attribute } = useGameDataStore();
  return (
    <div className="text-lg">
      <p className="mb-4">현재 능력치</p>
      <div className="text-base mb-8">
        <p>ATK: {attribute.ATK}</p>
        <p>DEF: {attribute.DEF}</p>
        <p>maxHP: {attribute.maxHP}</p>
      </div>
      <div className="text-xs">
        <p>적에게 주는 피해 = ATK</p>
        <p>적에게 받는 피해 = 적에게 받을 피해 - DEF</p>
      </div>
    </div>
  );
}
