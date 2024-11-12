/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { Pegawai, PegawaiCreate, PegawaiUpdate } from "./pegawai.types";
import axiosJWT from "@/lib/authJWT";

interface PegawaiState {
  pegawai: Pegawai[];
  fetchPegawai: () => Promise<void>;
  insertPegawai: (pegawai: PegawaiCreate) => Promise<any>;
  updatePegawai: (pegawai: PegawaiUpdate) => Promise<any>;
  deletePegawai: (id: string) => Promise<any>;
  pegawaiById: (id: string) => Pegawai | undefined;
  isModalEditOpen: boolean;
  setIsModalEditOpen: (isModalEditOpen: boolean) => void;
  isModalDeleteOpen: boolean;
  setIsModalDeleteOpen: (isModalDeleteOpen: boolean) => void;
  isModalDetailOpen: boolean;
  setIsModalDetailOpen: (isModalDetailOpen: boolean) => void;
  pegawaiData: Pegawai | undefined;
  setPegawaiData: (pegawai: Pegawai | undefined) => void;
}

export const usePegawaiStore = create<PegawaiState>((set, get) => ({
  pegawai: [] as Pegawai[],
  fetchPegawai: async () => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pegawai`,
      );

      set({ pegawai: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  insertPegawai: async (pegawai: PegawaiCreate) => {
    console.log(pegawai);
    const formData = new FormData();
    formData.append("nama", pegawai.nama);
    formData.append("email", pegawai.email);
    formData.append("username", pegawai.username);
    formData.append("password", pegawai.password);
    formData.append("role", pegawai.role);
    formData.append("nomor_hp", pegawai.nomor_hp);
    formData.append("nik", pegawai.nik);
    formData.append("nip", pegawai.nip || "");
    formData.append("tempat_lahir", pegawai.tempat_lahir);
    formData.append("tanggal_lahir", pegawai.tanggal_lahir + "T00:00:00.000Z");
    formData.append("tanggal_masuk", pegawai.tanggal_masuk + "T00:00:00.000Z");
    formData.append(
      "tanggal_pensiun",
      pegawai.tanggal_pensiun + "T00:00:00.000Z",
    );
    formData.append("gender", pegawai.gender);
    formData.append("agama", pegawai.agama);
    formData.append("alamat", pegawai.alamat);
    formData.append("tenaga", pegawai.tenaga);
    formData.append("jabatan_id", pegawai.jabatan_id);
    formData.append("status_kepegawaian_id", pegawai.status_kepegawaian_id);
    const riwayatPendidikan = pegawai.riwayat_pendidikan || []; // Default to empty array if undefined

    for (let i = 0; i < riwayatPendidikan.length; i++) {
      formData.append("riwayat_pendidikan", riwayatPendidikan[i] || "");
    }
    formData.append("status_pernikahan", pegawai.status_pernikahan);
    formData.append("jumlah_istri", pegawai.jumlah_istri.toString());
    formData.append("jumlah_anak", pegawai.jumlah_anak.toString());
    formData.append("nomor_rekening", pegawai.nomor_rekening?.toString() || "");
    formData.append("status_pegawai", pegawai.status_pegawai);
    formData.append("lokasi_id", pegawai.lokasi_id);
    const jabatanFungsionalId = pegawai.jabatan_fungsional_id || []; // Default ke array kosong jika undefined atau null

    for (let i = 0; i < jabatanFungsionalId.length; i++) {
      formData.append("jabatan_fungsional_id", jabatanFungsionalId[i] || ""); // Tambahkan setiap elemen satu per satu
    }

    formData.append("foto", pegawai.foto);

    const create = await axiosJWT.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/pegawai`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return create.data;
  },
  updatePegawai: async (pegawai: PegawaiUpdate) => {
    console.log(pegawai);
    const formData = new FormData();
    if (pegawai.nama !== "") {
      formData.append("nama", pegawai.nama);
    }
    if (pegawai.email !== "") {
      formData.append("email", pegawai.email);
    }
    if (pegawai.username !== "") {
      formData.append("username", pegawai.username);
    }
    if (pegawai.password !== "") {
      formData.append("password", pegawai.password || "");
    }
    if (pegawai.role !== "") {
      formData.append("role", pegawai.role);
    }
    if (pegawai.nomor_hp) {
      formData.append("nomor_hp", pegawai.nomor_hp);
    }
    if (pegawai.nik !== "") {
      formData.append("nik", pegawai.nik || "");
    }
    formData.append("nip", pegawai.nip || "");
    formData.append("tempat_lahir", pegawai.tempat_lahir);
    formData.append(
      "tanggal_lahir",
      pegawai.tanggal_lahir + "T00:00:00.000Z" || "",
    );
    formData.append(
      "tanggal_masuk",
      pegawai.tanggal_masuk + "T00:00:00.000Z" || "",
    );
    formData.append(
      "tanggal_pensiun",
      pegawai.tanggal_pensiun + "T00:00:00.000Z" || "",
    );
    if (pegawai.gender) {
      formData.append("gender", pegawai.gender);
    }
    if (pegawai.agama) {
      formData.append("agama", pegawai.agama);
    }
    formData.append("alamat", pegawai.alamat);
    if (pegawai.tenaga) {
      formData.append("tenaga", pegawai.tenaga);
    }
    if (pegawai.jabatan_id) {
      formData.append("jabatan_id", pegawai.jabatan_id || "");
    }
    formData.append(
      "status_kepegawaian_id",
      pegawai.status_kepegawaian_id || "",
    );
    formData.append("nomor_rekening", pegawai.nomor_rekening?.toString() || "");
    const riwayatPendidikan = pegawai.riwayat_pendidikan || []; // Default to empty array if undefined

    for (let i = 0; i < riwayatPendidikan.length; i++) {
      formData.append("riwayat_pendidikan", riwayatPendidikan[i] || "");
    }
    const jabatanFungsionalId = pegawai.jabatan_fungsional_id || [];
    for (let i = 0; i < jabatanFungsionalId.length; i++) {
      formData.append("jabatan_fungsional_id", jabatanFungsionalId[i] || ""); // Tambahkan setiap elemen satu per satu
    }

    if (pegawai.foto) {
      formData.append("foto", pegawai.foto);
    }

    const update = await axiosJWT.put(
      `${process.env.NEXT_PUBLIC_API_URL}/api/pegawai/${pegawai.id_pegawai}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return update.data;
  },
  deletePegawai: async (id: string) => {
    try {
      const destroy = await axiosJWT.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pegawai/${id}`,
      );
      return destroy.data;
    } catch (error) {
      console.log(error);
    }
  },
  pegawaiById: (id: string) => {
    return get().pegawai.find((item) => item.id_pegawai === id);
  },
  isModalEditOpen: false,
  setIsModalEditOpen: (isModalEditOpen: boolean) => set({ isModalEditOpen }),
  isModalDeleteOpen: false,
  setIsModalDeleteOpen: (isModalDeleteOpen: boolean) =>
    set({ isModalDeleteOpen }),
  isModalDetailOpen: false,
  setIsModalDetailOpen: (isModalDetailOpen: boolean) =>
    set({ isModalDetailOpen }),
  pegawaiData: undefined,
  setPegawaiData: (pegawai: Pegawai | undefined) =>
    set({ pegawaiData: pegawai }),
}));
