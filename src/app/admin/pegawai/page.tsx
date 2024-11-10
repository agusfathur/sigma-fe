import { Metadata } from "next";
import PegawaiTable from "./(table)/PegawaiTable";

export const metadata: Metadata = {
  title: "Data Pegawai",
};

const PegawaiPage = () => {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Data Pegawai</h1>
      </div>

      <PegawaiTable />
    </div>
  );
};

export default PegawaiPage;
