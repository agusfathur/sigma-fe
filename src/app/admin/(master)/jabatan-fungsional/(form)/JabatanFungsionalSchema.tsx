import { z } from "zod";

export const JabatanFungsionalCreateSchema = z.object({
  nama: z.string().min(1, "Jabatan harus diisi"),
  tunjangan: z.number().min(1, "Tunjangan harus diisi"),
});

export const JabatanFungsionalUpdateSchema = z.object({
  id_jabatan_fungsional: z.string(),
  nama: z.string().min(1, "Jabatan harus diisi"),
  tunjangan: z.number().min(1, "Tunjangan harus diisi"),
});

export type TypeJabatanFungsionalCreate = z.infer<
  typeof JabatanFungsionalCreateSchema
>;
export type TypeJabatanFungsionalUpdate = z.infer<
  typeof JabatanFungsionalUpdateSchema
>;
