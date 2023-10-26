import AIGeneratorContent from "@/components/AIGeneratorContent";

export const metadata = {
  title: "AI Image Generator",
  description: "AI 이미지 생성하기",
};

export default function AiGeneratorPage() {
  return (
    <div className="p-2 h-full">
      <AIGeneratorContent />
    </div>
  );
}
