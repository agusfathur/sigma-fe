import { JadwalKerja } from "../jadwalKerja/jadwalKerja.types";
import { Pegawai } from "../pegawai/pegawai.types";

export type Absensi = {
  id_absen: string;
  pegawai_id: string;
  tanggal_absen: string;
  waktu_masuk: string;
  koordinat_masuk: string;
  waktu_pulang: string;
  koordinat_pulang: string;
  foto_masuk: string;
  foto_pulang: string;
  status_absen: string;
  is_lembur: boolean;
  jadwal_id: string;
  pegawai: Pegawai | null;
  jadwal_pegawai: JadwalKerja | null;
};

export type CreateAbsensiMasuk = {
  pegawai_id: string;
  waktu_pulang: string;
  koordinat_pulang: string;
  foto_pulang: string;
  is_lembur: boolean;
  jadwal_id: string;
};
export type CreateAbsensiPulang = {
  pegawai_id: string;
  waktu_masuk: string;
  koordinat_masuk: string;
  foto_masuk: string;
  is_lembur: boolean;
  jadwal_id: string;
};
