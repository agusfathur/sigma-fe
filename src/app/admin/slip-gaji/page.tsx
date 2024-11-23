import { Metadata } from "next";
import SlipGajiTable from "./(table)/SlipGajiTable";

export const metadata: Metadata = {
  title: "Slip Gaji Pegawai",
};

const SlipGajiPage = () => {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Slip Gaji Pegawai</h1>
      </div>

      <SlipGajiTable />
    </div>
  );
};

export default SlipGajiPage;
