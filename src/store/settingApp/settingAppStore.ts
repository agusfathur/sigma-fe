/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axiosJWT from "@/lib/authJWT";
import { SettingApp, SettingAppUpdate } from "./settingApp.types";

interface SettingAppState {
  settingApp: SettingApp;
  fetchSettingApp: () => Promise<void>;
  updateSettingApp: (user: SettingAppUpdate) => Promise<any>;
}

export const useSettingAppStore = create<SettingAppState>((set, get) => ({
  settingApp: {} as SettingApp,
  fetchSettingApp: async () => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/app-setting`,
      );

      set({ settingApp: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  updateSettingApp: async (appSetting: SettingAppUpdate) => {
    const formData = new FormData();
    console.log(appSetting);
    formData.append("nama_sistem", appSetting.nama_sistem);
    formData.append("singkatan_sistem", appSetting.singkatan_sistem);
    if (appSetting.logo_sistem)
      formData.append("logo_sistem", appSetting.logo_sistem);
    formData.append("deskripsi_sistem", appSetting.deskripsi_sistem);
    formData.append("developer", appSetting.developer);
    formData.append("author", appSetting.author);

    const create = await axiosJWT.put(
      `${process.env.NEXT_PUBLIC_API_URL}/api/app-setting/${appSetting.id_app_setting}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return create.data;
  },
}));
