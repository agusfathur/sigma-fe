/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axiosJWT from "@/lib/authJWT";
import { Pajak, PajakCreate, PajakUpdate } from "./pajak.types";

interface PajakState {
  pajak: Pajak[];
  fetchPajak: () => Promise<void>;
  insertPajak: (pajak: PajakCreate) => Promise<any>;
  updatePajak: (pajak: PajakUpdate) => Promise<any>;
  deletePajak: (id: string) => Promise<any>;
  pajakById: (id: string) => Pajak | undefined;
  isModalEditOpen: boolean;
  setIsModalEditOpen: (isModalEditOpen: boolean) => void;
  isModalDeleteOpen: boolean;
  setIsModalDeleteOpen: (isModalDeleteOpen: boolean) => void;
  isModalDetailOpen: boolean;
  setIsModalDetailOpen: (isModalKoordinatOpen: boolean) => void;
  isModalFilterOpen: boolean;
  setIsModalFilterOpen: (isModalFilterOpen: boolean) => void;
  pajakData: Pajak | undefined;
  setPajakData: (tunjanganKehadiranData: Pajak | undefined) => void;
}

export const usePajakStore = create<PajakState>((set, get) => ({
  pajak: [] as Pajak[],
  fetchPajak: async () => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pajak`,
      );

      set({ pajak: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  insertPajak: async (pajak: PajakCreate) => {
    try {
      const create = await axiosJWT.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pajak`,
        pajak,
      );
      return create.data;
    } catch (error) {
      console.log(error);
    }
  },
  updatePajak: async (pajak: PajakUpdate) => {
    try {
      const update = await axiosJWT.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pajak/${pajak.id_pajak}`,
        { ...pajak, persen: String(pajak.persen) },
      );
      return update.data;
    } catch (error) {
      console.log(error);
    }
  },

  deletePajak: async (id: string) => {
    try {
      const destroy = await axiosJWT.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pajak/${id}`,
      );
      return destroy.data;
    } catch (error) {
      console.log(error);
    }
  },
  pajakById: (id: string) => {
    return get().pajak.find((pajak) => pajak.id_pajak === id);
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
  pajakData: {} as Pajak | undefined,
  setPajakData: (pajakData: Pajak | undefined) => set({ pajakData }),
}));
