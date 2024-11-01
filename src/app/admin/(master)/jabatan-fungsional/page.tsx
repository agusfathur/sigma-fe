import { Metadata } from "next";
import JabatanFungsionalTable from "./(table)/JabatanFungsionalTable";

export const metadata: Metadata = {
  title: "Jabatan Fungsional",
};

const JabatanFungsionalPage = () => {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Data Jabatan Fungsional
        </h1>
      </div>

      <JabatanFungsionalTable />
    </div>
  );
};

export default JabatanFungsionalPage;
