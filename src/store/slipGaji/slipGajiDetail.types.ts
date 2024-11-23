import { Jabatan } from "../jabatan/jabatan.types";
import { JabatanFungsional } from "../jabatanFungsional/jabatanFungsional.types";
import { Lembur } from "../lembur/lembur.types";
import { Pajak } from "../pajak/pajak.types";
import { Pinjaman } from "../pinjaman/pinjaman.types";
import { PotongGaji } from "../potongGaji/potongGaji.types";
import { TunjanganBonus } from "../tunjanganBonus/tunjanganBonus.types";
import { TunjanganTetap } from "../tunjanganTetap/tunjanganTetap.types";

export type SlipGajiDetailGajiPokok = {
  id_slip_gaji_detail_gaji_pokok: string;
  slip_gaji_id: string;
  jabatan_id: string;
  total_gaji_pokok: number;
  tanggal: string;
  bulan: number;
  tahun: number;
  jabatan: Jabatan;
};

export type SlipGajiDetailJabatanFungsional = {
  id_slip_gaji_detail_fungsional: string;
  slip_gaji_id: string;
  jabatan__fungsional_id: string;
  total_fungsional: number;
  tanggal: string;
  bulan: number;
  tahun: number;
  jabatan_fungsional: JabatanFungsional;
};

export type SlipGajiDetailTunjanganTetap = {
  id_slip_gaji_detail_tetap: string;
  slip_gaji_id: string;
  tunjangan_tetap_id: string;
  tunjangan_tetap_pegawai_id: string;
  total_tetap: number;
  tanggal: string;
  bulan: number;
  tahun: number;
  tunjangan_tetap: TunjanganTetap;
};

export type SlipGajiDetailKehadiran = {
  id_slip_gaji_detail_kehadiran: string;
  slip_gaji_id: string;
  tunjangan_kehadiran_id: string;
  total_kehadiran: number;
  upah_per_hadir: number;
  total: number;
  tanggal: string;
  bulan: number;
  tahun: number;
};

export type SlipGajiDetailLembur = {
  id_slip_gaji_detail_lembur: string;
  slip_gaji_id: string;
  absen_id: string;
  lembur_id: string;
  total_upah: number;
  tanggal: string;
  bulan: number;
  tahun: number;
  lembur: Lembur;
};

export type SlipGajiDetailBonus = {
  id_slip_gaji_detail_bonus: string;
  slip_gaji_id: string;
  bonus_id: string;
  total_bonus: number;
  tanggal: string;
  bulan: number;
  tahun: number;
  tunjangan_bonus: TunjanganBonus;
};

export type SlipGajiDetailPotongGaji = {
  id_slip_gaji_detail_potong_gaji: string;
  slip_gaji_id: string;
  potong_gaji_id: string;
  total_potong_gaji: number;
  tanggal: string;
  bulan: number;
  tahun: number;
  potong_gaji: PotongGaji;
};

export type SlipGajiDetailPinjaman = {
  id_slip_gaji_detail_pinjaman: string;
  slip_gaji_id: string;
  pinjaman_id: string;
  total_pinjaman: number;
  tanggal: string;
  bulan: number;
  tahun: number;
  pinjaman: Pinjaman;
};

export type SlipGajiDetailPajak = {
  id_slip_gaji_detail_pajak: string;
  slip_gaji_id: string;
  pajak_id: string;
  total_pajak_persen: number;
  total_pajak_rupiah: number;
  tanggal: string;
  bulan: number;
  tahun: number;
  pajak: Pajak;
};
