import { Metadata } from "next";
import LaporanIzinCutiTable from "./(table)/LaporanIzinCutiTable";

export const metadata: Metadata = {
  title: "Laporan Izin Cuti",
};

const LaporanIzinCuti = () => {
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between space-y-2">
        <h1 className="text-lg font-bold tracking-tight">
          Laporan Izin & Cuti
        </h1>
      </div>
      <LaporanIzinCutiTable />
    </div>
  );
};

export default LaporanIzinCuti;
