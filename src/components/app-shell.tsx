// app/layout.tsx
"use client";
import Sidebar from "./sidebar";
import useIsCollapsed from "@/hooks/use-is-collapsed";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed();

  return (
    <div className="relative h-full overflow-hidden bg-gradient-to-tr from-white via-white to-violet-400/30 dark:from-slate-950 dark:via-slate-950 dark:to-violet-950/40">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id="content"
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? "md:ml-14" : "md:ml-64"} h-full`}
      >
        {children}
      </main>
    </div>
  );
}
