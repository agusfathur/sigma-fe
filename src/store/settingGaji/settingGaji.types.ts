import { Pajak } from "../pajak/pajak.types";

export type SettingGaji = {
  id_setting_gaji: string;
  gaji_pokok: boolean;
  tunjangan_tetap: boolean;
  tunjangan_fungsional: boolean;
  tunjangan_bonus: boolean;
  tunjangan_lembur: boolean;
  pinjaman: boolean;
  potong_gaji: boolean;
  tunjangan_kehadiran_id: string;
  pajak_id?: string[];
  pajak: Pajak[];
};
export type SettingGajiUpdate = {
  id_setting_gaji: string;
  gaji_pokok: boolean;
  tunjangan_tetap: boolean;
  tunjangan_fungsional: boolean;
  tunjangan_bonus: boolean;
  tunjangan_lembur: boolean;
  pinjaman: boolean;
  potong_gaji: boolean;
  tunjangan_kehadiran_id: string;
  pajak_id?: string[];
};
