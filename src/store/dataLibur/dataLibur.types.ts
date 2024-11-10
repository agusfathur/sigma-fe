import { KategoriLibur } from "../kategoriLibur/katagoriLibur.types";

export type DataLibur = {
  id_libur: string;
  kategori_libur_id: string;
  nama: string;
  tanggal: string;
  status_absen: string;
  kategori_libur: KategoriLibur;
};

export type DataLiburCreate = {
  kategori_libur_id: string;
  nama: string;
  tanggal: string;
  status_absen: string;
};
export type DataLiburUpdate = {
  id_libur: string;
  kategori_libur_id: string;
  nama: string;
  tanggal: string;
  status_absen: string;
};
