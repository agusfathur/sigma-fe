import { Metadata } from "next";
import LapTunjanganTable from "./(table)/LapTunjanganTable";

export const metadata: Metadata = {
  title: "Laporan Tunjangan",
  description: "Laporan Tunjangan",
};

const LapTunjanganPage = () => {
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between space-y-2">
        <h1 className="text-lg font-bold tracking-tight">Laporan Tunjangan</h1>
      </div>
      <LapTunjanganTable />
    </div>
  );
};

export default LapTunjanganPage;
