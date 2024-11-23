import { User } from "../user/user.types";

export type PembayaranGaji = {
  id_pembayaran_gaji: string;
  slip_gaji_id: string;
  user_id: string;
  metode_pembayaran: string;
  nomor_transaksi: string;
  tanggal_pembayaran: string;
  user: User;
};

export type PembayaranGajiCreate = {
  slip_gaji_id: string;
  user_id: string;
  metode_pembayaran: string;
  nomor_transaksi: string;
  tanggal_pembayaran: string;
};

export type PembayaranGajiUpdate = {
  id_pembayaran_gaji: string;
  slip_gaji_id: string;
  user_id: string;
  metode_pembayaran: string;
  nomor_transaksi: string;
  tanggal_pembayaran: string;
};
