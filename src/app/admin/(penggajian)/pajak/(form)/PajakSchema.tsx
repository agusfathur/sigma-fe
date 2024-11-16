import { z } from "zod";

export const PajakCreateSchema = z.object({
  nama: z.string().min(1, "Nama is required"),
  persen: z
    .number()
    .min(0, "Persentase tidak boleh negatif")
    .max(100, "Persentase tidak boleh lebih dari 100")
    .refine((val) => !isNaN(val), {
      message: "Harap masukkan angka yang valid",
    }),
});

export const PajakUpdateSchema = z.object({
  id_pajak: z.string(),
  nama: z.string().min(1, "Nama is required"),
  persen: z
    .number()
    .min(0, "Persentase tidak boleh negatif")
    .max(100, "Persentase tidak boleh lebih dari 100")
    .refine((val) => !isNaN(val), {
      message: "Harap masukkan angka yang valid",
    }),
});

export type TypePajakCreate = z.infer<typeof PajakCreateSchema>;
export type TypePajakUpdate = z.infer<typeof PajakUpdateSchema>;
