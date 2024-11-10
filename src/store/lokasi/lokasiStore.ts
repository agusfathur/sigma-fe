import { create } from "zustand";
import axiosJWT from "@/lib/authJWT";
import { Lokasi, LokasiCreate } from "./lokasi.types";

interface LokasiState {
  lokasi: Lokasi[];
  fetchLokasi: () => Promise<void>;
  insertLokasi: (jabatanFungsional: LokasiCreate) => Promise<void>;
  updateLokasi: (jabatanFungsional: Lokasi) => Promise<void>;
  deleteLokasi: (id: string) => Promise<void>;
  lokasiById: (id: string) => Lokasi | undefined;
  isModalEditOpen: boolean;
  setIsModalEditOpen: (isModalEditOpen: boolean) => void;
  isModalDeleteOpen: boolean;
  setIsModalDeleteOpen: (isModalDeleteOpen: boolean) => void;
  isModalDetailOpen: boolean;
  setIsModalDetailOpen: (isModalDetailOpen: boolean) => void;
  lokasiData: Lokasi | undefined;
  setLokasiData: (lokasiData: Lokasi | undefined) => void;
}

export const useLokasiStore = create<LokasiState>((set, get) => ({
  lokasi: [],
  fetchLokasi: async () => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/data-lokasi`,
      );
      set({ lokasi: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  insertLokasi: async (lokasi: LokasiCreate) => {
    try {
      await axiosJWT.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/data-lokasi`,
        lokasi,
      );
      get().fetchLokasi();
    } catch (error) {
      console.log(error);
    }
  },
  updateLokasi: async (lokasi: Lokasi) => {
    try {
      await axiosJWT.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/data-lokasi/${lokasi.id_lokasi}`,
        {
          nama: lokasi.nama,
          alamat: lokasi.alamat,
          luas_lokasi: lokasi.luas_lokasi,
          koordinat: lokasi.koordinat,
        },
      );
      get().fetchLokasi();
    } catch (error) {
      console.log(error);
    }
  },
  deleteLokasi: async (id: string) => {
    try {
      await axiosJWT.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/data-lokasi/${id}`,
      );
      get().fetchLokasi();
    } catch (error) {
      console.log(error);
    }
  },
  lokasiById: (id: string) => {
    return get().lokasi.find((lokasi) => lokasi.id_lokasi === id);
  },
  isModalEditOpen: false,
  setIsModalEditOpen: (isModalEditOpen: boolean) => set({ isModalEditOpen }),
  isModalDeleteOpen: false,
  setIsModalDeleteOpen: (isModalDeleteOpen: boolean) =>
    set({ isModalDeleteOpen }),
  isModalDetailOpen: false,
  setIsModalDetailOpen: (isModalDetailOpen: boolean) =>
    set({ isModalDetailOpen }),
  lokasiData: {} as Lokasi,
  setLokasiData: (lokasiData: Lokasi | undefined) => set({ lokasiData }),
}));
