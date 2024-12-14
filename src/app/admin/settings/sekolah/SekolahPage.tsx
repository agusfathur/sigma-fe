"use client";
import { useEffect } from "react";
import ContentSection from "../(components)/content-section";
import { useDataSekolahStore } from "@/store/dataSekolah/dataSekolahStore";
import SekolahForm from "./SekolahForm";
import ModalToast from "@/components/custom/modal-toast";
import { useToastStore } from "@/store/toastStore";

const DataSekolahPage = () => {
  const {
    isOpen: toastOpen,
    message,
    type: toastType,
    setToast,
  } = useToastStore();
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
      <>
        <SekolahForm onSuccess={onSuccess} dataSekolah={dataSekolah} />
        <ModalToast
          isOpen={toastOpen}
          message={message}
          type={toastType}
          onClose={() =>
            setToast({ isOpen: false, message: "", type: toastType })
          }
        />
      </>
    </ContentSection>
  );
};

export default DataSekolahPage;
