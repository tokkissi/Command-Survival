type Props = {
  currentHP: number;
  maxHP: number;
};

export default function HealthBar({ currentHP, maxHP }: Props) {
  const hpPercentage = (currentHP / maxHP) * 100;
  return (
    <div className="relative flex-col">
      <div className="w-full h-8 rounded bg-gray-400 border-4 border-yellow-200">
        <div
          className="h-full bg-green-600 rounded"
          style={{ width: `${hpPercentage}%` }}
        ></div>
      </div>
      <div className="absolute w-full h-full flex flex-col justify-center items-center gap-4 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] whitespace-nowrap font-bold text-base text-center">
        {currentHP} / {maxHP}
      </div>
    </div>
  );
}
