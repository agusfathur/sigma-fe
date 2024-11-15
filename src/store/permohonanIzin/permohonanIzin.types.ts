import { JenisIzin } from "../jenisIzin/jenisIzin.types";
import { Pegawai } from "../pegawai/pegawai.types";

export type PermohonanIzin = {
  id_permohonan_izin: string;
  pegawai_id: string;
  jenis_mohon_izin: "izin" | "cuti";
  jenis_izin_id: string;
  bukti: string;
  format_bukti: "pdf" | "image";
  tanggal_dari: string;
  tanggal_sampai: string;
  total_hari: number;
  keterangan: string;
  status: "pending" | "proses" | "diterima" | "ditolak";
  pegawai: Pegawai;
  jenis_izin: JenisIzin;
};

export type PermohonanIzinCreate = {
  pegawai_id: string;
  jenis_mohon_izin: "izin" | "cuti";
  jenis_izin_id: string;
  bukti: string;
  tanggal_dari: string;
  tanggal_sampai: string;
  keterangan: string;
  status: "pending" | "proses" | "diterima" | "ditolak";
};

export type PermohonanIzinUpdate = {
  id_permohonan_izin: string;
  pegawai_id: string;
  jenis_mohon_izin: "izin" | "cuti";
  jenis_izin_id: string;
  bukti: string;
  tanggal_dari: string;
  tanggal_sampai: string;
  keterangan: string;
  status: "pending" | "proses" | "diterima" | "ditolak";
};
