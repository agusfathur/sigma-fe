import { z } from "zod";

export const PinjamanCreateSchema = z.object({
  nominal: z.number().min(1, "Nominal is required"),
  tanggal: z.string().min(1, "Tanggal is required"),
  keterangan: z.string().min(1, "Keterangan is required"),
});

export const PinjamanUpdateSchema = z.object({
  nominal: z.number().min(1, "Nominal is required"),
  tanggal: z.string().min(1, "Tanggal is required"),
  keterangan: z.string().min(1, "Keterangan is required"),
});

export type TypePinjamanCreate = z.infer<typeof PinjamanCreateSchema>;
export type TypePinjamanUpdate = z.infer<typeof PinjamanUpdateSchema>;
