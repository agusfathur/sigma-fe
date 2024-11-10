import { Metadata } from "next";
import JamKerjaTable from "./(table)/jamKerjaTable";

export const metadata: Metadata = {
  title: "Jam Kerja",
};

const LokasiPage = () => {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Data Jam Kerja</h1>
      </div>

      <JamKerjaTable />
    </div>
  );
};

export default LokasiPage;
