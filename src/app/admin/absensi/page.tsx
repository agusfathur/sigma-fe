import { Metadata } from "next";
import AbsensiTable from "./(table)/AbsensiTable";

export const metadata: Metadata = {
  title: "Data Absensi",
};

const PegawaiPage = () => {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Data Absensi</h1>
      </div>

      <AbsensiTable />
    </div>
  );
};

export default PegawaiPage;
