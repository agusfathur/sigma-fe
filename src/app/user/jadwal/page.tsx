import ContentSection from "@/components/custom/conten-separator";
import { Metadata } from "next";
import JadwalPage from "./JadwalPage";

export const metadata: Metadata = {
  title: "Jadwal",
};

const page = () => {
  return (
    <ContentSection title="Jadwal Kerja" desc="Jadwal Kerja">
      <JadwalPage />
    </ContentSection>
  );
};

export default page;
