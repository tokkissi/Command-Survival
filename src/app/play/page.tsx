import GameInterface from "@/components/GameInterface";

export default async function PlayPage() {
  return (
    <section className="flex flex-col items-center justify-center h-full p-2">
      <GameInterface />
    </section>
  );
}
