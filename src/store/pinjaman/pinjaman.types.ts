import { Pegawai } from "../pegawai/pegawai.types";

export type Pinjaman = {
  id_pinjaman: string;
  pegawai_id: string;
  nominal: number;
  tanggal: string;
  tahun: number;
  keterangan: string;
  status_pinjaman: string;
  pegawai: Pegawai;
};
export type PinjamanCreate = {
  pegawai_id: string;
  nominal: number;
  tanggal: string;
  tahun: number;
  keterangan: string;
  status_pinjaman: string;
};
export type PinjamanUpdate = {
  id_pinjaman: string;
  pegawai_id: string;
  nominal: number;
  tanggal: string;
  tahun: number;
  keterangan: string;
  status_pinjaman: string;
};
