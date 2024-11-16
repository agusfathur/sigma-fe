import { Metadata } from "next";
import PinjamanTable from "./(table)/PinjamanTable";

export const metadata: Metadata = {
  title: "Data Pinjaman",
};
const THRPage = () => {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Data Pinjaman</h1>
      </div>

      <PinjamanTable />
    </div>
  );
};

export default THRPage;
