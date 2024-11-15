/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axiosJWT from "@/lib/authJWT";
import {
  TunjanganTetap,
  TunjanganTetapCreate,
  TunjanganTetapUpdate,
} from "./tunjanganTetap.types";

interface TunjanganTetapState {
  tunjanganTetap: TunjanganTetap[];
  fetchTunjanganTetap: () => Promise<void>;
  insertTunjanganTetap: (tunjanganTetap: TunjanganTetapCreate) => Promise<any>;
  updatetunjanganTetap: (tunjanganTetap: TunjanganTetapUpdate) => Promise<any>;
  deleteTunjanganTetap: (id: string) => Promise<any>;
  tunjanganTetapById: (id: string) => TunjanganTetap | undefined;
  isModalEditOpen: boolean;
  setIsModalEditOpen: (isModalEditOpen: boolean) => void;
  isModalDeleteOpen: boolean;
  setIsModalDeleteOpen: (isModalDeleteOpen: boolean) => void;
  isModalDetailOpen: boolean;
  setIsModalDetailOpen: (isModalKoordinatOpen: boolean) => void;
  isModalFilterOpen: boolean;
  setIsModalFilterOpen: (isModalFilterOpen: boolean) => void;
  tunjanganTetapData: TunjanganTetap | undefined;
  setTunjanganTetap: (tunjanganTetapData: TunjanganTetap | undefined) => void;
}

export const useTunjanganTetapStore = create<TunjanganTetapState>(
  (set, get) => ({
    tunjanganTetap: [] as TunjanganTetap[],
    fetchTunjanganTetap: async () => {
      try {
        const res = await axiosJWT.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tunjangan-tetap`,
        );

        set({ tunjanganTetap: res.data.data });
      } catch (error) {
        console.log(error);
      }
    },
    insertTunjanganTetap: async (tunjanganTetap: TunjanganTetapCreate) => {
      try {
        const create = await axiosJWT.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tunjangan-tetap`,
          tunjanganTetap,
        );
        return create.data;
      } catch (error) {
        console.log(error);
      }
    },
    updatetunjanganTetap: async (tunjanganTetap: TunjanganTetapUpdate) => {
      try {
        const update = await axiosJWT.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tunjangan-tetap/${tunjanganTetap.id_tunjangan_tetap}`,
          tunjanganTetap,
        );
        return update.data;
      } catch (error) {
        console.log(error);
      }
    },

    deleteTunjanganTetap: async (id: string) => {
      try {
        const destroy = await axiosJWT.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tunjangan-tetap/${id}`,
        );
        return destroy.data;
      } catch (error) {
        console.log(error);
      }
    },
    tunjanganTetapById: (id: string) => {
      return get().tunjanganTetap.find(
        (tunjanganTetap) => tunjanganTetap.id_tunjangan_tetap === id,
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
    tunjanganTetapData: {} as TunjanganTetap | undefined,
    setTunjanganTetap: (tunjanganTetapData: TunjanganTetap | undefined) =>
      set({ tunjanganTetapData: tunjanganTetapData }),
  }),
);
