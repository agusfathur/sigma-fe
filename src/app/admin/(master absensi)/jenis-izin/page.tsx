import { Metadata } from "next";
import JenisIzinTable from "./(table)/jenisIzinTable";

export const metadata: Metadata = {
  title: "Jenis Izin",
};

const JenisIzinPage = () => {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Data Jenis Izin</h1>
      </div>
      <JenisIzinTable />
    </div>
  );
};

export default JenisIzinPage;
