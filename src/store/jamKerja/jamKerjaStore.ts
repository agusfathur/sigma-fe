import { create } from "zustand";
import axiosJWT from "@/lib/authJWT";
import { JamKerja, JamKerjaCreate } from "./jamKerja.types";

interface JamKerjaState {
  jamKerja: JamKerja[];
  fetchJamKerja: () => Promise<void>;
  insertJamKerja: (jamKerja: JamKerjaCreate) => Promise<any>;
  updateJamKerja: (jamKerja: JamKerja) => Promise<any>;
  deleteJamKerja: (id: string) => Promise<any>;
  jamKerjaById: (id: string) => JamKerja | undefined;
  isModalEditOpen: boolean;
  setIsModalEditOpen: (isModalEditOpen: boolean) => void;
  isModalDeleteOpen: boolean;
  setIsModalDeleteOpen: (isModalDeleteOpen: boolean) => void;
  jamKerjaData: JamKerja | undefined;
  setJamKerjaData: (jamKerja: JamKerja | undefined) => void;
}

export const useJamKerjaStore = create<JamKerjaState>((set, get) => ({
  jamKerja: [] as JamKerja[],
  fetchJamKerja: async () => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/shift-kerja`,
      );

      set({ jamKerja: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  insertJamKerja: async (jamKerja: JamKerjaCreate) => {
    try {
      const create = await axiosJWT.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/shift-kerja`,
        jamKerja,
      );
      return create.data;
    } catch (error) {
      console.log(error);
    }
  },
  updateJamKerja: async (jamKerja: JamKerja) => {
    try {
      const update = await axiosJWT.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/shift-kerja/${jamKerja.id_shift_kerja}`,
        {
          shift_kerja: jamKerja.shift_kerja,
          waktu_masuk: jamKerja.waktu_masuk,
          waktu_pulang: jamKerja.waktu_pulang,
          durasi_kerja: jamKerja.durasi_kerja,
          keterangan: jamKerja.keterangan,
        },
      );
      return update.data;
    } catch (error) {
      console.log(error);
    }
  },
  deleteJamKerja: async (id: string) => {
    try {
      const destroy = await axiosJWT.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/shift-kerja/${id}`,
      );
      return destroy.data;
    } catch (error) {
      console.log(error);
    }
  },
  jamKerjaById: (id: string) => {
    return get().jamKerja.find((jamKerja) => jamKerja.id_shift_kerja === id);
  },
  isModalEditOpen: false,
  setIsModalEditOpen: (isModalEditOpen: boolean) => set({ isModalEditOpen }),
  isModalDeleteOpen: false,
  setIsModalDeleteOpen: (isModalDeleteOpen: boolean) =>
    set({ isModalDeleteOpen }),
  jamKerjaData: {} as JamKerja | undefined,
  setJamKerjaData: (jamKerjaData: JamKerja | undefined) =>
    set({ jamKerjaData }),
}));
