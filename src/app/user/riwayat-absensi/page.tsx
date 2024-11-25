import { Metadata } from "next";
import AbsensiTable from "./(table)/AbsensiTable";
import ContentSection from "@/components/custom/conten-separator";

export const metadata: Metadata = {
  title: "Riwayat Absensi",
};

const PegawaiPage = () => {
  return (
    <ContentSection title="Riwayat Absensi" desc="Riwayat Absensi">
      <AbsensiTable />
    </ContentSection>
  );
};

export default PegawaiPage;
