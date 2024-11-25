import { z } from "zod";

export const IzinCreateSchema = z.object({
  jenis_mohon_izin: z.string().min(1, "Jenis Mohon Izin is required"),
  jenis_izin_id: z.string().min(1, "Jenis Izin is required"),
  tanggal_dari: z.string().min(1, "Date is required"),
  tanggal_sampai: z.string().min(1, "Date is required"),
  bukti: z.string().min(1, "Bukti is required"),
  keterangan: z.string().min(1, "Keteragangan is required"),
});

export type TypeIzinCreateSchemaCreate = z.infer<typeof IzinCreateSchema>;
