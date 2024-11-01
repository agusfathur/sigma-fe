import { create } from "zustand";
import axiosJWT from "@/lib/authJWT";
import { Jabatan, JabatanCreate } from "./jabatan.types";

interface JabatanState {
  jabatan: Jabatan[];
  fetchJabatan: () => Promise<void>;
  insertJabatan: (jabatan: JabatanCreate) => Promise<void>;
  updateJabatan: (jabatan: Jabatan) => Promise<void>;
  deleteJabatan: (id: string) => Promise<void>;
  jabatanById: (id: string) => Jabatan | undefined;
  isModalEditOpen: boolean;
  setIsModalEditOpen: (isModalEditOpen: boolean) => void;
  isModalDeleteOpen: boolean;
  setIsModalDeleteOpen: (isModalDeleteOpen: boolean) => void;
  jabatanData: Jabatan | undefined;
  setJabatanData: (jabatanData: Jabatan | undefined) => void;
}
export const useJabatanStore = create<JabatanState>((set, get) => ({
  jabatan: [],
  fetchJabatan: async () => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jabatan`,
      );
      set({ jabatan: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  insertJabatan: async (jabatan: JabatanCreate) => {
    try {
      await axiosJWT.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jabatan`,
        jabatan,
      );
      get().fetchJabatan();
    } catch (error) {
      console.log(error);
    }
  },
  updateJabatan: async (jabatan: Jabatan) => {
    try {
      await axiosJWT.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jabatan/${jabatan.id_jabatan}`,
        {
          nama: jabatan.nama,
          gaji: jabatan.gaji,
        },
      );
      get().fetchJabatan();
    } catch (error) {
      console.log(error);
    }
  },
  deleteJabatan: async (id: string) => {
    try {
      await axiosJWT.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jabatan/${id}`,
      );
      get().fetchJabatan();
    } catch (error) {
      console.log(error);
    }
  },
  jabatanById: (id: string) => {
    return get().jabatan.find((jabatan) => jabatan.id_jabatan === id);
  },
  isModalEditOpen: false,
  setIsModalEditOpen: (isModalEditOpen: boolean) => set({ isModalEditOpen }),
  isModalDeleteOpen: false,
  setIsModalDeleteOpen: (isModalDeleteOpen: boolean) =>
    set({ isModalDeleteOpen }),
  jabatanData: {} as Jabatan,
  setJabatanData: (jabatanData: Jabatan | undefined) => set({ jabatanData }),
}));
