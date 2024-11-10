import { z } from "zod";

export const LokasiCreateSchema = z.object({
  nama: z.string().min(1, "Tempat Lokasi harus diisi"),
  alamat: z.string().min(1, "Alamat harus diisi"),
  luas_lokasi: z.number().min(1, "Luas lokasi harus diisi"),
  koordinat: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
});

export const LokasiUpdateSchema = z.object({
  id_lokasi: z.string(),
  nama: z.string().min(1, "Tempat Lokasi harus diisi"),
  kode: z.string(),
  alamat: z.string().min(1, "Alamat harus diisi"),
  luas_lokasi: z.number().min(1, "Luas lokasi harus diisi"),
  koordinat: z.object({
    latitude: z.number().min(-100, "Latitude harus diisi"),
    longitude: z.number().min(1, "Longitude harus diisi"),
  }),
});

export type TypeLokasiCreate = z.infer<typeof LokasiCreateSchema>;
export type TypeLokasiUpdate = z.infer<typeof LokasiUpdateSchema>;
