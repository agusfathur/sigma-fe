/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axiosJWT from "@/lib/authJWT";
import {
  TunjanganKehadiran,
  TunjanganKehadiranCreate,
  TunjanganKehadiranUpdate,
} from "./tunjanganKehadiran.types";

interface TunjanganKehadiranState {
  tunjanganKehadiran: TunjanganKehadiran[];
  fetchTunjanganKehadiran: () => Promise<void>;
  insertTunjanganKehadiran: (
    tunjanganKehadiran: TunjanganKehadiranCreate,
  ) => Promise<any>;
  updateTunjanganKehadiran: (
    tunjanganKehadiran: TunjanganKehadiranUpdate,
  ) => Promise<any>;
  deleteTunjanganKehadiran: (id: string) => Promise<any>;
  tunjanganKehadiranyId: (id: string) => TunjanganKehadiran | undefined;
  isModalEditOpen: boolean;
  setIsModalEditOpen: (isModalEditOpen: boolean) => void;
  isModalDeleteOpen: boolean;
  setIsModalDeleteOpen: (isModalDeleteOpen: boolean) => void;
  isModalDetailOpen: boolean;
  setIsModalDetailOpen: (isModalKoordinatOpen: boolean) => void;
  isModalFilterOpen: boolean;
  setIsModalFilterOpen: (isModalFilterOpen: boolean) => void;
  tunjanganKehadiranData: TunjanganKehadiran | undefined;
  setTunjanganKehadiran: (
    tunjanganKehadiranData: TunjanganKehadiran | undefined,
  ) => void;
}

export const useTunjanganKehadiranStore = create<TunjanganKehadiranState>(
  (set, get) => ({
    tunjanganKehadiran: [] as TunjanganKehadiran[],
    fetchTunjanganKehadiran: async () => {
      try {
        const res = await axiosJWT.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tunjangan-kehadiran`,
        );

        set({ tunjanganKehadiran: res.data.data });
      } catch (error) {
        console.log(error);
      }
    },
    insertTunjanganKehadiran: async (
      tunjanganKehadiran: TunjanganKehadiranCreate,
    ) => {
      try {
        const create = await axiosJWT.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tunjangan-kehadiran`,
          tunjanganKehadiran,
        );
        return create.data;
      } catch (error) {
        console.log(error);
      }
    },
    updateTunjanganKehadiran: async (
      tunjanganKehadiran: TunjanganKehadiranUpdate,
    ) => {
      try {
        const update = await axiosJWT.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tunjangan-kehadiran/${tunjanganKehadiran.id_tunjangan_kehadiran}`,
          tunjanganKehadiran,
        );
        return update.data;
      } catch (error) {
        console.log(error);
      }
    },

    deleteTunjanganKehadiran: async (id: string) => {
      try {
        const destroy = await axiosJWT.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tunjangan-kehadiran/${id}`,
        );
        return destroy.data;
      } catch (error) {
        console.log(error);
      }
    },
    tunjanganKehadiranyId: (id: string) => {
      return get().tunjanganKehadiran.find(
        (tunjanganKehadiran) =>
          tunjanganKehadiran.id_tunjangan_kehadiran === id,
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
    tunjanganKehadiranData: {} as TunjanganKehadiran | undefined,
    setTunjanganKehadiran: (
      tunjanganKehadiranData: TunjanganKehadiran | undefined,
    ) => set({ tunjanganKehadiranData }),
  }),
);
