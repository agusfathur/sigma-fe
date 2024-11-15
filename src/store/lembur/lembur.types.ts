import { JadwalKerja } from "../jadwalKerja/jadwalKerja.types";
import { Pegawai } from "../pegawai/pegawai.types";

export type Lembur = {
  id_lembur: string;
  tanggal: string;
  absensi_id: string;
  pegawai_id: string;
  jumlah_upah: number;
  total_upah: number;
  total_jam: number;
  rincian: string;
  status_lembur: "pending" | "proses" | "diterima" | "ditolak";
  absensi: AbsensiDetail;
};

export type AbsensiDetail = {
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
  pegawai: Pegawai;
  jadwal_pegawai: JadwalKerja;
};

export type LemburCreate = {
  tanggal: string;
  absensi_id: string;
  pegawai_id: string;
  jumlah_upah: number;
  total_upah: number;
  total_jam: number;
  rincian: string;
  status_lembur: "pending" | "proses" | "diterima" | "ditolak";
};

export type LemburUpdate = {
  id_lembur: string;
  tanggal: string;
  absensi_id: string;
  pegawai_id: string;
  jumlah_upah: number;
  total_upah: number;
  total_jam: number;
  rincian: string;
  status_lembur: "pending" | "proses" | "diterima" | "ditolak";
};
