import { JamKerja } from "../jamKerja/jamKerja.types";
import { Pegawai } from "../pegawai/pegawai.types";

export type JadwalKerja = {
  id_jadwal: string;
  pegawai_id: string;
  pegawai: Pegawai;
  shift_id: string;
  shift_kerja: JamKerja;
  tanggal: string;
};

export type JadwalKerjaCreate = {
  pegawai_id: string;
  shift_id: string;
  tanggal: string;
};

export type JadwalKerjaUpdate = {
  id_jadwal: string;
  pegawai_id: string;
  shift_id: string;
  tanggal: string;
};
