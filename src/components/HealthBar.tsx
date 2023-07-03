type Props = {
  currentHP: number;
  maxHP: number;
};

export default function HealthBar({ currentHP, maxHP }: Props) {
  const hpPercentage = (currentHP / maxHP) * 100;
  return (
    <div className="flex-col">
      <div className="w-full h-10 rounded bg-gray-300 border-4 border-yellow-300">
        <div
          className="h-full bg-green-500 rounded"
          style={{ width: `${hpPercentage}%` }}
        ></div>
      </div>
      <div className="whitespace-nowrap font-bold text-xl text-center">
        {currentHP} / {maxHP}
      </div>
    </div>
  );
}
