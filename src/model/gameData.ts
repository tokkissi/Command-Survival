export type gameState = {
  attribute: Attribute;
  items: string;
  hp: number;
  maxFloor: number;
  currentFloor: number;
};

export type GameData = {
  conversationHistory: ConversationHistoryType[];
  email: string;
  gameState: gameState;
  createdAt: Date;
  _id: string;
};

export type Attribute = {
  ATK: number;
  DEF: number;
  maxHP: number;
};

export type TextBubbleProps = {
  text: string;
  role: "user" | "assistant";
  isLoading?: boolean;
  onClick?: () => void;
  isSpecial?: boolean;
};

export type ConversationHistoryType = {
  text: string;
  role: "user" | "assistant";
  onClick?: () => void;
  isSpecial?: boolean;
};
