import { UserData } from "@/model/userData";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type UserDataStore = {
  userData: UserData;
  setUserData: (data: UserData) => void;
  incrementCoupon: () => void;
  decrementCoupon: () => void;
};

export const useUserData = create<UserDataStore>()(
  devtools(
    (set) => ({
      userData: {
        email: "",
        coupon: 0,
      },
      setUserData: (data: UserData) => {
        set({ userData: data });
      },
      incrementCoupon: () => {
        set((state) => ({
          userData: {
            ...state.userData,
            coupon: state.userData.coupon + 1,
          },
        }));
      },
      decrementCoupon: () => {
        set((state) => ({
          userData: {
            ...state.userData,
            coupon: state.userData.coupon - 1,
          },
        }));
      },
    }),
    { store: "UserDataStore" }
  )
);
