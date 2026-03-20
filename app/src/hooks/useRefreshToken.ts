import axios from "axios";
import { useAuthStore } from "../store";

export const useRefreshToken = () => {
  const setData = useAuthStore((s) => s.setData);

  const refresh = async () => {
    const response = await axios.get("/api/auth/refresh", {
      withCredentials: true,
    });

    setData({ accessToken: response.data.accessToken });

    return response.data.accessToken;
  };

  return refresh;
};
