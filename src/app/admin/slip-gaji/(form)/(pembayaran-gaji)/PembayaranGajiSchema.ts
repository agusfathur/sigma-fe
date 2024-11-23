import { z } from "zod";

export const PembayaranGajiUpdateSchema = z.object({
  id_pembayaran_gaji: z.string(),
  slip_gaji_id: z.string(),
  user_id: z.string(),
  metode_pembayaran: z.string().min(1, "Metode pembayaran is required"),
  tanggal_pembayaran: z.string().min(1, "Tanggal pembayaran is required"),
  nomor_transaksi: z.string(),
});

export type TypePembayaranGajiUpdate = z.infer<
  typeof PembayaranGajiUpdateSchema
>;
