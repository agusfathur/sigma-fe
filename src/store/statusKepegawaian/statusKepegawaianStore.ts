import { create } from "zustand";
import axiosJWT from "@/lib/authJWT";
import {
  StatusKepegawaian,
  StatusKepegawaianCreate,
} from "./statusKepegawaian.types";

interface StatusKepegawaianState {
  statusKepegawaian: StatusKepegawaian[];
  fetchStatusKepegawaian: () => Promise<void>;
  insertStatusKepegawaian: (
    statusKepegawaian: StatusKepegawaianCreate,
  ) => Promise<void>;
  updateStatusKepegawaian: (
    statusKepegawaian: StatusKepegawaian,
  ) => Promise<void>;
  deleteStatusKepegawaian: (id: string) => Promise<void>;
  statusKepegawaianById: (id: string) => StatusKepegawaian | undefined;
  isModalEditOpen: boolean;
  setIsModalEditOpen: (isModalEditOpen: boolean) => void;
  isModalDeleteOpen: boolean;
  setIsModalDeleteOpen: (isModalDeleteOpen: boolean) => void;
  statusKepegawaianData: StatusKepegawaian | undefined;
  setStatusKepegawaianData: (
    statusKepegawaianData: StatusKepegawaian | undefined,
  ) => void;
}

export const useStatusKepegawaianStore = create<StatusKepegawaianState>(
  (set, get) => ({
    statusKepegawaian: [],
    fetchStatusKepegawaian: async () => {
      try {
        const res = await axiosJWT.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/status-kepegawaian`,
        );
        set({ statusKepegawaian: res.data.data });
      } catch (error) {
        console.log(error);
      }
    },
    insertStatusKepegawaian: async (
      statusKepegawaian: StatusKepegawaianCreate,
    ) => {
      try {
        await axiosJWT.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/status-kepegawaian`,
          statusKepegawaian,
        );
        get().fetchStatusKepegawaian();
      } catch (error) {
        console.log(error);
      }
    },
    updateStatusKepegawaian: async (statusKepegawaian: StatusKepegawaian) => {
      try {
        await axiosJWT.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/status-kepegawaian/${statusKepegawaian.id_status_kepegawaian}`,
          {
            nama: statusKepegawaian.nama,
          },
        );
        get().fetchStatusKepegawaian();
      } catch (error) {
        console.log(error);
      }
    },
    deleteStatusKepegawaian: async (id: string) => {
      try {
        await axiosJWT.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/api/status-kepegawaian/${id}`,
        );
        get().fetchStatusKepegawaian();
      } catch (error) {
        console.log(error);
      }
    },
    statusKepegawaianById: (id: string) => {
      return get().statusKepegawaian.find(
        (statusKepegawaian) => statusKepegawaian.id_status_kepegawaian === id,
      );
    },
    isModalEditOpen: false,
    setIsModalEditOpen: (isModalEditOpen: boolean) => set({ isModalEditOpen }),
    isModalDeleteOpen: false,
    setIsModalDeleteOpen: (isModalDeleteOpen: boolean) =>
      set({ isModalDeleteOpen }),
    statusKepegawaianData: undefined,
    setStatusKepegawaianData: (
      statusKepegawaianData: StatusKepegawaian | undefined,
    ) => set({ statusKepegawaianData }),
  }),
);
