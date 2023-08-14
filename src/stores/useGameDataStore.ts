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

type GameStore = {
  gameData: GameData;
  setGameData: (data: GameData) => void;
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
      setGameData: (data: GameData) => {
        set({ gameData: data });
      },
    }),
    { store: "GameDataStore" }
  )
);
