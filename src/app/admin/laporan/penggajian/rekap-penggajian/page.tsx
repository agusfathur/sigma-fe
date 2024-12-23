import { Metadata } from "next";
import LapRekapGajiTable from "./(table)/LapRekapGajiTable";

export const metadata: Metadata = {
  title: "Laporan Rekap Penggajian",
  description: "Laporan Rekap Penggajian",
};

const LapRekapGaji = () => {
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between space-y-2">
        <h1 className="text-lg font-bold tracking-tight">
          Laporan Rekap Penggajian
        </h1>
      </div>
      <LapRekapGajiTable />
    </div>
  );
};

export default LapRekapGaji;
