import { Separator } from "@/components/ui/separator";
import SidebarNav from "../(components)/sidebar-nav";
import {
  IconCashBanknote,
  IconFileScissors,
  IconMoodDollar,
} from "@tabler/icons-react";

export default function LaporanPenggajianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="space-y-0.5">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Laporan Penggajian
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
    title: "Laporan Slip Gaji",
    href: "/admin/laporan/penggajian",
    icon: <IconFileScissors size={18} />,
  },
  {
    title: "Rekap Penggajian",
    href: "/admin/laporan/penggajian/rekap-penggajian",
    icon: <IconFileScissors size={18} />,
  },
  {
    title: "Laporan Tunjangan",
    href: "/admin/laporan/penggajian/tunjangan",
    icon: <IconCashBanknote size={18} />,
  },
  {
    title: "Laporan THR",
    href: "/admin/laporan/penggajian/thr",
    icon: <IconMoodDollar size={18} />,
  },

  {
    title: "Laporan Potong Gaji",
    href: "/admin/laporan/penggajian/potong-gaji",
    icon: <IconFileScissors size={18} />,
  },
  {
    title: "Laporan Pinjaman",
    href: "/admin/laporan/penggajian/pinjaman",
    icon: <IconMoodDollar size={18} />,
  },
];
