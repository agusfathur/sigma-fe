"use client";
import { useEffect } from "react";
import ContentSection from "../(components)/content-section";
import { useDataSekolahStore } from "@/store/dataSekolah/dataSekolahStore";
import SekolahForm from "./SekolahForm";

const DataSekolahPage = () => {
  const onSuccess = async () => {
    await fetchDataSekolah();
  };

  const dataSekolah = useDataSekolahStore((state) => state.dataSekolah);
  const fetchDataSekolah = useDataSekolahStore(
    (state) => state.fetchDataSekolah,
  );

  useEffect(() => {
    fetchDataSekolah();
  }, [fetchDataSekolah]);
  return (
    <ContentSection title="Setting App" desc="Setting App">
      <SekolahForm onSuccess={onSuccess} dataSekolah={dataSekolah} />
    </ContentSection>
  );
};

export default DataSekolahPage;
