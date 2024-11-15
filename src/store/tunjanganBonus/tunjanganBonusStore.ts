/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axiosJWT from "@/lib/authJWT";
import {
  TunjanganBonus,
  TunjanganBonusCreate,
  TunjanganBonusUpdate,
} from "./tunjanganBonus.types";

interface TunjanganBonusState {
  tunjanganBonus: TunjanganBonus[];
  fetchTunjanganBonus: () => Promise<void>;
  fetchTunjanganBonusByFilter: (fiter: string) => Promise<any>;
  insertTunjanganBonus: (tunjanganBonus: TunjanganBonusCreate) => Promise<any>;
  updateTunjanganBonus: (
    tunjanganHariRaya: TunjanganBonusUpdate,
  ) => Promise<any>;
  deleteTunjanganBonus: (id: string) => Promise<any>;
  tunjanganBonusyId: (id: string) => TunjanganBonus | undefined;
  isModalEditOpen: boolean;
  setIsModalEditOpen: (isModalEditOpen: boolean) => void;
  isModalDeleteOpen: boolean;
  setIsModalDeleteOpen: (isModalDeleteOpen: boolean) => void;
  isModalDetailOpen: boolean;
  setIsModalDetailOpen: (isModalKoordinatOpen: boolean) => void;
  isModalFilterOpen: boolean;
  setIsModalFilterOpen: (isModalFilterOpen: boolean) => void;
  tunjanganBonusData: TunjanganBonus | undefined;
  setTunjanganBonusData: (tunjangaBonus: TunjanganBonus | undefined) => void;
}

export const useTunjanganBonusStore = create<TunjanganBonusState>(
  (set, get) => ({
    tunjanganBonus: [] as TunjanganBonus[],
    fetchTunjanganBonus: async () => {
      try {
        const res = await axiosJWT.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tunjangan-bonus`,
        );

        set({ tunjanganBonus: res.data.data });
      } catch (error) {
        console.log(error);
      }
    },
    fetchTunjanganBonusByFilter: async (filter: string) => {
      try {
        const res = await axiosJWT.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tunjangan-bonus?${filter}`,
        );

        set({ tunjanganBonus: res.data.data });
      } catch (error) {
        console.log(error);
      }
    },

    insertTunjanganBonus: async (tunjanganBonus: TunjanganBonusCreate) => {
      try {
        const create = await axiosJWT.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tunjangan-bonus`,
          tunjanganBonus,
        );
        return create.data;
      } catch (error) {
        console.log(error);
      }
    },
    updateTunjanganBonus: async (tunjanganBonus: TunjanganBonusUpdate) => {
      try {
        const update = await axiosJWT.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tunjangan-bonus/${tunjanganBonus.id_tunjangan_bonus}`,
          tunjanganBonus,
        );
        return update.data;
      } catch (error) {
        console.log(error);
      }
    },

    deleteTunjanganBonus: async (id: string) => {
      try {
        const destroy = await axiosJWT.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tunjangan-bonus/${id}`,
        );
        return destroy.data;
      } catch (error) {
        console.log(error);
      }
    },
    tunjanganBonusyId: (id: string) => {
      return get().tunjanganBonus.find(
        (tunjangaBonus) => tunjangaBonus.id_tunjangan_bonus === id,
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
    tunjanganBonusData: {} as TunjanganBonus | undefined,
    setTunjanganBonusData: (tunjangaBonusData: TunjanganBonus | undefined) =>
      set({ tunjanganBonusData: tunjangaBonusData }),
  }),
);
