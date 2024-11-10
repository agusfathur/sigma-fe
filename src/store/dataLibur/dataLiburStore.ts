import { create } from "zustand";
import axiosJWT from "@/lib/authJWT";
import { DataLibur, DataLiburCreate, DataLiburUpdate } from "./dataLibur.types";

interface DataLiburState {
  dataLibur: DataLibur[];
  fetchDataLibur: () => Promise<void>;
  insertDataLibur: (dataLibur: DataLiburCreate) => Promise<any>;
  updateDataLibur: (dataLibur: DataLiburUpdate) => Promise<any>;
  deleteDataLibur: (id: string) => Promise<any>;
  dataLiburById: (id: string) => DataLibur | undefined;
  isModalEditOpen: boolean;
  setIsModalEditOpen: (isModalEditOpen: boolean) => void;
  isModalDeleteOpen: boolean;
  setIsModalDeleteOpen: (isModalDeleteOpen: boolean) => void;
  dataLiburData: DataLibur | undefined;
  setDataLiburData: (dataLibur: DataLibur | undefined) => void;
}

export const useDataLiburStore = create<DataLiburState>((set, get) => ({
  dataLibur: [] as DataLibur[],
  fetchDataLibur: async () => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/libur`,
      );
      set({ dataLibur: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  insertDataLibur: async (dataLibur: DataLiburCreate) => {
    try {
      const create = await axiosJWT.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/libur`,
        dataLibur,
      );
      return create.data;
    } catch (error) {
      console.log(error);
    }
  },
  updateDataLibur: async (dataLibur: DataLiburUpdate) => {
    try {
      const update = await axiosJWT.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/libur/${dataLibur.id_libur}`,
        {
          kategori_libur_id: dataLibur.kategori_libur_id,
          nama: dataLibur.nama,
          tanggal: dataLibur.tanggal,
          status_absen: dataLibur.status_absen,
        },
      );
      return update.data;
    } catch (error) {
      console.log(error);
    }
  },
  deleteDataLibur: async (id: string) => {
    try {
      const destroy = await axiosJWT.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/libur/${id}`,
      );
      return destroy.data;
    } catch (error) {
      console.log(error);
    }
  },
  dataLiburById: (id: string) => {
    return get().dataLibur.find((dataLibur) => dataLibur.id_libur === id);
  },
  isModalEditOpen: false,
  setIsModalEditOpen: (isModalEditOpen: boolean) => set({ isModalEditOpen }),
  isModalDeleteOpen: false,
  setIsModalDeleteOpen: (isModalDeleteOpen: boolean) =>
    set({ isModalDeleteOpen }),
  dataLiburData: {} as DataLibur | undefined,
  setDataLiburData: (dataLiburData: DataLibur | undefined) =>
    set({ dataLiburData }),
}));
