"use client";
import { useEffect } from "react";
import ContentSection from "../(components)/content-section";
import SettingAppForm from "./SettingAppForm";
import { useSettingAppStore } from "@/store/settingApp/settingAppStore";

const SettingAppPage = () => {
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
      <SettingAppForm onSuccess={onSuccess} settingApp={settingApp} />
    </ContentSection>
  );
};

export default SettingAppPage;
