import { Metadata } from "next";
import TunjanganTetapTable from "./(table)/TunjanganTetapTable";

export const metadata: Metadata = {
  title: "Tunjangan Tetap",
};
const THRPage = () => {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Tunjangan Tetap</h1>
      </div>

      <TunjanganTetapTable />
    </div>
  );
};

export default THRPage;
