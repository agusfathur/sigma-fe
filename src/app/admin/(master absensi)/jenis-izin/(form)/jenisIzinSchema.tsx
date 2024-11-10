import { z } from "zod";

export const JenisIzinCreateSchema = z.object({
  nama: z.string().min(1, "Nama Jenis Izin harus diisi"),
  jenis: z
    .string()
    .min(1, "Jenis Izin harus diisi")
    .refine((val) => val === "cuti" || val === "izin", {
      message: "Jenis Izin harus cuti atau izin",
    }),
  jatah: z.number().min(0, "Jatah harus diisi"),
  tahun: z.number().min(1, "Tahun harus diisi"),
});

export const JenisIzinUpdateSchema = z.object({
  id_jenis_izin: z.string(),
  nama: z.string().min(1, "Nama Jenis Izin harus diisi"),
  jenis: z
    .string()
    .min(1, "Jenis Izin harus diisi")
    .refine((val) => val === "cuti" || val === "izin", {
      message: "Jenis Izin harus cuti atau izin",
    }),
  jatah: z.number().min(0, "Jatah harus diisi"),
  tahun: z.number().min(1, "Tahun harus diisi"),
});

export type TypeJenisIzinCreate = z.infer<typeof JenisIzinCreateSchema>;
export type TypeJenisIzinUpdate = z.infer<typeof JenisIzinUpdateSchema>;
