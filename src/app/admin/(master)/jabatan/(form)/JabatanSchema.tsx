import { z } from "zod";

export const JabatanCreateSchema = z.object({
  nama: z.string().min(1, "Jabatan harus diisi"),
  gaji: z.number().min(1, "Gaji harus diisi"),
});

export const JabatanUpdateSchema = z.object({
  id_jabatan: z.string(),
  nama: z.string().min(1, "Jabatan harus diisi"),
  gaji: z.number().min(1, "Gaji harus diisi"),
});

export type TypeJabatanCreate = z.infer<typeof JabatanCreateSchema>;
export type TypeJabatanUpdate = z.infer<typeof JabatanUpdateSchema>;
