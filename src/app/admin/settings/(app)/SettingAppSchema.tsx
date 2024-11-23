import { z } from "zod";

export const SettingAppUpdateSchema = z
  .object({
    id_app_setting: z.string(),
    nama_sistem: z.string(),
    singkatan_sistem: z.string(),
    deskripsi_sistem: z.string(),
    developer: z.string(),
    author: z.string(),
  })
  .partial();

export type TypeSettingAppUpdate = z.infer<typeof SettingAppUpdateSchema>;
