import { SaveData } from "@/model/gameData";
import { useQuery } from "@tanstack/react-query";

function loadSaveDataByEmail(email: string) {
  return fetch("/api/savedata/load").then((res) => {
    if (!res.ok) {
      throw new Error(`api 에러, status code: ${res.status}`);
    }
    return res.json();
  });
}

export const useLoadSaveData = (email: string) => {
  return useQuery({
    queryKey: ["saveData", email, "load"],
    queryFn: (): Promise<SaveData> => loadSaveDataByEmail(email),
    staleTime: 0,
  });
};
