import { Metadata } from "next";
import KategoriLiburTable from "./(table)/kategoriLiburTable";

export const metadata: Metadata = {
  title: "Kategori Libur",
};

const KategoriLiburPage = () => {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Data Kategori Libur
        </h1>
      </div>

      <KategoriLiburTable />
    </div>
  );
};

export default KategoriLiburPage;
