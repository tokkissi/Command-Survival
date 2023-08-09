import useUIStore from "@/stores/useUIStore";
import HUD from "./HUD";
import MenuList from "./MenuList";

export default function GameSideBar() {
  return (
    <section className="flex flex-col p-2 items-center bg-white/80">
      <HUD />
      <MenuList />
    </section>
  );
}
