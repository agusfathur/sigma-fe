import { Metadata } from "next";
import ContentSection from "../(components)/content-section";
import UserTable from "./(table)/UserTable";

export const metadata: Metadata = {
  title: "Management User Admin",
};

const SettingUserPage = () => {
  return (
    <ContentSection title="Management User Admin" desc="Management User Admin">
      <UserTable />
    </ContentSection>
  );
};

export default SettingUserPage;
