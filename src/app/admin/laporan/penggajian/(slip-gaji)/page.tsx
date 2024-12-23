import { Metadata } from "next";
import LapSlipGajiTable from "./(table)/LapSlipGajiTable";

export const metadata: Metadata = {
  title: "Laporan Slip Gaji",
  description: "Laporan Slip Gaji",
};

const LaporanSlipGajiPage = () => {
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between space-y-2">
        <h1 className="text-lg font-bold tracking-tight">Laporan Slip Gaji</h1>
      </div>
      <LapSlipGajiTable />
    </div>
  );
};

export default LaporanSlipGajiPage;
