import { Metadata } from "next";
import ContentSection from "@/components/custom/conten-separator";
import UserTHRTable from "./(table)/THRTable";

export const metadata: Metadata = {
  title: "Tunnjangan Hari Raya",
};

const LemburPage = () => {
  return (
    <ContentSection
      title="Data Tunjangan Hari Raya"
      desc="Data Tunjangan Hari Raya"
    >
      <UserTHRTable />
    </ContentSection>
  );
};

export default LemburPage;
