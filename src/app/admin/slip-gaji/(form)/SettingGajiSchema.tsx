import { z } from "zod";

export const SettingGajiUpdateSchema = z.object({
  id_setting_gaji: z.string(),
  gaji_pokok: z.boolean(),
  tunjangan_tetap: z.boolean(),
  tunjangan_fungsional: z.boolean(),
  tunjangan_bonus: z.boolean(),
  tunjangan_lembur: z.boolean(),
  pinjaman: z.boolean(),
  potong_gaji: z.boolean(),
  tunjangan_kehadiran_id: z.string(),
  pajak_id: z.array(z.string()),
});

export type TypeSettingGajiUpdate = z.infer<typeof SettingGajiUpdateSchema>;
