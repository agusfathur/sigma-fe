import { Metadata } from "next";
import PermohonanIzinTable from "./(table)/PermohonanIzinTable";

export const metadata: Metadata = {
  title: "Data Permohonan Izin | Cuti",
};

const LemburPage = () => {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Data Permohonan Izin | Cuti
        </h1>
      </div>
      <PermohonanIzinTable />
    </div>
  );
};

export default LemburPage;
