import { Separator } from "@/components/ui/separator";
import SidebarNav from "./(components)/sidebar-nav";
import {
  IconCalendarUser,
  IconCashBanknote,
  IconFaceId,
  IconFileScissors,
  IconMoodDollar,
  IconMoonStars,
  IconReport,
  IconReportMoney,
  IconReportSearch,
} from "@tabler/icons-react";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="space-y-0.5">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Laporan
        </h1>
        <p className="text-muted-foreground">Manage your Report</p>
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
    title: "Laporan",
    icon: <IconReport size={18} />,
    href: "/admin/laporan",
  },
  {
    title: "Laporan Absensi",
    href: "/admin/laporan/absensi",
    icon: <IconFaceId size={18} />,
  },
  {
    title: "Laporan Jadwal Kerja",
    href: "/admin/laporan/jadwal",
    icon: <IconCalendarUser size={18} />,
  },
  {
    title: "Laporan Slip Gaji",
    icon: <IconReportMoney size={18} />,
    href: "/admin/laporan/slip-gaji",
  },
  {
    title: "Laporan Lembur",
    href: "/admin/laporan/lembur",
    icon: <IconReportSearch size={18} />,
  },
  {
    title: "Laporan Potong Gaji",
    href: "/admin/laporan/potong-gaji",
    icon: <IconFileScissors size={18} />,
  },
  {
    title: "Laporan Pinjaman",
    href: "/admin/laporan/pinjaman",
    icon: <IconCashBanknote size={18} />,
  },
  {
    title: "Laporan THR",
    href: "/admin/laporan/thr",
    icon: <IconMoonStars size={18} />,
  },
  {
    title: "Laporan Tunjangan Bonus",
    href: "/admin/laporan/bonus",
    icon: <IconMoodDollar size={18} />,
  },
];
