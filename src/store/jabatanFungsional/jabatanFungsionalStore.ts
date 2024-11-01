import { create } from "zustand";
import axiosJWT from "@/lib/authJWT";
import {
  JabatanFungsional,
  JabatanFungsionalCreate,
} from "./jabatanFungsional.types";

interface JabatanFungsionalState {
  jabatanFungsional: JabatanFungsional[];
  fetchJabatanFungsional: () => Promise<void>;
  insertJabatanFungsional: (
    jabatanFungsional: JabatanFungsionalCreate,
  ) => Promise<void>;
  updateJabatanFungsional: (
    jabatanFungsional: JabatanFungsional,
  ) => Promise<void>;
  deleteJabatanFungsional: (id: string) => Promise<void>;
  jabatanFungsionalById: (id: string) => JabatanFungsional | undefined;
  isModalEditOpen: boolean;
  setIsModalEditOpen: (isModalEditOpen: boolean) => void;
  isModalDeleteOpen: boolean;
  setIsModalDeleteOpen: (isModalDeleteOpen: boolean) => void;
  jabatanFungsionalData: JabatanFungsional | undefined;
  setJabatanFungsionalData: (
    jabatanFungsionalData: JabatanFungsional | undefined,
  ) => void;
}

export const useJabatanFungsionalStore = create<JabatanFungsionalState>(
  (set, get) => ({
    jabatanFungsional: [],
    fetchJabatanFungsional: async () => {
      try {
        const res = await axiosJWT.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/jabatan-fungsional`,
        );
        set({ jabatanFungsional: res.data.data });
      } catch (error) {
        console.log(error);
      }
    },
    insertJabatanFungsional: async (
      jabatanFungsional: JabatanFungsionalCreate,
    ) => {
      try {
        await axiosJWT.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/jabatan-fungsional`,
          jabatanFungsional,
        );
        get().fetchJabatanFungsional();
      } catch (error) {
        console.log(error);
      }
    },
    updateJabatanFungsional: async (jabatanFungsional: JabatanFungsional) => {
      try {
        await axiosJWT.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/jabatan-fungsional/${jabatanFungsional.id_jabatan_fungsional}`,
          {
            nama: jabatanFungsional.nama,
            tunjangan: jabatanFungsional.tunjangan,
          },
        );
        get().fetchJabatanFungsional();
      } catch (error) {
        console.log(error);
      }
    },
    deleteJabatanFungsional: async (id: string) => {
      try {
        await axiosJWT.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/api/jabatan-fungsional/${id}`,
        );
        get().fetchJabatanFungsional();
      } catch (error) {
        console.log(error);
      }
    },
    jabatanFungsionalById: (id: string) => {
      return get().jabatanFungsional.find(
        (jabatanFungsional) => jabatanFungsional.id_jabatan_fungsional === id,
      );
    },
    isModalEditOpen: false,
    setIsModalEditOpen: (isModalEditOpen: boolean) => set({ isModalEditOpen }),
    isModalDeleteOpen: false,
    setIsModalDeleteOpen: (isModalDeleteOpen: boolean) =>
      set({ isModalDeleteOpen }),
    jabatanFungsionalData: undefined,
    setJabatanFungsionalData: (
      jabatanFungsionalData: JabatanFungsional | undefined,
    ) => set({ jabatanFungsionalData }),
  }),
);
