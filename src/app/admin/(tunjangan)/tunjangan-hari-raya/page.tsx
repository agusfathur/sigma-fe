import { Metadata } from "next";
import THRTable from "./(table)/THRTable";

export const metadata: Metadata = {
  title: "Tunjangan Hari Raya",
};
const THRPage = () => {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Tunjangan Hari Raya
        </h1>
      </div>

      <THRTable />
    </div>
  );
};

export default THRPage;
