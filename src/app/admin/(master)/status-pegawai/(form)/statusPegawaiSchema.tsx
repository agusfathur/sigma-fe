import { z } from "zod";

export const StatusPegawaiCreateSchema = z.object({
  nama: z.string().min(1, "Status Pegawai harus diisi"),
});

export const StatusPegawaiUpdateSchema = z.object({
  id_status_kepegawaian: z.string(),
  nama: z.string().min(1, "Status Pegawai harus diisi"),
});

export type TypeStatusPegawaiCreate = z.infer<typeof StatusPegawaiCreateSchema>;
export type TypeStatusPegawaiUpdate = z.infer<typeof StatusPegawaiUpdateSchema>;
