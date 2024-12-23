import { Metadata } from "next";
import LapTHRTable from "./(table)/LapSlipGajiTable";

export const metadata: Metadata = {
  title: "Laporan THR",
};

const LapTHRPage = () => {
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between space-y-2">
        <h1 className="text-lg font-bold tracking-tight">
          Laporan Tunjangan Hari Raya
        </h1>
      </div>
      <LapTHRTable />
    </div>
  );
};

export default LapTHRPage;
