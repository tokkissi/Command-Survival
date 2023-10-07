import { ConversationHistoryType, GameData } from "@/model/gameData";
import axios from "axios";

// 게임 데이터와 대화 이력을 저장하는 함수
export const saveGameDataAndHistory = async (data: {
  gameData: GameData;
  conversationHistory: ConversationHistoryType[];
}) => {
  try {
    const response = await axios.put("/api/savedata/save", data);
    console.log("게임 데이터 저장 api 요청함");
    return response.data;
  } catch (error) {
    throw new Error(`게임 데이터 및 이력 저장에 실패했습니다: ${error}`);
  }
};

export const deleteGameData = async () => {
  try {
    const response = await axios.delete(`/api/savedata/delete`);
    console.log("삭제 응답: ", response);
    return response;
  } catch (error) {
    console.log("게임 데이터 삭제 서비스 시 에러");
  }
};
