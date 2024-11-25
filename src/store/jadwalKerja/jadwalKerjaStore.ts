/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axiosJWT from "@/lib/authJWT";
import { JadwalKerja, JadwalKerjaCreate } from "./jadwalKerja.types";

interface JadwalKerjaState {
  jadwalKerja: JadwalKerja[];
  fetchJadwalKerja: () => Promise<void>;
  insertJadwalKerja: (jadwalKerja: JadwalKerjaCreate) => Promise<any>;
  fetchJadwalKerjaByFilter: (filter: string) => Promise<any>;
  fetchJadwalKerjaPegawaiByFilter: (
    filter: string,
    pegawaiId: string,
  ) => Promise<any>;
  fetchJadwalKerjaPegawaiByUserFilter: (
    userId: string,
    filter: string,
  ) => Promise<any>;
  updateJadwalKerja: (jadwalKerja: JadwalKerja) => Promise<any>;
  deleteJadwalKerja: (id: string) => Promise<any>;
  jadwalKerjaById: (id: string) => JadwalKerja | undefined;
  isModalEditOpen: boolean;
  setIsModalEditOpen: (isModalEditOpen: boolean) => void;
  isModalDeleteOpen: boolean;
  setIsModalDeleteOpen: (isModalDeleteOpen: boolean) => void;
  jadwalKerjaData: JadwalKerja | undefined;
  isModalFilterOpen: boolean;
  setIsModalFilterOpen: (isModalFilterOpen: boolean) => void;
  setJadwalKerjaData: (JadwalKerja: JadwalKerja | undefined) => void;
}

export const useJadwalKerjaStore = create<JadwalKerjaState>((set, get) => ({
  jadwalKerja: [] as JadwalKerja[],
  fetchJadwalKerja: async () => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jadwal-pegawai`,
      );

      set({ jadwalKerja: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  fetchJadwalKerjaByFilter: async (filter: string) => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jadwal-pegawai?${filter}`,
      );

      set({ jadwalKerja: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  fetchJadwalKerjaPegawaiByFilter: async (
    filter: string,
    pegawaiId: string,
  ) => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jadwal-pegawai/pegawai/${pegawaiId}?${filter}`,
      );

      set({ jadwalKerja: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  fetchJadwalKerjaPegawaiByUserFilter: async (
    userId: string,
    filter: string,
  ) => {
    try {
      const pegawai = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pegawai/user/${userId}`,
      );
      const pegawaiId = pegawai.data.data.id_pegawai;
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jadwal-pegawai/pegawai/${pegawaiId}?${filter}`,
      );

      set({ jadwalKerja: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  insertJadwalKerja: async (jadwalKerja: JadwalKerjaCreate) => {
    try {
      const create = await axiosJWT.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jadwal-pegawai`,
        jadwalKerja,
      );
      return create.data;
    } catch (error) {
      console.log(error);
    }
  },
  updateJadwalKerja: async (jadwalKerja: JadwalKerja) => {
    try {
      const update = await axiosJWT.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jadwal-pegawai/${jadwalKerja.id_jadwal}`,
        {
          pegawai_id: jadwalKerja.pegawai_id,
          shift_id: jadwalKerja.shift_id,
          tanggal: jadwalKerja.tanggal,
        },
      );
      return update.data;
    } catch (error) {
      console.log(error);
    }
  },
  deleteJadwalKerja: async (id: string) => {
    try {
      const destroy = await axiosJWT.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jadwal-pegawai/${id}`,
      );
      return destroy.data;
    } catch (error) {
      console.log(error);
    }
  },
  jadwalKerjaById: (id: string) => {
    return get().jadwalKerja.find(
      (jadwalKerja) => jadwalKerja.id_jadwal === id,
    );
  },
  isModalEditOpen: false,
  setIsModalEditOpen: (isModalEditOpen: boolean) => set({ isModalEditOpen }),
  isModalDeleteOpen: false,
  setIsModalDeleteOpen: (isModalDeleteOpen: boolean) =>
    set({ isModalDeleteOpen }),
  jadwalKerjaData: {} as JadwalKerja | undefined,
  isModalFilterOpen: false,
  setIsModalFilterOpen: (isModalFilterOpen: boolean) =>
    set({ isModalFilterOpen }),
  setJadwalKerjaData: (jadwalKerjaData: JadwalKerja | undefined) =>
    set({ jadwalKerjaData }),
}));
