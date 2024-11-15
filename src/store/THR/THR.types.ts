import { Pegawai } from "../pegawai/pegawai.types";

export type THR = {
  id_thr: string;
  pegawai_id: string;
  nominal: number;
  tahun: number;
  tanggal_pembayaran: string;
  metode_pembayaran: string;
  pegawai: Pegawai;
};

export type THRCreate = {
  pegawai_id: string;
  nominal: number;
  tahun: number;
  tanggal_pembayaran: string;
  metode_pembayaran: string;
};

export type THRUpdate = {
  id_thr: string;
  pegawai_id: string;
  nominal: number;
  tahun: number;
  tanggal_pembayaran: string;
  metode_pembayaran: string;
};
