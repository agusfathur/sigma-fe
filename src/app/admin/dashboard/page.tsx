import { Metadata } from "next";
import DashboardPage from "./DashboardPage";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

const Dashboard = () => {
  return (
    <>
      <DashboardPage />
    </>
  );
};

export default Dashboard;
