/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axiosJWT from "@/lib/authJWT";
import {
  PotongGaji,
  PotongGajiCreate,
  PotongGajiUpdate,
} from "./potongGaji.types";

interface PotongGajiState {
  potongGaji: PotongGaji[];
  fetchPotongGaji: () => Promise<void>;
  insertPotongGaji: (potongGaji: PotongGajiCreate) => Promise<any>;
  updatePotongGaji: (potongGaji: PotongGajiUpdate) => Promise<any>;
  deletePotongGaji: (id: string) => Promise<any>;
  potongGajiPegawaiById: (id: string) => PotongGaji | undefined;
  isModalEditOpen: boolean;
  setIsModalEditOpen: (isModalEditOpen: boolean) => void;
  isModalDeleteOpen: boolean;
  setIsModalDeleteOpen: (isModalDeleteOpen: boolean) => void;
  isModalDetailOpen: boolean;
  setIsModalDetailOpen: (isModalKoordinatOpen: boolean) => void;
  isModalFilterOpen: boolean;
  setIsModalFilterOpen: (isModalFilterOpen: boolean) => void;
  potongGajiData: PotongGaji | undefined;
  setPotongGajiData: (
    tunjanganTetapPegawaiData: PotongGaji | undefined,
  ) => void;
}

export const usePotongGajiStore = create<PotongGajiState>((set, get) => ({
  potongGaji: [] as PotongGaji[],
  fetchPotongGaji: async () => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/potong-gaji`,
      );

      set({ potongGaji: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  insertPotongGaji: async (potongGaji: PotongGajiCreate) => {
    try {
      const create = await axiosJWT.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/potong-gaji`,
        potongGaji,
      );
      return create.data;
    } catch (error) {
      console.log(error);
    }
  },
  updatePotongGaji: async (potongGaji: PotongGajiUpdate) => {
    try {
      const update = await axiosJWT.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/potong-gaji/${potongGaji.id_potong_gaji}`,
        potongGaji,
      );
      return update.data;
    } catch (error) {
      console.log(error);
    }
  },

  deletePotongGaji: async (id: string) => {
    try {
      const destroy = await axiosJWT.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/potong-gaji/${id}`,
      );
      return destroy.data;
    } catch (error) {
      console.log(error);
    }
  },
  potongGajiPegawaiById: (id: string) => {
    return get().potongGaji.find(
      (potongGaji) => potongGaji.id_potong_gaji === id,
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
  potongGajiData: {} as PotongGaji | undefined,
  setPotongGajiData: (potongGajiData: PotongGaji | undefined) =>
    set({ potongGajiData: potongGajiData }),
}));
