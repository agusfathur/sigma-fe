/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axiosJWT from "@/lib/authJWT";
import {
  Absensi,
  CreateAbsensiMasuk,
  CreateAbsensiPulang,
} from "./absensi.types";

interface AbsensiState {
  absensi: Absensi[];
  fetchAbsensi: () => Promise<void>;
  fetchAllAbsensiByFilter: (fiter: string) => Promise<any>;
  fetchAllAbsensiPegawaiByFilter: (
    fiter: string,
    pegawaiId: string,
  ) => Promise<any>;
  fetchAllAbsensiByUserFilter: (userId: string, filter: string) => Promise<any>;
  insertAbsensiMasuk: (absensiMasuk: CreateAbsensiMasuk) => Promise<any>;
  insertAbsensiPulang: (absensiPulang: CreateAbsensiPulang) => Promise<any>;
  updateAbsensi: (absensi: Absensi) => Promise<any>;
  deleteAbsensi: (id: string) => Promise<any>;
  absensiById: (id: string) => Absensi | undefined;
  isModalEditOpen: boolean;
  setIsModalEditOpen: (isModalEditOpen: boolean) => void;
  isModalDeleteOpen: boolean;
  setIsModalDeleteOpen: (isModalDeleteOpen: boolean) => void;
  isModalKoordinatOpen: boolean;
  setIsModalKoordinatOpen: (isModalKoordinatOpen: boolean) => void;
  isModalFilterOpen: boolean;
  setIsModalFilterOpen: (isModalFilterOpen: boolean) => void;
  absensiData: Absensi | undefined;
  setAbsensiData: (absensi: Absensi | undefined) => void;
}

export const useAbsensiStore = create<AbsensiState>((set, get) => ({
  absensi: [] as Absensi[],
  fetchAbsensi: async () => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/absensi`,
      );

      set({ absensi: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  fetchAllAbsensiByFilter: async (filter: string) => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/absensi?${filter}`,
      );

      set({ absensi: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  fetchAllAbsensiPegawaiByFilter: async (filter: string, pegawaiId: string) => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/absensi/pegawai/${pegawaiId}?${filter}`,
      );

      set({ absensi: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  fetchAllAbsensiByUserFilter: async (userId: string, filter: string) => {
    try {
      const pegawai = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pegawai/user/${userId}`,
      );

      const pegawaiId = pegawai.data.data.id_pegawai;

      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/absensi/pegawai/${pegawaiId}?${filter}`,
      );

      set({ absensi: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  insertAbsensiMasuk: async (absensiMasuk: CreateAbsensiMasuk) => {
    try {
      const create = await axiosJWT.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/absensi`,
        absensiMasuk,
      );
      return create.data;
    } catch (error) {
      console.log(error);
    }
  },
  insertAbsensiPulang: async (absensiPulang: CreateAbsensiPulang) => {
    try {
      const create = await axiosJWT.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/absensi`,
        absensiPulang,
      );
      return create.data;
    } catch (error) {
      console.log(error);
    }
  },
  updateAbsensi: async (absensi: Absensi) => {
    try {
      const update = await axiosJWT.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/absensi/${absensi.id_absen}`,
        absensi,
      );
      return update.data;
    } catch (error) {
      console.log(error);
    }
  },
  deleteAbsensi: async (id: string) => {
    try {
      const destroy = await axiosJWT.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/absensi/${id}`,
      );
      return destroy.data;
    } catch (error) {
      console.log(error);
    }
  },
  absensiById: (id: string) => {
    return get().absensi.find((absensi) => absensi.id_absen === id);
  },
  isModalEditOpen: false,
  setIsModalEditOpen: (isModalEditOpen: boolean) => set({ isModalEditOpen }),
  isModalDeleteOpen: false,
  setIsModalDeleteOpen: (isModalDeleteOpen: boolean) =>
    set({ isModalDeleteOpen }),
  isModalKoordinatOpen: false,
  setIsModalKoordinatOpen: (isModalKoordinatOpen: boolean) =>
    set({ isModalKoordinatOpen }),
  isModalFilterOpen: false,
  setIsModalFilterOpen: (isModalFilterOpen: boolean) =>
    set({ isModalFilterOpen }),
  absensiData: {} as Absensi | undefined,
  setAbsensiData: (absensiData: Absensi | undefined) => set({ absensiData }),
}));
