import { Metadata } from "next";
import ContentSection from "@/components/custom/conten-separator";
import IzinTable from "./(table)/IzinTable";

export const metadata: Metadata = {
  title: "Izin | Cuti",
};

const LemburPage = () => {
  return (
    <ContentSection
      title="Data Permohonan Izin | Cuti"
      desc="Data Permohonan Izin | Cuti"
    >
      <IzinTable />
    </ContentSection>
  );
};

export default LemburPage;
