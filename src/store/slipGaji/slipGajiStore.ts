/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axiosJWT from "@/lib/authJWT";
import { SlipGaji, SlipGajiCreate, SlipGajiUpdate } from "./slipGaji.types";

interface SlipGajiState {
  slipGaji: SlipGaji[];
  fetchSlipGaji: () => Promise<void>;
  fetchSlipGajiByFilter: (filter: string) => Promise<void>;
  fetchSlipGajiByPegawai: (pegawaiId: string) => Promise<void>;
  insertSlipGaji: (slipGaji: SlipGajiCreate) => Promise<any>;
  updateSlipGaji: (slipGaji: SlipGajiUpdate) => Promise<any>;
  updateStatusSlipGaji: (id: string, status: string) => Promise<any>;
  //   deleteSlipGaji: (id: string) => Promise<any>;
  SlipGajiPegawaiById: (id: string) => SlipGaji | undefined;
  isModalEditOpen: boolean;
  setIsModalEditOpen: (isModalEditOpen: boolean) => void;
  isModalDeleteOpen: boolean;
  setIsModalDeleteOpen: (isModalDeleteOpen: boolean) => void;
  isModalDetailOpen: boolean;
  setIsModalDetailOpen: (isModalKoordinatOpen: boolean) => void;
  isModalFilterOpen: boolean;
  setIsModalFilterOpen: (isModalFilterOpen: boolean) => void;
  SlipGajiData: SlipGaji | undefined;
  setSlipGajiData: (SlipGajiData: SlipGaji | undefined) => void;
}

export const useSlipGajiStore = create<SlipGajiState>((set, get) => ({
  slipGaji: [] as SlipGaji[],
  fetchSlipGaji: async () => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/slip-gaji`,
      );
      set({ slipGaji: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  fetchSlipGajiByFilter: async (filter: string) => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/slip-gaji?${filter}`,
      );
      console.log(res.data);

      set({ slipGaji: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  fetchSlipGajiByPegawai: async (pegawaiId: string) => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/slip-gaji/pegawai/${pegawaiId}`,
      );

      set({ slipGaji: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  insertSlipGaji: async (slipGaji: SlipGajiCreate) => {
    try {
      const create = await axiosJWT.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/slip-gaji`,
        slipGaji,
      );
      return create.data;
    } catch (error) {
      console.log(error);
    }
  },
  updateSlipGaji: async (slipGaji: SlipGajiUpdate) => {
    try {
      const update = await axiosJWT.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/slip-gaji`,
        slipGaji,
      );
      return update.data;
    } catch (error) {
      console.log(error);
    }
  },
  updateStatusSlipGaji: async (id: string, status: string) => {
    try {
      const update = await axiosJWT.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/slip-gaji/status/${id}`,
        { status: status },
      );
      return update.data;
    } catch (error) {
      console.log(error);
    }
  },
  SlipGajiPegawaiById: (id: string) => {
    return get().slipGaji.find((slipGaji) => slipGaji.id_slip_gaji === id);
  },
  isModalEditOpen: false,
  setIsModalEditOpen: (isModalEditOpen: boolean) => set({ isModalEditOpen }),
  isModalDeleteOpen: false,
  setIsModalDeleteOpen: (isModalDeleteOpen: boolean) =>
    set({ isModalDeleteOpen }),
  isModalDetailOpen: false,
  setIsModalDetailOpen: (isModalDetailOpen: boolean) =>
    set({ isModalDetailOpen }),
  isModalFilterOpen: false,
  setIsModalFilterOpen: (isModalFilterOpen: boolean) =>
    set({ isModalFilterOpen }),
  SlipGajiData: {} as SlipGaji | undefined,
  setSlipGajiData: (slipGajiData: SlipGaji | undefined) =>
    set({ SlipGajiData: slipGajiData }),
}));
