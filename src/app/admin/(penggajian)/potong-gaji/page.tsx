import { Metadata } from "next";
import PotongGajiTable from "./(table)/PotongGajiTable";

export const metadata: Metadata = {
  title: "Potong Gaji",
};
const THRPage = () => {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Potong Gaji</h1>
      </div>

      <PotongGajiTable />
    </div>
  );
};

export default THRPage;
