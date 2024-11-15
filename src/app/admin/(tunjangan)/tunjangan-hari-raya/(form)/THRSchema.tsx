import { z } from "zod";

export const THRCreateSchema = z.object({
  pegawai_id: z.string().min(1, "Pegawai is required"),
  nominal: z.number().min(1, "Nominal is required"),
  tahun: z.number().min(1, "Tahun is required"),
  tanggal_pembayaran: z.string().min(1, "Date is required"),
  metode_pembayaran: z.string().min(1, "Metode Pembayaran is required"),
});

export const THRUpdateSchema = z.object({
  id_thr: z.string(),
  pegawai_id: z.string().min(1, "Pegawai is required"),
  nominal: z.number().min(1, "Nominal is required"),
  tahun: z.number().min(1, "Tahun is required"),
  tanggal_pembayaran: z.string().min(1, "Date is required"),
  metode_pembayaran: z.string().min(1, "Metode Pembayaran is required"),
});

export type TypeTHRCreate = z.infer<typeof THRCreateSchema>;
export type TypeTHRUpdate = z.infer<typeof THRUpdateSchema>;
