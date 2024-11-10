export type JenisIzin = {
  id_jenis_izin: string;
  nama: string;
  jenis: "cuti" | "izin";
  jatah: number;
  tahun: number;
};
export type JenisIzinCreate = {
  nama: string;
  jenis: "cuti" | "izin";
  jatah: number;
  tahun: number;
};
