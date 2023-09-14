import { SaveData } from "@/model/gameData";
import { UserData } from "@/model/userData";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function loadUserDataByEmail() {
  return axios.get("/api/userdata/load").then((res) => {
    if (res.status < 200 || res.status >= 300) {
      throw new Error(`api 에러! status code: ${res.status}`);
    }
    return res.data;
  });
}

export const useLoadUserData = (email: string) => {
  return useQuery({
    queryKey: ["userData", email, "load"],
    queryFn: () => loadUserDataByEmail(),
    staleTime: 0,
  });
};
