//    id_shift_kerja String          @id @default(cuid()) @db.VarChar(255)
//     shift_kerja    JenisShiftKerja
//     waktu_masuk    String          @db.VarChar(255)
//     waktu_pulang   String          @db.VarChar(255)
//     durasi_kerja   Int
//     keterangan     String // Shift pagi, siang, dsb.

export type JamKerja = {
  id_shift_kerja: string;
  shift_kerja: string;
  waktu_masuk: string;
  waktu_pulang: string;
  durasi_kerja: number;
  keterangan: string;
};
export type JamKerjaCreate = Omit<JamKerja, "id_shift_kerja">;
