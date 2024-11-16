import { Metadata } from "next";
import TunjanganKehadiranTable from "./(table)/PajakTable";
import PajakTable from "./(table)/PajakTable";

export const metadata: Metadata = {
  title: "Data Pajak",
};
const THRPage = () => {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Data Pajak</h1>
      </div>

      <PajakTable />
    </div>
  );
};

export default THRPage;
