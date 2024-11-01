/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import useAuthStore from "@/store/auth.store";

const axiosJWT = axios.create();

axiosJWT.interceptors.request.use(
  async (config) => {
    const { fetchAccessToken, accessToken } = useAuthStore.getState();

    // Panggil fetchAccessToken untuk memperbarui token jika perlu
    await fetchAccessToken();

    // Ambil ulang accessToken setelah pemanggilan fetchAccessToken
    const updatedAccessToken = useAuthStore.getState().accessToken;

    // Set Authorization header jika accessToken ada
    if (updatedAccessToken) {
      config.headers.Authorization = `Bearer ${updatedAccessToken}`;
    }

    config.withCredentials = true;
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosJWT;
