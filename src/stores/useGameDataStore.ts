import { Attribute } from "@/model/gameData";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type GameDataStore = {
  attribute: Attribute;
  setAttribute: (newAttribute: Attribute) => void;
  items: string[];
  setItems: (newItems: string[]) => void;
  hp: number;
  setHp: (newHp: number) => void;
  maxFloor: number;
  setMaxFloor: (newMaxFloor: number) => void;
  currentFloor: number;
  setCurrentFloor: (newCurrentFloor: number) => void;
};

const useGameDataStore = create<GameDataStore>()(
  devtools((set) => ({
    attribute: {
      ATK: 1,
      DEF: 1,
      maxHP: 10,
    },
    setAttribute(newAttribute: Attribute) {
      set((state: GameDataStore) => ({
        ...state,
        attribute: newAttribute,
      }));
    },
    items: [],
    setItems(newItems: string[]) {
      set((state: GameDataStore) => ({
        ...state,
        items: newItems,
      }));
    },
    hp: 10,
    setHp(newHp: number) {
      set((state: GameDataStore) => ({
        ...state,
        hp: newHp,
      }));
    },
    maxFloor: 50,
    setMaxFloor(newMaxFloor: number) {
      set((state: GameDataStore) => ({
        ...state,
        maxFloor: newMaxFloor,
      }));
    },
    currentFloor: 1,
    setCurrentFloor(newCurrentFloor: number) {
      set((state: GameDataStore) => ({
        ...state,
        currentFloor: newCurrentFloor,
      }));
    },
  }))
);

export default useGameDataStore;
