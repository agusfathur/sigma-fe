import { Metadata } from "next";
import LapPotongGajiTable from "./(table)/LapPotongGajiTable";

export const metadata: Metadata = {
  title: "Laporan Potong Gaji",
  description: "Laporan Potong Gaji",
};

const LaporanPotongGaji = () => {
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between space-y-2">
        <h1 className="text-lg font-bold tracking-tight">
          Laporan Potong Gaji
        </h1>
      </div>
      <LapPotongGajiTable />
    </div>
  );
};

export default LaporanPotongGaji;
