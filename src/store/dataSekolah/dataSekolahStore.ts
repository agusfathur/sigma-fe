/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axiosJWT from "@/lib/authJWT";
import { DataSekolah, DataSekolahUpdate } from "./dataSekolah.types";

interface DataSekolahState {
  dataSekolah: DataSekolah;
  fetchDataSekolah: () => Promise<void>;
  updateDataSekolah: (user: DataSekolahUpdate) => Promise<any>;
}

export const useDataSekolahStore = create<DataSekolahState>((set, get) => ({
  dataSekolah: {} as DataSekolah,
  fetchDataSekolah: async () => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/identitas-sekolah`,
      );

      set({ dataSekolah: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  updateDataSekolah: async (dataSekolah: DataSekolahUpdate) => {
    const formData = new FormData();
    formData.append("id_identitas_sekolah", dataSekolah.id_identitas_sekolah);
    formData.append("nama_sekolah", dataSekolah.nama_sekolah);
    formData.append("kementrian", dataSekolah.kementrian);
    formData.append("nsm", dataSekolah.nsm);
    formData.append("npsn", dataSekolah.npsn);
    formData.append("status", dataSekolah.status);
    formData.append("akreditasi", dataSekolah.akreditasi);
    formData.append("kota", dataSekolah.kota);
    formData.append("provinsi", dataSekolah.provinsi);
    formData.append("email", dataSekolah.email);
    formData.append("no_telp", dataSekolah.no_telp);
    formData.append("kode_pos", dataSekolah.kode_pos);
    formData.append("fax", dataSekolah.fax);
    if (dataSekolah.logo) formData.append("logo", dataSekolah.logo);
    formData.append("tanggal_berdiri", dataSekolah.tanggal_berdiri);
    formData.append("website", dataSekolah.website);
    formData.append("alamat", dataSekolah.alamat);
    formData.append("kepala_sekolah", dataSekolah.kepala_sekolah);

    const create = await axiosJWT.put(
      `${process.env.NEXT_PUBLIC_API_URL}/api/identitas-sekolah/${dataSekolah.id_identitas_sekolah}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return create.data;
  },
}));
