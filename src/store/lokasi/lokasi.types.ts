export type Lokasi = {
  id_lokasi: string;
  nama: string;
  kode: string;
  alamat: string;
  koordinat: string;
  luas_lokasi: number;
};

export type LokasiCreate = {
  nama: string;
  alamat: string;
  koordinat: string;
  luas_lokasi: number;
};
