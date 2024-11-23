import { Metadata } from "next";
import DataSekolahPage from "./SekolahPage";

export const metadata: Metadata = {
  title: "Setting Data Sekolah",
};

const SekolahPage = () => {
  return (
    <>
      <DataSekolahPage />
    </>
  );
};

export default SekolahPage;
