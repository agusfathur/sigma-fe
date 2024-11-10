import { Metadata } from "next";
import DataLiburTable from "./(table)/DataLiburTable";

export const metadata: Metadata = {
  title: "Data Libur",
};

const DataLiburPage = () => {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Data Hari Libur | Cuti Bersama
        </h1>
      </div>

      <DataLiburTable />
    </div>
  );
};

export default DataLiburPage;
