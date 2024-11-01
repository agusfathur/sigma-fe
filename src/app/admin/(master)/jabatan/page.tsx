import { Metadata } from "next";
import JabatanTable from "./(table)/JabatanTable";

export const metadata: Metadata = {
  title: "Jabatan",
};

const JabatanPage = async () => {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Data Jabatan</h1>
      </div>

      <JabatanTable />
    </div>
  );
};

export default JabatanPage;
