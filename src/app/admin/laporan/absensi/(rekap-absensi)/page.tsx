import { Metadata } from "next";
import RekapAbsensiTable from "./(table)/RekapAbsensiTable";

export const metadata: Metadata = {
  title: "Laporan Rekap Absensi",
  description: "Laporan Absensi",
};

const LaporanAbsensiPage = () => {
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between space-y-2">
        <h1 className="text-lg font-bold tracking-tight">
          Laporan Rekap Absensi
        </h1>
      </div>
      <RekapAbsensiTable />
    </div>
  );
};

export default LaporanAbsensiPage;
