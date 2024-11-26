/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axiosJWT from "@/lib/authJWT";
import { Pinjaman, PinjamanCreate, PinjamanUpdate } from "./pinjaman.types";

interface PinjamanState {
  pinjaman: Pinjaman[];
  fetchPinjaman: () => Promise<void>;
  fetchPinjamanByFilter: (filter: string) => Promise<void>;
  fetchPinjamanByUserFilter: (userId: string, filter: string) => Promise<void>;
  insertPinjaman: (userId: string, pinjaman: PinjamanCreate) => Promise<any>;
  updatePinjaman: (pinjaman: PinjamanUpdate) => Promise<any>;
  updateStatusPinjaman: (id: string, status: string) => Promise<any>;
  deletePinjaman: (id: string) => Promise<any>;
  pinjamanPegawaiById: (id: string) => Pinjaman | undefined;
  isModalEditOpen: boolean;
  setIsModalEditOpen: (isModalEditOpen: boolean) => void;
  isModalDeleteOpen: boolean;
  setIsModalDeleteOpen: (isModalDeleteOpen: boolean) => void;
  isModalDetailOpen: boolean;
  setIsModalDetailOpen: (isModalKoordinatOpen: boolean) => void;
  isModalFilterOpen: boolean;
  setIsModalFilterOpen: (isModalFilterOpen: boolean) => void;
  pinjamanData: Pinjaman | undefined;
  setPinjamanData: (pinjamanData: Pinjaman | undefined) => void;
}

export const usePinjamanStore = create<PinjamanState>((set, get) => ({
  pinjaman: [] as Pinjaman[],
  fetchPinjaman: async () => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pinjaman`,
      );

      set({ pinjaman: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  fetchPinjamanByFilter: async (filter: string) => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pinjaman?${filter}`,
      );

      set({ pinjaman: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  fetchPinjamanByUserFilter: async (userId: string, filter: string) => {
    try {
      const pegawai = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pegawai/user/${userId}`,
      );

      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pinjaman/pegawai/${pegawai.data.data.id_pegawai}?${filter}`,
      );

      set({ pinjaman: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  insertPinjaman: async (userId: string, pinjaman: PinjamanCreate) => {
    try {
      const pegawai = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pegawai/user/${userId}`,
      );

      const create = await axiosJWT.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pinjaman`,
        {
          ...pinjaman,
          pegawai_id: pegawai.data.data.id_pegawai,
          status_pinjaman: "pending",
        },
      );
      return create.data;
    } catch (error) {
      console.log(error);
    }
  },
  updatePinjaman: async (pinjaman: PinjamanUpdate) => {
    try {
      const update = await axiosJWT.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pinjaman/${pinjaman.id_pinjaman}`,
        pinjaman,
      );
      return update.data;
    } catch (error) {
      console.log(error);
    }
  },
  updateStatusPinjaman: async (id: string, status: string) => {
    try {
      const update = await axiosJWT.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pinjaman/status/${id}`,
        { status_pinjaman: status },
      );
      return update.data;
    } catch (error) {
      console.log(error);
    }
  },
  deletePinjaman: async (id: string) => {
    try {
      const destroy = await axiosJWT.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pinjaman/${id}`,
      );
      return destroy.data;
    } catch (error) {
      console.log(error);
    }
  },
  pinjamanPegawaiById: (id: string) => {
    return get().pinjaman.find((pinjaman) => pinjaman.id_pinjaman === id);
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
  pinjamanData: {} as Pinjaman | undefined,
  setPinjamanData: (pinjamanData: Pinjaman | undefined) =>
    set({ pinjamanData: pinjamanData }),
}));
