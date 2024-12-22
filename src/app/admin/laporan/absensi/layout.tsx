import { Separator } from "@/components/ui/separator";
import SidebarNav from "../(components)/sidebar-nav";
import {
  IconCalendarUser,
  IconFaceId,
  IconReportMoney,
  IconReportSearch,
} from "@tabler/icons-react";

export default function LaporanAbsensiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="space-y-0.5">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Laporan Absensi
        </h1>
        <p className="text-muted-foreground">Manage your Report</p>
      </div>
      <Separator className="my-2 lg:my-4" />
      <div className="flex flex-1 flex-col space-y-6 md:space-y-2 md:overflow-hidden lg:flex-row lg:space-x-8 lg:space-y-0">
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
    title: "Rekap Absensi",
    href: "/admin/laporan/absensi",
    icon: <IconFaceId size={18} />,
  },
  {
    title: "Kehadiran Harian",
    href: "/admin/laporan/absensi/kehadiran",
    icon: <IconCalendarUser size={18} />,
  },
  {
    title: "Laporan Izin Cuti",
    href: "/admin/laporan/absensi/izin-cuti",
    icon: <IconReportMoney size={18} />,
  },
  {
    title: "Laporan Lembur",
    href: "/admin/laporan/absensi/lembur",
    icon: <IconReportSearch size={18} />,
  },
];
