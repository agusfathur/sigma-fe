//     pembayaran_gaji             pembayaran_gaji[]
//     slip_gaji_detai_pajak       slip_gaji_detail_pajak[]
//     slip_gaji_detai_potong_gaji slip_gaji_detail_potong_gaji[]
//     slip_gaji_detail_pinjaman   slip_gaji_detail_pinjaman[]
//     slip_gaji_detail_kehadiran  slip_gaji_detail_kehadiran[]
//     slip_gaji_detail_lembur     slip_gaji_detail_lembur[]
//     slip_gaji_detail_bonus      slip_gaji_detail_bonus[]
//     slip_gaji_detail_fungsional slip_gaji_detail_fungsional[]
//     slip_gaji_detail_gaji_pokok slip_gaji_detail_gaji_pokok[]
//     slip_gaji_detail_tetap      slip_gaji_detail_tetap[]
import { Pegawai } from "../pegawai/pegawai.types";
import { PembayaranGaji } from "../pembayaranGaji/pembayaranGajitypes";
import {
  SlipGajiDetailBonus,
  SlipGajiDetailGajiPokok,
  SlipGajiDetailJabatanFungsional,
  SlipGajiDetailKehadiran,
  SlipGajiDetailLembur,
  SlipGajiDetailPajak,
  SlipGajiDetailPinjaman,
  SlipGajiDetailPotongGaji,
  SlipGajiDetailTunjanganTetap,
} from "./slipGajiDetail.types";

export type SlipGaji = {
  id_slip_gaji: string;
  pegawai_id: string;
  gaji_pokok: number;
  tunjangan_tetap: number;
  tunjangan_kehadiran: number;
  tunjangan_fungsional: number;
  tunjangan_bonus: number;
  tunjangan_lembur: number;
  pajak: number;
  pinjaman: number;
  potong_gaji: number;
  total_gaji_kotor: number;
  total_gaji_bersih: number;
  status_pembayaran: string;
  tanggal: string;
  bulan: number;
  tahun: number;
  pegawai: Pegawai;
  pembayaran_gaji: PembayaranGaji[];
  slip_gaji_detail_pajak: SlipGajiDetailPajak[];
  slip_gaji_detail_potong_gaji: SlipGajiDetailPotongGaji[];
  slip_gaji_detail_pinjaman: SlipGajiDetailPinjaman[];
  slip_gaji_detail_kehadiran: SlipGajiDetailKehadiran[];
  slip_gaji_detail_lembur: SlipGajiDetailLembur[];
  slip_gaji_detail_bonus: SlipGajiDetailBonus[];
  slip_gaji_detail_fungsional: SlipGajiDetailJabatanFungsional[];
  slip_gaji_detail_gaji_pokok: SlipGajiDetailGajiPokok[];
  slip_gaji_detail_tetap: SlipGajiDetailTunjanganTetap[];
};

export type SlipGajiCreate = {
  bulan: number;
  tahun: number;
};
export type SlipGajiUpdate = {
  bulan: number;
  tahun: number;
};
