import { z } from "zod";

export const DataLiburCreateSchema = z
  .object({
    kategori_libur_id: z.string(),
    nama: z.string().min(1, "Hari libur Pegawai harus diisi"),
    tanggal: z.string().min(1, "Hari libur harus diisi"),
    status_absen: z.string().min(1, "Status absen harus diisi"),
  })
  .refine(
    (val) => val.status_absen === "hadir" || val.status_absen === "tidak_hadir",
    {
      message: "Status absen harus hari libur atau tidak hadir",
      path: ["status_absen"],
    },
  );

export const DataLiburUpdateSchema = z
  .object({
    id_libur: z.string(),
    kategori_libur_id: z.string(),
    nama: z.string().min(1, "Hari libur Pegawai harus diisi"),
    tanggal: z.string().min(1, "Hari libur harus diisi"),
    status_absen: z.string().min(1, "Status absen harus diisi"),
  })
  .refine(
    (val) => val.status_absen === "hadir" || val.status_absen === "tidak_hadir",
    {
      message: "Status absen harus hari libur atau tidak hadir",
      path: ["status_absen"],
    },
  );

export type TypeDataLiburCreate = z.infer<typeof DataLiburCreateSchema>;
export type TypeDataLiburUpdate = z.infer<typeof DataLiburUpdateSchema>;
