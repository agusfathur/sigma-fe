import { Metadata } from "next";
import LemburAbsensiTable from "./(table)/LemburAbsensiTable";

export const metadata: Metadata = {
  title: "Laporan Lembur",
};

const LemburAbsensiPage = () => {
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between space-y-2">
        <h1 className="text-lg font-bold tracking-tight">Laporan Lembur</h1>
      </div>
      <LemburAbsensiTable />
    </div>
  );
};

export default LemburAbsensiPage;
