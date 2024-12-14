/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import axiosJWT from "@/lib/authJWT";
import { signOut } from "next-auth/react";

interface AuthState {
  accessToken: string | null;
  fetchAccessToken: () => Promise<void>;
  setAccessToken: (accessToken: string | null) => void;
  isTokenExpired: () => boolean;
}

interface MyToken {
  exp: number;
  // whatever else is in the JWT.
}

const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  setAccessToken: (accessToken) => {
    set({ accessToken });
    if (accessToken) {
      axiosJWT.defaults.headers.common["Authorization"] =
        `Bearer ${accessToken}`;
    }
  },
  fetchAccessToken: async () => {
    const { isTokenExpired, setAccessToken } = get();

    if (!isTokenExpired()) {
      return;
    }
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/token`,
        {
          withCredentials: true,
        },
      );
      const { accessToken } = res.data.data;
      setAccessToken(accessToken);
    } catch (error: Error | any) {
      const statusCode = error.response?.data?.statusCode;
      if (statusCode === 401) {
        await signOut({ redirect: true });
      }
      console.log("Error fetching access token:", error);
    }
  },
  isTokenExpired: () => {
    const { accessToken } = get();

    if (!accessToken) return true;

    try {
      const decodedToken = jwtDecode<MyToken>(accessToken);
      if (!decodedToken.exp) return true;

      // Check if the token is expired
      const isExpired = decodedToken.exp < Date.now();
      return isExpired;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  },
}));

export default useAuthStore;
