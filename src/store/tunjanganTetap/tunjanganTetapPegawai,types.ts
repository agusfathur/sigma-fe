import { Pegawai } from "../pegawai/pegawai.types";
import { TunjanganTetap } from "./tunjanganTetap.types";

export type TunjanganTetapPegawai = {
  id_tunjangan_tetap_pegawai: string;
  pegawai_id: string;
  tunjangan_tetap_id: string;
  jumlah: number;
  pegawai: Pegawai;
  tunjangan_tetap: TunjanganTetap;
};
export type TunjanganTetapPegawaiCreate = {
  jumlah: number;
  pegawai_id: string;
  tunjangan_tetap_id: string;
};
export type TunjanganTetapPegawaiUpdate = {
  id_tunjangan_tetap_pegawai: string;
  jumlah: number;
  pegawai_id: string;
  tunjangan_tetap_id: string;
};
