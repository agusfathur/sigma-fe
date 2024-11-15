import { z } from "zod";

export const TunjangaTetapPegawaiCreateSchema = z.object({
  tunjangan_tetap_id: z.string(),
  jumlah: z.number().min(1, "Tahun is required"),
});

export const TunjangaTetapPegawaiUpdateSchema = z.object({
  id_tunjangan_tetap_pegawai: z.string(),
  tunjangan_tetap_id: z.string(),
  pegawai_id: z.string(),
  jumlah: z.number().min(1, "Jumlah is required"),
});

export type TypeTunjangaTetapPegawaiCreate = z.infer<
  typeof TunjangaTetapPegawaiCreateSchema
>;
export type TypeTunjangaTetapPegawaiUpdate = z.infer<
  typeof TunjangaTetapPegawaiUpdateSchema
>;
