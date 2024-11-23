import { z } from "zod";

export const SekolahUpdateSchema = z
  .object({
    id_identitas_sekolah: z.string(),
    nama_sekolah: z.string(),
    kementrian: z.string(),
    nsm: z.string(),
    npsn: z.string(),
    status: z.string(),
    akreditasi: z.string(),
    kota: z.string(),
    provinsi: z.string(),
    email: z.string(),
    no_telp: z.string(),
    kode_pos: z.string(),
    fax: z.string(),
    tanggal_berdiri: z.string(),
    website: z.string(),
    alamat: z.string(),
    kepala_sekolah: z.string(),
  })
  .partial();

export type TypeSekolahUpdate = z.infer<typeof SekolahUpdateSchema>;
