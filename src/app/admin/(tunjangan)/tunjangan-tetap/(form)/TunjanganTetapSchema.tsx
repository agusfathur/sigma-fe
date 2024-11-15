import { z } from "zod";

export const TunjanganTetapCreateSchema = z.object({
  nama: z.string().min(1, "Nama is required"),
  nominal: z.number().min(1, "Nominal is required"),
});

export const TunjanganTetapUpdateSchema = z.object({
  id_tunjangan_tetap: z.string(),
  nama: z.string().min(1, "Nama is required"),
  nominal: z.number().min(1, "Nominal is required"),
});

export type TypeTunjanganTetapCreate = z.infer<
  typeof TunjanganTetapCreateSchema
>;
export type TypeTunjanganTetapUpdate = z.infer<
  typeof TunjanganTetapUpdateSchema
>;
