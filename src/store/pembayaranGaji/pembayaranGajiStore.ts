/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axiosJWT from "@/lib/authJWT";
import {
  PembayaranGaji,
  PembayaranGajiCreate,
  PembayaranGajiUpdate,
} from "./pembayaranGajitypes";

interface SettingGajiState {
  pembayaranGaji: PembayaranGaji;
  fetchPembayaranGajiBySlipGaji: (id: string) => Promise<void>;
  createPembayaranGaji: (pembayaranGaji: PembayaranGajiCreate) => Promise<any>;
  updatePembayaranGaji: (pembayaranGaji: PembayaranGajiUpdate) => Promise<any>;
}

export const usePembayaranGajiStore = create<SettingGajiState>((set, get) => ({
  pembayaranGaji: {} as PembayaranGaji,
  fetchPembayaranGajiBySlipGaji: async (id: string) => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pembayaran-gaji/slip-gaji/${id}`,
      );

      set({ pembayaranGaji: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  createPembayaranGaji: async (pembayaranGaji: PembayaranGajiCreate) => {
    const res = await axiosJWT.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/pembayaran-gaji`,
      pembayaranGaji,
    );
    set({ pembayaranGaji: res.data.data });
  },
  updatePembayaranGaji: async (pembayaranGaji: PembayaranGajiUpdate) => {
    try {
      const res = await axiosJWT.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pembayaran-gaji/${pembayaranGaji.id_pembayaran_gaji}`,
        pembayaranGaji,
      );
      set({ pembayaranGaji: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
}));
