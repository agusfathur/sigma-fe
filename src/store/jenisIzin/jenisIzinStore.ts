import { create } from "zustand";
import axiosJWT from "@/lib/authJWT";
import { JenisIzin, JenisIzinCreate } from "./jenisIzin.types";

interface JenisIzinState {
  jenisIzin: JenisIzin[];
  fetchJenisIzin: () => Promise<void>;
  insertJenisIzin: (jenisIzin: JenisIzinCreate) => Promise<any>;
  updateJenisIzin: (jenisIzin: JenisIzin) => Promise<any>;
  deleteJenisIzin: (id: string) => Promise<any>;
  jenisIzinById: (id: string) => JenisIzin | undefined;
  isModalEditOpen: boolean;
  setIsModalEditOpen: (isModalEditOpen: boolean) => void;
  isModalDeleteOpen: boolean;
  setIsModalDeleteOpen: (isModalDeleteOpen: boolean) => void;
  jenisIzinData: JenisIzin | undefined;
  setJenisIzinData: (jenisIzin: JenisIzin | undefined) => void;
}

export const useJenisIzinStore = create<JenisIzinState>((set, get) => ({
  jenisIzin: [] as JenisIzin[],
  fetchJenisIzin: async () => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jenis-izin`,
      );

      set({ jenisIzin: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  insertJenisIzin: async (jenisIzin: JenisIzinCreate) => {
    try {
      const create = await axiosJWT.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jenis-izin`,
        jenisIzin,
      );
      return create.data;
    } catch (error) {
      console.log(error);
    }
  },
  updateJenisIzin: async (jenisIzin: JenisIzin) => {
    try {
      const update = await axiosJWT.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jenis-izin/${jenisIzin.id_jenis_izin}`,
        {
          nama: jenisIzin.nama,
          jenis: jenisIzin.jenis,
          jatah: jenisIzin.jatah,
          tahun: jenisIzin.tahun,
        },
      );
      return update.data;
    } catch (error) {
      console.log(error);
    }
  },
  deleteJenisIzin: async (id: string) => {
    try {
      const destroy = await axiosJWT.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jenis-izin/${id}`,
      );
      return destroy.data;
    } catch (error) {
      console.log(error);
    }
  },
  jenisIzinById: (id: string) => {
    return get().jenisIzin.find((jenisIzin) => jenisIzin.id_jenis_izin === id);
  },
  isModalEditOpen: false,
  setIsModalEditOpen: (isModalEditOpen: boolean) => set({ isModalEditOpen }),
  isModalDeleteOpen: false,
  setIsModalDeleteOpen: (isModalDeleteOpen: boolean) =>
    set({ isModalDeleteOpen }),
  jenisIzinData: {} as JenisIzin,
  setJenisIzinData: (jenisIzinData: JenisIzin | undefined) =>
    set({ jenisIzinData }),
}));
