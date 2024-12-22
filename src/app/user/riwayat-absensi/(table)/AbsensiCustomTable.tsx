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

  const countStatusAbsen = (status: string) => {
    return abs.filter((absen) => absen.status_absen === status).length;
  };

  // Contoh penggunaan:
  const hadirCount = countStatusAbsen("hadir");
  const izinCount = countStatusAbsen("izin");
  const countCuti = countStatusAbsen("cuti");
  const terlambatCount = countStatusAbsen("terlambat");
  const tidakHadirCount = countStatusAbsen("tidak_hadir");
  return (
    <>
      <div className="flex items-center space-x-1 md:space-x-2">
        <h4 className="text-sm font-bold">Total</h4>
        <p className="rounded-xl bg-green-100 px-2.5 py-1 text-sm font-medium text-green-950">
          Hadir : <span className="font-bold">{hadirCount}</span>
        </p>
        <p className="rounded-xl bg-red-100 px-2.5 py-1 text-sm font-medium text-red-950">
          Tidak Hadir : <span className="font-bold">{tidakHadirCount}</span>
        </p>
        <p className="rounded-xl bg-yellow-100 px-2.5 py-1 text-sm font-medium text-yellow-950">
          Terlambat : <span className="font-bold">{terlambatCount}</span>
        </p>
        <p className="rounded-xl bg-blue-100 px-2.5 py-1 text-sm font-medium text-blue-950">
          Izin : <span className="font-bold">{izinCount}</span>
        </p>
        <p className="rounded-xl bg-cyan-100 px-2.5 py-1 text-sm font-medium text-cyan-950">
          Cuti : <span className="font-bold">{countCuti}</span>
        </p>
      </div>
      <DataTable
        data={abs}
        columns={absensiColumns}
        onFilterChange={setIsModalFilterOpen}
        // onClickTambah={() => setIsModalCreateOpen(true)}
      />
    </>
  );
};

export default AbsensiCustomTable;
