import { Metadata } from "next";
import ContentSection from "@/components/custom/conten-separator";
import UserPinjamanTable from "./(table)/PinjamanTable";

export const metadata: Metadata = {
  title: "Pinjaman",
};

const LemburPage = () => {
  return (
    <ContentSection title="Data Pinjaman" desc="Data Pinjaman">
      <UserPinjamanTable />
    </ContentSection>
  );
};

export default LemburPage;
