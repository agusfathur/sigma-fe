"use client";
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";
import { useSettingAppStore } from "@/store/settingApp/settingAppStore";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function UserNavbar() {
  const { data: session } = useSession();
  const settingApp = useSettingAppStore((state) => state.settingApp);
  const fetchSettingApp = useSettingAppStore((state) => state.fetchSettingApp);

  useEffect(() => {
    fetchSettingApp();
  }, [fetchSettingApp]);
  return (
    <>
      {/* ===== Top Heading ===== */}
      <h2 className="font-bold uppercase">{settingApp?.nama_sistem || ""}</h2>
      <div className="ml-auto flex items-center space-x-4">
        {/* <Search /> */}
        <p className="hidden text-sm lg:block">
          Hi! <span className="font-bold">{session?.user?.name}</span>
        </p>
        <ThemeSwitch />
        <UserNav />
      </div>
    </>
  );
}
