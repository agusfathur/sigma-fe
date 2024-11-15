import { z } from "zod";

export const TunjanganKehadiranCreateSchema = z.object({
  nominal: z.number().min(1, "Nominal is required"),
  tahun: z.number().min(1, "Tahun is required"),
});

export const TunjanganKehadiranUpdateSchema = z.object({
  id_tunjangan_kehadiran: z.string(),
  nominal: z.number().min(1, "Nominal is required"),
  tahun: z.number().min(1, "Tahun is required"),
});

export type TypeTunjanganKehadiranCreate = z.infer<
  typeof TunjanganKehadiranCreateSchema
>;
export type TypeTunjanganKehadiranUpdate = z.infer<
  typeof TunjanganKehadiranUpdateSchema
>;
