import { z } from "zod";

export const JamKerjaCreateSchema = z.object({
  shift_kerja: z
    .string()
    .min(1, "Shift Kerja harus diisi")
    .refine((val) => val === "masa_mbkm" || val === "libur_mbkm", {
      message: "Shift Kerja harus masa MBKM atau Non MBKM",
    }),
  waktu_masuk: z.string().min(1, "Waktu Masuk harus diisi"),
  waktu_pulang: z.string().min(1, "Waktu Pulang harus diisi"),
  durasi_kerja: z.number().min(1, "Durasi Kerja harus diisi"),
  keterangan: z.string().min(1, "Keterangan harus diisi"),
});

export const JamKerjaUpdateSchema = z
  .object({
    id_shift_kerja: z.string(),
    shift_kerja: z.string().min(1, "Shift Kerja harus diisi"),
    waktu_masuk: z.string().min(1, "Waktu Masuk harus diisi"),
    waktu_pulang: z.string().min(1, "Waktu Pulang harus diisi"),
    durasi_kerja: z.number().min(1, "Durasi Kerja harus diisi"),
    keterangan: z.string().min(1, "Keterangan harus diisi"),
  })
  .refine(
    (val) =>
      val.shift_kerja === "masa_mbkm" || val.shift_kerja === "libur_mbkm",
    {
      message: "Shift Kerja harus masa MBKM atau Non MBKM",
      path: ["shift_kerja"],
    },
  );

export type TypeJamKerjaCreate = z.infer<typeof JamKerjaCreateSchema>;
export type TypeJamKerjaUpdate = z.infer<typeof JamKerjaUpdateSchema>;
