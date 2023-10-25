import { ConversationHistoryType, GameData } from "@/model/gameData";
import axios from "axios";

// 게임 데이터와 대화 이력을 저장하는 함수
export const saveGameDataAndHistory = async (data: {
  gameData: GameData;
  conversationHistory: ConversationHistoryType[];
}) => {
  try {
    const response = await axios.put("/api/savedata/save", data);

    return response.data;
  } catch (error) {
    throw new Error(`게임 데이터 및 이력 저장에 실패했습니다: ${error}`);
  }
};

export const deleteGameData = async () => {
  try {
    const response = await axios.delete(`/api/savedata/delete`);

    return response;
  } catch (error) {
    console.error(error);
  }
};
