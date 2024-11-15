import { Metadata } from "next";
import LemburTable from "./(table)/LemburTable";

export const metadata: Metadata = {
  title: "Data Lembur",
};

const LemburPage = () => {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Data Lembur Pegawai
        </h1>
      </div>
      <LemburTable />
    </div>
  );
};

export default LemburPage;
