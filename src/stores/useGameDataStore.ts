import { Attribute } from "@/model/gameData";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type GameData = {
  attribute: Attribute;
  items: string[];
  hp: number;
  maxFloor: number;
  currentFloor: number;
};

type SetGameData = (
  data: GameData | ((prevData: GameData) => GameData)
) => void;

type GameStore = {
  gameData: GameData;
  setGameData: SetGameData;
  incrementFloor: () => void;
};

export const useGameDataStore = create<GameStore>()(
  devtools(
    (set) => ({
      gameData: {
        attribute: { ATK: 0, DEF: 0, maxHP: 10 },
        items: [],
        hp: 0,
        maxFloor: 0,
        currentFloor: 0,
      },
      setGameData: (data: GameData | ((prevData: GameData) => GameData)) => {
        if (typeof data === "function") {
          set((prevState) => ({ gameData: data(prevState.gameData) }));
        } else {
          set({ gameData: data });
        }
      },
      incrementFloor: () => {
        console.log("incrementFloor is called");
        set((prevState) => {
          const newFloor = prevState.gameData.currentFloor + 1;
          return {
            gameData: {
              ...prevState.gameData,
              currentFloor: newFloor,
            },
          };
        });
      },
    }),
    { store: "GameDataStore" }
  )
);
