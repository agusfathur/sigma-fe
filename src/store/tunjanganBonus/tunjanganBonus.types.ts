import { Pegawai } from "../pegawai/pegawai.types";

export type TunjanganBonus = {
  id_tunjangan_bonus: string;
  pegawai_id: string;
  tanggal: string;
  nominal: number;
  keterangan: string;
  pegawai: Pegawai;
};
export type TunjanganBonusCreate = {
  pegawai_id: string;
  tanggal: string;
  nominal: number;
  keterangan: string;
};
export type TunjanganBonusUpdate = {
  id_tunjangan_bonus: string;
  pegawai_id: string;
  tanggal: string;
  nominal: number;
  keterangan: string;
};
