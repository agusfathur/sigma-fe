import { Metadata } from "next";
import TunjanganKehadiranTable from "./(table)/TunjanganKehadiranTable";

export const metadata: Metadata = {
  title: "Tunjangan Kehadiran",
};
const THRPage = () => {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Tunjangan Kehadiran
        </h1>
      </div>

      <TunjanganKehadiranTable />
    </div>
  );
};

export default THRPage;
