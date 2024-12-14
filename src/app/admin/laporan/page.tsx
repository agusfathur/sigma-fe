import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Laporan",
};

const Laporan = () => {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Laporan</h1>
      </div>

      {/* <DataLiburTable /> */}
    </div>
  );
};

export default Laporan;
