import { z } from "zod";

export const JadwalKerjaCreateSchema = z
  .object({
    pegawai_id: z.array(z.string()).refine((ids) => ids.length > 0, {
      message: "Harus pilih minimal satu pegawai.",
    }),
    shift_id_senin: z.string().optional(),
    tanggal_senin: z.string().optional(),
    shift_id_selasa: z.string().optional(),
    tanggal_selasa: z.string().optional(),
    shift_id_rabu: z.string().optional(),
    tanggal_rabu: z.string().optional(),
    shift_id_kamis: z.string().optional(),
    tanggal_kamis: z.string().optional(),
    shift_id_jumat: z.string().optional(),
    tanggal_jumat: z.string().optional(),
    shift_id_sabtu: z.string().optional(),
    tanggal_sabtu: z.string().optional(),
    shift_id_minggu: z.string().optional(),
    tanggal_minggu: z.string().optional(),
  })
  .refine(
    (data) => {
      // senin
      if (!data.shift_id_senin && !data.tanggal_senin) return true;
      if (data.shift_id_senin && data.tanggal_senin) return true;
      return false;
    },
    {
      path: ["tanggal_senin"],
      message: "Harus disii, jika jam kerja disii",
    },
  )
  .refine(
    (data) => {
      // senin
      if (!data.shift_id_senin && !data.tanggal_senin) return true;
      if (data.shift_id_senin && data.tanggal_senin) return true;
      return false;
    },
    {
      path: ["shift_id_senin"],
      message: "Harus diisi, jika tanggal diisi",
    },
  )
  .refine(
    (data) => {
      // selasa
      if (!data.shift_id_selasa && !data.tanggal_selasa) return true;
      if (data.shift_id_selasa && data.tanggal_selasa) return true;
      return false;
    },
    {
      path: ["tanggal_selasa"],
      message: "Harus disii, jika jam kerja disii",
    },
  )
  .refine(
    (data) => {
      // selasa
      if (!data.shift_id_selasa && !data.tanggal_selasa) return true;
      if (data.shift_id_selasa && data.tanggal_selasa) return true;
      return false;
    },
    {
      path: ["shift_id_selasa"],
      message: "Harus diisi, jika tanggal diisi",
    },
  )
  .refine(
    (data) => {
      // rabu
      if (!data.shift_id_rabu && !data.tanggal_rabu) return true;
      if (data.shift_id_rabu && data.tanggal_rabu) return true;
      return false;
    },
    {
      path: ["tanggal_rabu"],
      message: "Harus disii, jika jam kerja disii",
    },
  )
  .refine(
    (data) => {
      // rabu
      if (!data.shift_id_rabu && !data.tanggal_rabu) return true;
      if (data.shift_id_rabu && data.tanggal_rabu) return true;
      return false;
    },
    {
      path: ["shift_id_rabu"],
      message: "Harus diisi, jika tanggal diisi",
    },
  )
  .refine(
    (data) => {
      // kamis
      if (!data.shift_id_kamis && !data.tanggal_kamis) return true;
      if (data.shift_id_kamis && data.tanggal_kamis) return true;
      return false;
    },
    {
      path: ["tanggal_kamis"],
      message: "Harus disii, jika jam kerja disii",
    },
  )
  .refine(
    (data) => {
      // kamis
      if (!data.shift_id_kamis && !data.tanggal_kamis) return true;
      if (data.shift_id_kamis && data.tanggal_kamis) return true;
      return false;
    },
    {
      path: ["shift_id_kamis"],
      message: "Harus diisi, jika tanggal diisi",
    },
  )
  .refine(
    (data) => {
      // jumat
      if (!data.shift_id_jumat && !data.tanggal_jumat) return true;
      if (data.shift_id_jumat && data.tanggal_jumat) return true;
      return false;
    },
    {
      path: ["tanggal_jumat"],
      message: "Harus disii, jika jam kerja disii",
    },
  )
  .refine(
    (data) => {
      // jumat
      if (!data.shift_id_jumat && !data.tanggal_jumat) return true;
      if (data.shift_id_jumat && data.tanggal_jumat) return true;
      return false;
    },
    {
      path: ["shift_id_jumat"],
      message: "Harus diisi, jika tanggal diisi",
    },
  )
  .refine(
    (data) => {
      // sabtu
      if (!data.shift_id_sabtu && !data.tanggal_sabtu) return true;
      if (data.shift_id_sabtu && data.tanggal_sabtu) return true;
      return false;
    },
    {
      path: ["tanggal_sabtu"],
      message: "Harus disii, jika jam kerja disii",
    },
  )
  .refine(
    (data) => {
      // sabtu
      if (!data.shift_id_sabtu && !data.tanggal_sabtu) return true;
      if (data.shift_id_sabtu && data.tanggal_sabtu) return true;
      return false;
    },
    {
      path: ["shift_id_sabtu"],
      message: "Harus diisi, jika tanggal diisi",
    },
  )
  .refine(
    (data) => {
      // minggu
      if (!data.shift_id_minggu && !data.tanggal_minggu) return true;
      if (data.shift_id_minggu && data.tanggal_minggu) return true;
      return false;
    },
    {
      path: ["tanggal_minggu"],
      message: "Harus disii, jika jam kerja disii",
    },
  )
  .refine(
    (data) => {
      // minggu
      if (!data.shift_id_minggu && !data.tanggal_minggu) return true;
      if (data.shift_id_minggu && data.tanggal_minggu) return true;
      return false;
    },
    {
      path: ["shift_id_kamis"],
      message: "Harus diisi, jika tanggal diisi",
    },
  );

export const JadwalKerjaUpdateSchema = z.object({
  id_jadwal: z.string(),
  pegawai_id: z.string(),
  shift_id: z.string(),
  tanggal: z.string(),
});

export type TypeJadwalKerjaCreate = z.infer<typeof JadwalKerjaCreateSchema>;
export type TypeJadwalKerjaUpdate = z.infer<typeof JadwalKerjaUpdateSchema>;
