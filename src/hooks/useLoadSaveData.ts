import { SaveData } from "@/model/gameData";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function loadSaveDataByEmail(email: string) {
  // fetch 에서 axios 로 수정
  // return fetch("/api/savedata/load").then((res) => {
  //   if (!res.ok) {
  //     throw new Error(`api 에러, status code: ${res.status}`);
  //   }
  //   return res.json();
  // });
  return axios.get("/api/savedata/load").then((res) => {
    if (res.status < 200 || res.status >= 300) {
      throw new Error(`api 에러! status code: ${res.status}`);
    }
    return res.data;
  });
}

export const useLoadSaveData = (email: string) => {
  return useQuery({
    queryKey: ["saveData", email, "load"],
    queryFn: (): Promise<SaveData> => loadSaveDataByEmail(email),
    staleTime: 0,
  });
};
