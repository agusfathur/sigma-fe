import { z } from "zod";

export const PotongGajiCreateSchema = z.object({
  pegawai_id: z.string().min(1, "Pegawai is required"),
  nominal: z.number().min(1, "Nominal is required"),
  tanggal: z.string().min(1, "Date is required"),
  keterangan: z.string().min(1, "Keteragangan is required"),
});

export const PotongGajiUpdateSchema = z.object({
  id_potong_gaji: z.string(),
  pegawai_id: z.string().min(1, "Pegawai is required"),
  nominal: z.number().min(1, "Nominal is required"),
  tanggal: z.string().min(1, "Date is required"),
  keterangan: z.string().min(1, "Keteragangan is required"),
});

export type TypePotongGajiCreate = z.infer<typeof PotongGajiCreateSchema>;
export type TypePotongGajiUpdate = z.infer<typeof PotongGajiUpdateSchema>;
