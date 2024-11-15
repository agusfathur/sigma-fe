import { z } from "zod";

export const TunjanganBonusCreateSchema = z.object({
  pegawai_id: z.string().min(1, "Pegawai is required"),
  nominal: z.number().min(1, "Nominal is required"),
  tanggal: z.string().min(1, "Date is required"),
  keterangan: z.string().min(1, "Keteragangan is required"),
});

export const TunjanganBonusUpdateSchema = z.object({
  id_tunjangan_bonus: z.string(),
  pegawai_id: z.string().min(1, "Pegawai is required"),
  nominal: z.number().min(1, "Nominal is required"),
  tanggal: z.string().min(1, "Date is required"),
  keterangan: z.string().min(1, "Keteragangan is required"),
});

export type TypeTunjanganBonusCreate = z.infer<
  typeof TunjanganBonusCreateSchema
>;
export type TypeTunjanganBonusUpdate = z.infer<
  typeof TunjanganBonusUpdateSchema
>;
