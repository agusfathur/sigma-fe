import { Metadata } from "next";
import LokasiTable from "./(table)/LokasiTable";

export const metadata: Metadata = {
  title: "Lokasi",
};

const LokasiPage = () => {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Data Lokasi</h1>
      </div>

      <LokasiTable />
    </div>
  );
};

export default LokasiPage;
