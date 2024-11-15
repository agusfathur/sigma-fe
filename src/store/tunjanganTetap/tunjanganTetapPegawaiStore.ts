/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axiosJWT from "@/lib/authJWT";
import {
  TunjanganTetapPegawai,
  TunjanganTetapPegawaiCreate,
  TunjanganTetapPegawaiUpdate,
} from "./tunjanganTetapPegawai,types";

interface TunjanganTetapPegawaiState {
  tunjanganTetapPegawai: TunjanganTetapPegawai[];
  fetchTunjanganTetapPegawai: () => Promise<void>;
  fetchTunjanganTetapPegawaiById: (id: string) => Promise<void>;
  insertTunjanganTetapPegawai: (
    tunjanganTetapPegawai: TunjanganTetapPegawaiCreate,
  ) => Promise<any>;
  updateTunjanganTetapPegawai: (
    tunjanganTetapPegawai: TunjanganTetapPegawaiUpdate,
  ) => Promise<any>;
  deleteTunjanganTetapPegawai: (id: string) => Promise<any>;
  tunjanganTetapPegawaiById: (id: string) => TunjanganTetapPegawai | undefined;
  isModalEditOpen: boolean;
  setIsModalEditOpen: (isModalEditOpen: boolean) => void;
  isModalDeleteOpen: boolean;
  setIsModalDeleteOpen: (isModalDeleteOpen: boolean) => void;
  isModalDetailOpen: boolean;
  setIsModalDetailOpen: (isModalKoordinatOpen: boolean) => void;
  isModalFilterOpen: boolean;
  setIsModalFilterOpen: (isModalFilterOpen: boolean) => void;
  tunjanganTetapPegawaiData: TunjanganTetapPegawai | undefined;
  setTunjanganTetapPegawaiData: (
    tunjanganTetapPegawaiData: TunjanganTetapPegawai | undefined,
  ) => void;
}

export const useTunjanganTetapPegawaiStore = create<TunjanganTetapPegawaiState>(
  (set, get) => ({
    tunjanganTetapPegawai: [] as TunjanganTetapPegawai[],
    fetchTunjanganTetapPegawai: async () => {
      try {
        const res = await axiosJWT.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tunjangan-tetap-pegawai`,
        );

        set({ tunjanganTetapPegawai: res.data.data });
      } catch (error) {
        console.log(error);
      }
    },
    fetchTunjanganTetapPegawaiById: async (id: string) => {
      try {
        const res = await axiosJWT.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tunjangan-tetap-pegawai/pegawai/${id}`,
        );

        set({ tunjanganTetapPegawai: res.data.data });
      } catch (error) {
        console.log(error);
      }
    },
    insertTunjanganTetapPegawai: async (
      tunjanganTetapPegawai: TunjanganTetapPegawaiCreate,
    ) => {
      try {
        const create = await axiosJWT.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tunjangan-tetap-pegawai`,
          tunjanganTetapPegawai,
        );
        return create.data;
      } catch (error) {
        console.log(error);
      }
    },
    updateTunjanganTetapPegawai: async (
      tunjanganTetapPegawai: TunjanganTetapPegawaiUpdate,
    ) => {
      try {
        const update = await axiosJWT.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tunjangan-tetap-pegawai/${tunjanganTetapPegawai.id_tunjangan_tetap_pegawai}`,
          tunjanganTetapPegawai,
        );
        return update.data;
      } catch (error) {
        console.log(error);
      }
    },

    deleteTunjanganTetapPegawai: async (id: string) => {
      try {
        const destroy = await axiosJWT.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tunjangan-tetap-pegawai/${id}`,
        );
        return destroy.data;
      } catch (error) {
        console.log(error);
      }
    },
    tunjanganTetapPegawaiById: (id: string) => {
      return get().tunjanganTetapPegawai.find(
        (tunjanganTetapPegawai) =>
          tunjanganTetapPegawai.id_tunjangan_tetap_pegawai === id,
      );
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
    tunjanganTetapPegawaiData: {} as TunjanganTetapPegawai | undefined,
    setTunjanganTetapPegawaiData: (
      tunjanganKehadiranData: TunjanganTetapPegawai | undefined,
    ) => set({ tunjanganTetapPegawaiData: tunjanganKehadiranData }),
  }),
);
