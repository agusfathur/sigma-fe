/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axiosJWT from "@/lib/authJWT";
import { THR, THRCreate, THRUpdate } from "./THR.types";

interface AbsensiState {
  tunjanganHariRaya: THR[];
  fetchTHR: () => Promise<void>;
  fetchTHRByFilter: (fiter: string) => Promise<any>;
  fetchTHRByUser: (userId: string) => Promise<any>;
  insertTHR: (tunjanganHariRaya: THRCreate) => Promise<any>;
  updateTHR: (tunjanganHariRaya: THRUpdate) => Promise<any>;
  deleteTHR: (id: string) => Promise<any>;
  THRById: (id: string) => THR | undefined;
  isModalEditOpen: boolean;
  setIsModalEditOpen: (isModalEditOpen: boolean) => void;
  isModalDeleteOpen: boolean;
  setIsModalDeleteOpen: (isModalDeleteOpen: boolean) => void;
  isModalDetailOpen: boolean;
  setIsModalDetailOpen: (isModalKoordinatOpen: boolean) => void;
  isModalFilterOpen: boolean;
  setIsModalFilterOpen: (isModalFilterOpen: boolean) => void;
  THRData: THR | undefined;
  setTHRData: (tunjanganHariRaya: THR | undefined) => void;
}

export const useTHRStore = create<AbsensiState>((set, get) => ({
  tunjanganHariRaya: [] as THR[],
  fetchTHR: async () => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/thr`,
      );

      set({ tunjanganHariRaya: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  fetchTHRByFilter: async (filter: string) => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/thr?${filter}`,
      );
      set({ tunjanganHariRaya: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  fetchTHRByUser: async (userId: string) => {
    try {
      const pegawai = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pegawai/user/${userId}`,
      );
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/thr/pegawai/${pegawai.data.data.id_pegawai}`,
      );

      set({ tunjanganHariRaya: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  insertTHR: async (thr: THRCreate) => {
    try {
      const create = await axiosJWT.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/thr`,
        thr,
      );
      return create.data;
    } catch (error) {
      console.log(error);
    }
  },
  updateTHR: async (thr: THRUpdate) => {
    try {
      const update = await axiosJWT.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/thr/${thr.id_thr}`,
        thr,
      );
      return update.data;
    } catch (error) {
      console.log(error);
    }
  },

  deleteTHR: async (id: string) => {
    try {
      const destroy = await axiosJWT.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/thr/${id}`,
      );
      return destroy.data;
    } catch (error) {
      console.log(error);
    }
  },
  THRById: (id: string) => {
    return get().tunjanganHariRaya.find(
      (tunjanganHariRaya) => tunjanganHariRaya.id_thr === id,
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
  THRData: {} as THR | undefined,
  setTHRData: (thrData: THR | undefined) => set({ THRData: thrData }),
}));
