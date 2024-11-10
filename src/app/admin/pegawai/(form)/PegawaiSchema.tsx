import { z } from "zod";

export const PegawaiCreateSchema = z.object({
  nama: z.string().min(1, "Name is required").max(255, "Name is too long"),
  username: z
    .string()
    .min(1, "Username is required")
    .max(20, "Username is too long"),
  password: z
    .string()
    .min(8, "Password minimum 8 characters")
    .max(20, "Password is too long"),
  role: z.string().min(1, "Role is required"),
  email: z.string().min(1, "Email is required").email("Email is invalid"),
  nomor_hp: z
    .string()
    .min(1, "Phone number is required")
    .max(255, "Phone number is too long"),
  foto: z.string().min(1, "Photo is required"),
  nik: z
    .string()
    .min(16, "NIK is required")
    .max(16, "NIK is too long, max 16 characters"),
  nip: z.string().max(16, "NIP is too long"),
  tempat_lahir: z
    .string()
    .min(1, "Place of birth is required")
    .max(200, "Place of birth is too long"),
  tanggal_lahir: z.string().min(1, "Date of birth is required"),
  tanggal_masuk: z.string().min(1, "Date of joining is required"),
  tanggal_pensiun: z.string().min(1, "Date of resignation is required"),
  gender: z
    .string()
    .min(1, "Gender is required")
    .max(100, "Gender is too long"),
  agama: z
    .string()
    .min(1, "Religion is required")
    .max(100, "Religion is too long"),
  alamat: z
    .string()
    .min(1, "Address is required")
    .max(255, "Address is too long"),
  tenaga: z.string().min(1, "Role is required").max(100, "Role is too long"),
  jabatan_id: z.string().min(1, "Position is required"),
  status_kepegawaian_id: z.string().min(1, "Status Kepegawaian is required"),
  riwayat_pendidikan: z
    .array(z.string())
    .min(1, "Education history is required"),
  status_pernikahan: z
    .string()
    .min(1, "Marital status is required")
    .max(100, "Marital status is too long"),
  jumlah_istri: z.number().min(0, "Number of brothers is required"),
  jumlah_anak: z.number().min(0, "Number of children is required"),
  nomor_rekening: z.string().optional(),
  status_pegawai: z
    .string()
    .min(1, "Status is required")
    .max(100, "Status is too long"),
  lokasi_id: z.string().min(1, "Location is required"),
  jabatan_fungsional_id: z.array(z.string()).optional(),
});

export const PegawaiUpdateSchema = z.object({
  id_pegawai: z.string().min(1, "ID Pegawai is required"),
  nama: z.string().min(1, "Name is required").max(255, "Name is too long"),
  username: z
    .string()
    .min(1, "Username is required")
    .max(20, "Username is too long"),
  password: z
    .string()
    .optional()
    .refine(
      (val) => {
        // Jika password tidak diisi (undefined/empty), lewati validasi
        if (!val) return true;
        // Jika password diisi, terapkan validasi
        return val.length >= 8 && val.length <= 20;
      },
      {
        message: "Password must be between 8-20 characters",
      },
    ),
  role: z.string().min(1, "Role is required"),
  email: z.string().min(1, "Email is required").email("Email is invalid"),
  nomor_hp: z
    .string()
    .min(1, "Phone number is required")
    .max(255, "Phone number is too long"),
  nik: z
    .string()
    .min(16, "NIK is required")
    .max(16, "NIK is too long, max 16 characters"),
  nip: z.string().max(16, "NIP is too long"),
  tempat_lahir: z
    .string()
    .min(1, "Place of birth is required")
    .max(200, "Place of birth is too long"),
  tanggal_lahir: z.string().min(1, "Date of birth is required"),
  tanggal_masuk: z.string().min(1, "Date of joining is required"),
  tanggal_pensiun: z.string().min(1, "Date of resignation is required"),
  gender: z
    .string()
    .min(1, "Gender is required")
    .max(100, "Gender is too long"),
  agama: z
    .string()
    .min(1, "Religion is required")
    .max(100, "Religion is too long"),
  alamat: z
    .string()
    .min(1, "Address is required")
    .max(255, "Address is too long"),
  tenaga: z.string().min(1, "Role is required").max(100, "Role is too long"),
  jabatan_id: z.string().min(1, "Position is required"),
  status_kepegawaian_id: z.string().min(1, "Status Kepegawaian is required"),
  riwayat_pendidikan: z
    .array(z.string())
    .min(1, "Education history is required"),
  status_pernikahan: z
    .string()
    .min(1, "Marital status is required")
    .max(100, "Marital status is too long"),
  jumlah_istri: z.number().min(0, "Number of brothers is required"),
  jumlah_anak: z.number().min(0, "Number of children is required"),
  nomor_rekening: z.string().optional(),
  status_pegawai: z
    .string()
    .min(1, "Status is required")
    .max(100, "Status is too long"),
  lokasi_id: z.string().min(1, "Location is required"),
  jabatan_fungsional_id: z.array(z.string()).optional(),
});
export type TypePegawaiCreate = z.infer<typeof PegawaiCreateSchema>;
export type TypePegawaiUpdate = z.infer<typeof PegawaiUpdateSchema>;
