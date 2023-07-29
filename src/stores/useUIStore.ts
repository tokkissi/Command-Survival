import { devtools } from "zustand/middleware";
import { create } from "zustand";

type UIStore = {
  menuToggled: boolean;
  setMenuToggled: (newToggleState: boolean) => void;
  isMobile: boolean;
  setIsMobile: (newDeviceState: boolean) => void;
};

const useUIStore = create<UIStore>()(
  devtools((set) => ({
    menuToggled: false,
    setMenuToggled(newToggleState: boolean) {
      set((state) => ({
        ...state,
        menuToggled: newToggleState,
      }));
    },
    isMobile: false,
    setIsMobile(newDeviceState: boolean) {
      set((state) => ({
        ...state,
        isMobile: newDeviceState,
      }));
    },
  }))
);

export default useUIStore;
