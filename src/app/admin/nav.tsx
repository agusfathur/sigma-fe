"use client";
import { AdminNav } from "@/components/admin-nav";
import ThemeSwitch from "@/components/theme-switch";
import { TopNav } from "@/components/top-nav";
import { useSettingAppStore } from "@/store/settingApp/settingAppStore";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const topNav = [
  {
    title: "Settings",
    href: "/admin/settings",
    isActive: false,
  },
];

export default function AdminNavbar() {
  const { data: session } = useSession();
  const settingApp = useSettingAppStore((state) => state.settingApp);
  const fetchSettingApp = useSettingAppStore((state) => state.fetchSettingApp);

  useEffect(() => {
    fetchSettingApp();
  }, [fetchSettingApp]);
  return (
    <>
      <h2 className="font-bold uppercase">{settingApp?.nama_sistem || ""}</h2>
      <TopNav links={topNav} />
      <div className="ml-auto flex items-center space-x-4">
        <p className="hidden text-sm lg:block">
          Hi! <span className="font-bold">{session?.user?.name || ""}</span>
        </p>
        <ThemeSwitch />
        <AdminNav />
      </div>
    </>
  );
}
