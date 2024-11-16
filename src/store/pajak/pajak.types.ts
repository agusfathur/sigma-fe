export type Pajak = {
  id_pajak: string;
  nama: string;
  persen: number;
};

export type PajakCreate = {
  nama: string;
  persen: number;
};

export type PajakUpdate = {
  id_pajak: string;
  nama: string;
  persen: number;
};
