import axios from "axios";

export const updateUserCoupon = async (couponCount: number) => {
  try {
    const res = await axios.put("/api/userdata/update-coupon", {
      coupon: couponCount,
    });
    if (res.status < 200 || res.status >= 300) {
      throw new Error(`API 에러! status code: ${res.status}`);
    }
    return res;
  } catch (error) {
    throw error;
  }
};
