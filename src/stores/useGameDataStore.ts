import { Attribute, GameData } from "@/model/gameData";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type SetGameData = (
  data: GameData | ((prevData: GameData) => GameData)
) => void;

type GameStore = {
  gameData: GameData;
  setGameData: SetGameData;
  incrementFloor: () => number;
  resetGameData: () => void;
};

const defaultGameData = {
  conversationHistory: [],
  email: "",
  gameState: {
    attribute: { ATK: 0, DEF: 0, maxHP: 10 },
    items: "",
    hp: 0,
    maxFloor: parseInt(process.env.NEXT_PUBLIC_DEFAULT_MAX_FLOOR!),
    currentFloor: parseInt(process.env.NEXT_PUBLIC_DEFAULT_START_FLOOR!),
  },
  createdAt: new Date(),
  _id: "",
};

export const useGameDataStore = create<GameStore>()(
  devtools(
    (set) => ({
      gameData: defaultGameData,
      setGameData: (data: GameData | ((prevData: GameData) => GameData)) => {
        if (typeof data === "function") {
          set((prevState) => ({ gameData: data(prevState.gameData) }));
        } else {
          set({ gameData: data });
        }
      },
      incrementFloor: () => {
        console.log("incrementFloor is called");
        let newFloor = 0;
        set((prevState) => {
          newFloor = prevState.gameData.gameState.currentFloor + 1;
          return {
            gameData: {
              ...prevState.gameData,
              gameState: {
                ...prevState.gameData.gameState,
                currentFloor: newFloor,
              },
            },
          };
        });
        return newFloor;
      },
      resetGameData: () => {
        set({
          gameData: defaultGameData,
        });
      },
    }),
    { store: "GameDataStore" }
  )
);
