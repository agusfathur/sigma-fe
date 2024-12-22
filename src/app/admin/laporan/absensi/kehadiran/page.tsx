import { Metadata } from "next";
import RekapKehadiranTable from "./(table)/RekapKehadiranTable";

export const metadata: Metadata = {
  title: "Kehadiran Harian",
};

const LaporanKehadiran = () => {
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between space-y-2">
        <h1 className="text-lg font-bold tracking-tight">
          Laporan Kehadiran Harian
        </h1>
      </div>
      <RekapKehadiranTable />
    </div>
  );
};

export default LaporanKehadiran;
