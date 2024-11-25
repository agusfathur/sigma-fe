"use client";
import { useEffect, useState } from "react";
import { IconChevronsLeft, IconMenu2, IconX } from "@tabler/icons-react";
import { Layout } from "./custom/layout";
import { Button } from "./custom/button";
import Nav from "./nav";
import { cn } from "@/lib/utils";
import { userSidelinks } from "@/data/user-sidelinks";
import { useSettingAppStore } from "@/store/settingApp/settingAppStore";
import Image from "next/image";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserSidebar({
  className,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {
  const [navOpened, setNavOpened] = useState(false);
  const settingApp = useSettingAppStore((state) => state.settingApp);
  const fetchSettingApp = useSettingAppStore((state) => state.fetchSettingApp);

  /* Make body not scrollable when navBar is opened */
  useEffect(() => {
    fetchSettingApp();
    if (navOpened) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [navOpened, fetchSettingApp]);

  return (
    <aside
      className={cn(
        `fixed left-0 right-0 top-0 z-50 w-full border-r-2 border-slate-300 shadow-lg shadow-white transition-[width] dark:shadow-lg md:bottom-0 md:right-auto md:h-svh md:shadow-2xl md:dark:shadow-white ${isCollapsed ? "md:w-14" : "md:w-64"}`,
        className,
      )}
    >
      {/* Overlay in mobile */}
      <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${navOpened ? "h-svh opacity-50" : "h-0 opacity-0"} w-full bg-black md:hidden`}
      />

      <Layout fixed className={navOpened ? "h-svh" : ""}>
        {/* Header */}
        <Layout.Header
          sticky
          className="z-50 flex justify-between px-4 py-3 shadow-sm md:px-4"
        >
          <div className={`flex items-center ${!isCollapsed ? "gap-2" : ""}`}>
            {settingApp.logo_sistem ? (
              <Image
                src={settingApp.logo_sistem as string}
                alt="logo sistem"
                width={40}
                height={40}
                className={`transition-all ${isCollapsed ? "h-6 w-9 rounded-sm" : "h-10 w-9 rounded-md"}`}
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                className={`transition-all ${isCollapsed ? "h-6 w-6" : "h-8 w-8"}`}
              >
                <rect width="256" height="256" fill="none"></rect>
                <line
                  x1="208"
                  y1="128"
                  x2="128"
                  y2="208"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></line>
                <line
                  x1="192"
                  y1="40"
                  x2="40"
                  y2="192"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></line>
                {/* <span className="sr-only">Website Name</span> */}
              </svg>
            )}
            <div
              className={`flex flex-col justify-end truncate ${isCollapsed ? "invisible w-0" : "visible w-auto"}`}
            >
              <span className="font-medium">
                {settingApp.singkatan_sistem || "Shadcn Admin"}
              </span>
              <span className="text-xs">MI NU Hidayatul Mubtadiin</span>
            </div>
          </div>

          {/* Toggle Button in mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle Navigation"
            aria-controls="sidebar-menu"
            aria-expanded={navOpened}
            onClick={() => setNavOpened((prev) => !prev)}
          >
            {navOpened ? <IconX /> : <IconMenu2 />}
          </Button>
        </Layout.Header>

        {/* Navigation links */}
        <Nav
          id="sidebar-menu"
          className={`no-scrollbar z-40 h-full flex-1 overflow-auto ${navOpened ? "max-h-screen" : "max-h-0 py-0 md:max-h-screen md:py-2"}`}
          closeNav={() => setNavOpened(false)}
          isCollapsed={isCollapsed}
          links={userSidelinks}
        />

        {/* Scrollbar width toggle button */}
        <Button
          onClick={() => setIsCollapsed(!isCollapsed)}
          size="icon"
          variant="outline"
          className="absolute -right-5 top-1/2 z-50 hidden rounded-full border-slate-400 md:inline-flex"
        >
          <IconChevronsLeft
            stroke={1.5}
            className={`h-5 w-5 ${isCollapsed ? "rotate-180" : ""}`}
          />
        </Button>
      </Layout>
    </aside>
  );
}
