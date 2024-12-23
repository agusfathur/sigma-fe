import { Metadata } from "next";
import LapPinjamanTable from "./(table)/LapPinjamanTable";

export const metadata: Metadata = {
  title: "Laporan Pinjaman",
  description: "Laporan Pinjaman",
};

const LaporanPinjaman = () => {
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between space-y-2">
        <h1 className="text-lg font-bold tracking-tight">Laporan Pinjaman</h1>
      </div>
      <LapPinjamanTable />
    </div>
  );
};

export default LaporanPinjaman;
