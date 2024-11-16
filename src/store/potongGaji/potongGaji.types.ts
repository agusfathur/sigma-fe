import { Pegawai } from "../pegawai/pegawai.types";

export type PotongGaji = {
  id_potong_gaji: string;
  pegawai_id: string;
  nominal: number;
  tanggal: string;
  tahun: number;
  keterangan: string;
  pegawai: Pegawai;
};
export type PotongGajiCreate = {
  pegawai_id: string;
  nominal: number;
  tanggal: string;
  tahun: number;
  keterangan: string;
};
export type PotongGajiUpdate = {
  id_potong_gaji: string;
  pegawai_id: string;
  nominal: number;
  tanggal: string;
  tahun: number;
  keterangan: string;
};
