import { Metadata } from "next";
import UserDashboardPage from "./DashboardPage";

export const metadata: Metadata = {
  title: "User Dashboard",
  description: "User Dashboard",
};

const DashboardUser = () => {
  return (
    <>
      <UserDashboardPage />
    </>
  );
};

export default DashboardUser;
