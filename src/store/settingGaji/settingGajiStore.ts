/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axiosJWT from "@/lib/authJWT";
import { SettingGaji, SettingGajiUpdate } from "./settingGaji.types";

interface SettingGajiState {
  settingGaji: SettingGaji;
  fetchSettingGaji: () => Promise<void>;
  updateSettingGaji: (SettingGaji: SettingGajiUpdate) => Promise<any>;
}

export const useSettingGajiStore = create<SettingGajiState>((set, get) => ({
  settingGaji: {} as SettingGaji,
  fetchSettingGaji: async () => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/setting-gaji`,
      );

      set({ settingGaji: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  updateSettingGaji: async (settingGaji: SettingGajiUpdate) => {
    try {
      const res = await axiosJWT.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/setting-gaji`,
        settingGaji,
      );
      set({ settingGaji: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
}));
