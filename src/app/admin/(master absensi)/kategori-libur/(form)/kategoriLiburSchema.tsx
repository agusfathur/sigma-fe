import { z } from "zod";

export const KategoriLiburCreateSchema = z.object({
  jenis: z.string().min(1, "Nama Kategori Libur harus diisi"),
});

export const KategoriLiburUpdateSchema = z.object({
  id_kategori_libur: z.string(),
  jenis: z.string().min(1, "Nama Kategori Libur harus diisi"),
});

export type TypeKategoriLiburCreate = z.infer<typeof KategoriLiburCreateSchema>;
export type TypeKategoriLiburUpdate = z.infer<typeof KategoriLiburUpdateSchema>;
