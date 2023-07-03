export type SaveData = {
  email: string;
  createdAt: Date;
  attribute: {
    ATK: number;
    DEF: number;
    maxHP: number;
  };
  items: string[];
  currentFloor: number;
  hp: number;
  maxFloor: number;
};

export type Attribute = {
  ATK: number;
  DEF: number;
  maxHP: number;
};
