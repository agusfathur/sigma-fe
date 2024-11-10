import { Metadata } from "next";
import StatusPegawaiTable from "./(table)/statusPegawaiTable";

export const metadata: Metadata = {
  title: "Status Pegawai",
};

const StatusPegawaiPage = () => {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Data Status Pegawai
        </h1>
      </div>
      <StatusPegawaiTable />
    </div>
  );
};

export default StatusPegawaiPage;
