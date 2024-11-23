import { Separator } from "@/components/ui/separator";
import SidebarNav from "./(components)/sidebar-nav";
import { IconSchool, IconSettings2, IconUserCog } from "@tabler/icons-react";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="space-y-0.5">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Settings
        </h1>
        <p className="text-muted-foreground">Manage your application setting</p>
      </div>
      <Separator className="my-4 lg:my-6" />
      <div className="flex flex-1 flex-col space-y-8 md:space-y-2 md:overflow-hidden lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="top-0 lg:sticky lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex w-full p-1 pr-4 md:overflow-y-hidden">
          {children}
        </div>
      </div>
    </>
  );
}

const sidebarNavItems = [
  {
    title: "App Setting",
    icon: <IconSettings2 size={18} />,
    href: "/admin/settings",
  },
  {
    title: "Data Sekolah",
    href: "/admin/settings/sekolah",
    icon: <IconSchool size={18} />,
  },
  {
    title: "User",
    icon: <IconUserCog size={18} />,
    href: "/admin/settings/user",
  },
];
