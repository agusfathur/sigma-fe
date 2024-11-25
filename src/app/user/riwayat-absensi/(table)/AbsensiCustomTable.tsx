import { DataTable } from "@/components/table/data-table";
import { Absensi } from "@/store/absensi/absensi.types";
import { absensiColumns } from "./AbsensiColumns";
import { JadwalKerja } from "@/store/jadwalKerja/jadwalKerja.types";

interface AbsensiCustomTableProps {
  mappedAbsensis: Absensi[] | [];
  jadwals: JadwalKerja[];
  absensiColumns: typeof absensiColumns;
  setIsModalFilterOpen: () => void;
}
const AbsensiCustomTable = ({
  mappedAbsensis,
  jadwals,
  absensiColumns,
  setIsModalFilterOpen,
}: AbsensiCustomTableProps) => {
  const date = new Date();

  const thisDay = new Date().toISOString().split("T")[0] + "T00:00:00.000Z";
  const abs: Absensi[] = [];

  for (const jadwal of jadwals) {
    const foundAbsensi = mappedAbsensis.find(
      (absensi) => absensi.tanggal_absen === jadwal.tanggal,
    );

    if (foundAbsensi) {
      abs.push(foundAbsensi); // Tambahkan jika ditemukan
    } else {
      // Tambahkan entri kosong jika tidak ditemukan
      abs.push({
        id_absen: "",
        pegawai_id: "",
        tanggal_absen: jadwal.tanggal,
        waktu_masuk: "",
        koordinat_masuk: "",
        waktu_pulang: "",
        koordinat_pulang: "",
        foto_masuk: "",
        foto_pulang: "",
        status_absen: jadwal.tanggal <= thisDay ? "tidak_hadir" : "",
        is_lembur: false,
        jadwal_id: "",
        pegawai: null,
        jadwal_pegawai: null,
      });
    }
  }

  console.log(abs);
  console.log({ jadwals });
  return (
    <DataTable
      data={abs}
      columns={absensiColumns}
      onFilterChange={setIsModalFilterOpen}
      // onClickTambah={() => setIsModalCreateOpen(true)}
    />
  );
};

export default AbsensiCustomTable;
