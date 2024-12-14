"use client";
import { useEffect } from "react";
import ContentSection from "../(components)/content-section";
import SettingAppForm from "./SettingAppForm";
import { useSettingAppStore } from "@/store/settingApp/settingAppStore";
import ModalToast from "@/components/custom/modal-toast";
import { useToastStore } from "@/store/toastStore";

const SettingAppPage = () => {
  const {
    isOpen: toastOpen,
    message,
    type: toastType,
    setToast,
  } = useToastStore();
  const onSuccess = async () => {
    await fetchSettingApp();
  };

  const settingApp = useSettingAppStore((state) => state.settingApp);
  const fetchSettingApp = useSettingAppStore((state) => state.fetchSettingApp);

  useEffect(() => {
    fetchSettingApp();
  }, [fetchSettingApp]);
  return (
    <ContentSection title="Setting App" desc="Setting App">
      <>
        <SettingAppForm onSuccess={onSuccess} settingApp={settingApp} />
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

export default SettingAppPage;
