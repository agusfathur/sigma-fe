/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axiosJWT from "@/lib/authJWT";
import {
  PermohonanIzin,
  PermohonanIzinCreate,
  PermohonanIzinUpdate,
} from "./permohonanIzin.types";

interface AbsensiState {
  permohonanIzin: PermohonanIzin[];
  fetchPermohonanIzin: () => Promise<void>;
  fetchPermohonanIzinByFilter: (fiter: string) => Promise<any>;
  fetchPermohonanIzinByUser: (userId: string) => Promise<any>;
  fetchPermohonanIzinByUserFilter: (
    userId: string,
    filter: string,
  ) => Promise<any>;
  insertPermohonanIzin: (permohonanIzin: PermohonanIzinCreate) => Promise<any>;
  updateStatusPermohonanIzin: (
    lemburStatus: string,
    id: string,
  ) => Promise<any>;
  updatePermohonanIzin: (Lembur: PermohonanIzinUpdate) => Promise<any>;
  deletePermohonanIzin: (id: string) => Promise<any>;
  permohonanIzinById: (id: string) => PermohonanIzin | undefined;
  isModalEditOpen: boolean;
  setIsModalEditOpen: (isModalEditOpen: boolean) => void;
  isModalDeleteOpen: boolean;
  setIsModalDeleteOpen: (isModalDeleteOpen: boolean) => void;
  isModalDetailOpen: boolean;
  setIsModalDetailOpen: (isModalKoordinatOpen: boolean) => void;
  isModalFilterOpen: boolean;
  setIsModalFilterOpen: (isModalFilterOpen: boolean) => void;
  permohonanIzinData: PermohonanIzin | undefined;
  setPermohonanIzinData: (permohonanIzin: PermohonanIzin | undefined) => void;
}

export const usePermohonanIzinStore = create<AbsensiState>((set, get) => ({
  permohonanIzin: [] as PermohonanIzin[],
  fetchPermohonanIzin: async () => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/permohonan-izin`,
      );

      set({ permohonanIzin: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  fetchPermohonanIzinByFilter: async (filter: string) => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/permohonan-izin?${filter}`,
      );

      console.log(res.data);

      set({ permohonanIzin: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  fetchPermohonanIzinByUser: async (userId: string) => {
    try {
      const pegawai = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pegawai/user/${userId}`,
      );

      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/permohonan-izin/pegawai${pegawai.data.data.id_pegawai}`,
      );

      console.log(res.data);

      set({ permohonanIzin: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },

  fetchPermohonanIzinByUserFilter: async (userId: string, filter: string) => {
    try {
      const pegawai = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pegawai/user/${userId}`,
      );

      const pegawaiId = pegawai.data.data.id_pegawai;

      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/permohonan-izin/pegawai/${pegawaiId}?${filter}`,
      );

      set({ permohonanIzin: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  insertPermohonanIzin: async (permohonanIzin: PermohonanIzinCreate) => {
    const formData = new FormData();
    formData.append("pegawai_id", permohonanIzin.pegawai_id);
    formData.append("jenis_mohon_izin", permohonanIzin.jenis_mohon_izin);
    formData.append("jenis_izin_id", permohonanIzin.jenis_izin_id);
    formData.append("bukti", permohonanIzin.bukti);
    formData.append(
      "tanggal_dari",
      permohonanIzin.tanggal_dari + "T00:00:00.000Z",
    );
    formData.append(
      "tanggal_sampai",
      permohonanIzin.tanggal_sampai + "T00:00:00.000Z",
    );
    formData.append("keterangan", permohonanIzin.keterangan);
    formData.append("status", permohonanIzin.status);
    try {
      const create = await axiosJWT.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/permohonan-izin`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return create.data;
    } catch (error) {
      console.log(error);
    }
  },
  updatePermohonanIzin: async (permohonanIzin: PermohonanIzinUpdate) => {
    try {
      const update = await axiosJWT.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/permohonan-izin/${permohonanIzin.id_permohonan_izin}`,
        permohonanIzin,
      );
      return update.data;
    } catch (error) {
      console.log(error);
    }
  },
  updateStatusPermohonanIzin: async (status: string, id: string) => {
    try {
      const update = await axiosJWT.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/permohonan-izin/status/${id}`,
        {
          status: status,
        },
      );
      return update.data;
    } catch (error) {
      console.log(error);
    }
  },
  deletePermohonanIzin: async (id: string) => {
    try {
      const destroy = await axiosJWT.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/permohonan-izin/${id}`,
      );
      return destroy.data;
    } catch (error) {
      console.log(error);
    }
  },
  permohonanIzinById: (id: string) => {
    return get().permohonanIzin.find(
      (permohonanIzin) => permohonanIzin.id_permohonan_izin === id,
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
  permohonanIzinData: {} as PermohonanIzin | undefined,
  setPermohonanIzinData: (permohonanIzinData: PermohonanIzin | undefined) =>
    set({ permohonanIzinData }),
}));
