export type Jabatan = {
  id_jabatan: string;
  nama: string;
  gaji: number;
  createdAt?: string;
  updatedAt?: string;
};

export type JabatanCreate = {
  nama: string;
  gaji: number;
};
