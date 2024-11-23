import { Metadata } from "next";
import SettingAppPage from "./(app)/page";

export const metadata: Metadata = {
  title: "Setting App",
};

const SettingPage = () => {
  return <SettingAppPage />;
};

export default SettingPage;
