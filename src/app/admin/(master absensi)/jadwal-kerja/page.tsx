import { Metadata } from "next";
import JadwalKerjaTable from "./(table)/JadwalKerjaTable";

export const metadata: Metadata = {
  title: "Data Jadwal Kerja",
};

const LokasiPage = () => {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Data Jadwal Kerja</h1>
      </div>

      <JadwalKerjaTable />
    </div>
  );
};

export default LokasiPage;
