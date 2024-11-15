/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axiosJWT from "@/lib/authJWT";
import { Lembur, LemburCreate, LemburUpdate } from "./lembur.types";

interface AbsensiState {
  lembur: Lembur[];
  fetchLembur: () => Promise<void>;
  fetchAllLemburByFilter: (fiter: string) => Promise<any>;
  insertLembur: (lembur: LemburCreate) => Promise<any>;
  updateStatusLembur: (lemburStatus: string, id: string) => Promise<any>;
  updateLembur: (Lembur: LemburUpdate) => Promise<any>;
  deleteLembur: (id: string) => Promise<any>;
  lemburById: (id: string) => Lembur | undefined;
  isModalEditOpen: boolean;
  setIsModalEditOpen: (isModalEditOpen: boolean) => void;
  isModalDeleteOpen: boolean;
  setIsModalDeleteOpen: (isModalDeleteOpen: boolean) => void;
  isModalDetailOpen: boolean;
  setIsModalDetailOpen: (isModalKoordinatOpen: boolean) => void;
  isModalFilterOpen: boolean;
  setIsModalFilterOpen: (isModalFilterOpen: boolean) => void;
  lemburData: Lembur | undefined;
  setLemburData: (lembur: Lembur | undefined) => void;
}

export const useLemburStore = create<AbsensiState>((set, get) => ({
  lembur: [] as Lembur[],
  fetchLembur: async () => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/lembur`,
      );

      set({ lembur: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  fetchAllLemburByFilter: async (filter: string) => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/lembur?${filter}`,
      );

      set({ lembur: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },

  insertLembur: async (lembur: LemburCreate) => {
    try {
      const create = await axiosJWT.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/lembur`,
        lembur,
      );
      return create.data;
    } catch (error) {
      console.log(error);
    }
  },
  updateLembur: async (lembur: LemburUpdate) => {
    try {
      const update = await axiosJWT.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/lembur/${lembur.id_lembur}`,
        lembur,
      );
      return update.data;
    } catch (error) {
      console.log(error);
    }
  },
  updateStatusLembur: async (status: string, id: string) => {
    try {
      const update = await axiosJWT.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/lembur/status/${id}`,
        {
          status_lembur: status,
        },
      );
      return update.data;
    } catch (error) {
      console.log(error);
    }
  },
  deleteLembur: async (id: string) => {
    try {
      const destroy = await axiosJWT.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/lembur/${id}`,
      );
      return destroy.data;
    } catch (error) {
      console.log(error);
    }
  },
  lemburById: (id: string) => {
    return get().lembur.find((lembur) => lembur.id_lembur === id);
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
  lemburData: {} as Lembur | undefined,
  setLemburData: (lemburData: Lembur | undefined) => set({ lemburData }),
}));
