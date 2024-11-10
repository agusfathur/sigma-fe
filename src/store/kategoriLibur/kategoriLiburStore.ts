import { create } from "zustand";
import axiosJWT from "@/lib/authJWT";
import { KategoriLibur, KategoriLiburCreate } from "./katagoriLibur.types";

interface KatgoriLiburState {
  kategoriLibur: KategoriLibur[];
  fetchKategoriLibur: () => Promise<void>;
  insertKategoriLibur: (katagoriLibur: KategoriLiburCreate) => Promise<any>;
  updateKategoriLibur: (kategoriLibur: KategoriLibur) => Promise<any>;
  deleteKategoriLibur: (id: string) => Promise<any>;
  kategoriLiburById: (id: string) => KategoriLibur | undefined;
  isModalEditOpen: boolean;
  setIsModalEditOpen: (isModalEditOpen: boolean) => void;
  isModalDeleteOpen: boolean;
  setIsModalDeleteOpen: (isModalDeleteOpen: boolean) => void;
  kategoriLiburData: KategoriLibur | undefined;
  setkategoriLiburData: (kategoriLiburData: KategoriLibur | undefined) => void;
}

export const useKategoriLiburStore = create<KatgoriLiburState>((set, get) => ({
  kategoriLibur: [] as KategoriLibur[],
  fetchKategoriLibur: async () => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/kategori-libur`,
      );

      set({ kategoriLibur: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  insertKategoriLibur: async (katagoriLibur: KategoriLiburCreate) => {
    try {
      const create = await axiosJWT.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/kategori-libur`,
        katagoriLibur,
      );
      return create.data;
    } catch (error) {
      console.log(error);
    }
  },
  updateKategoriLibur: async (katagoriLibur: KategoriLibur) => {
    try {
      const update = await axiosJWT.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/kategori-libur/${katagoriLibur.id_kategori_libur}`,
        {
          jenis: katagoriLibur.jenis,
        },
      );
      return update.data;
    } catch (error) {
      console.log(error);
    }
  },
  deleteKategoriLibur: async (id: string) => {
    try {
      const deleteKategoriLibur = await axiosJWT.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/kategori-libur/${id}`,
      );
      return deleteKategoriLibur.data;
    } catch (error) {
      console.log(error);
    }
  },
  kategoriLiburById: (id: string) => {
    return get().kategoriLibur.find(
      (kategoriLibur) => kategoriLibur.id_kategori_libur === id,
    );
  },
  isModalEditOpen: false,
  setIsModalEditOpen: (isModalEditOpen: boolean) => set({ isModalEditOpen }),
  isModalDeleteOpen: false,
  setIsModalDeleteOpen: (isModalDeleteOpen: boolean) =>
    set({ isModalDeleteOpen }),
  kategoriLiburData: {} as KategoriLibur,
  setkategoriLiburData: (kategoriLiburData: KategoriLibur | undefined) =>
    set({ kategoriLiburData }),
}));
