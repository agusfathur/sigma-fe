export type DataSekolah = {
  id_identitas_sekolah: string;
  nama_sekolah: string;
  kementrian: string;
  nsm: string;
  npsn: string;
  status: string;
  akreditasi: string;
  kota: string;
  provinsi: string;
  email: string;
  no_telp: string;
  kode_pos: string;
  fax: string;
  logo: string;
  tanggal_berdiri: string;
  website: string;
  alamat: string;
  kepala_sekolah: string;
};

export type DataSekolahUpdate = {
  id_identitas_sekolah: string;
  nama_sekolah: string;
  kementrian: string;
  nsm: string;
  npsn: string;
  status: string;
  akreditasi: string;
  kota: string;
  provinsi: string;
  email: string;
  no_telp: string;
  kode_pos: string;
  fax: string;
  logo?: File;
  tanggal_berdiri: string;
  website: string;
  alamat: string;
  kepala_sekolah: string;
};
