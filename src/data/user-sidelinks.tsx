import {
  IconLayoutDashboard,
  IconCashRegister,
  IconFaceId,
  IconUserCog,
  IconMoonStars,
  IconReportMoney,
  IconCalendarDot,
} from "@tabler/icons-react";

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: JSX.Element;
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export const userSidelinks: SideLink[] = [
  {
    title: "Dashboard",
    label: "",
    href: "/user/dashboard",
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: "Riwayat Absensi",
    label: "",
    href: "/user/riwayat-absensi",
    icon: <IconFaceId size={18} />,
  },
  {
    title: "Slip Gaji",
    label: "",
    href: "/user/slip-gaji",
    icon: <IconCashRegister size={18} />,
  },
  {
    title: "Permohonan Izin / Cuti",
    label: "",
    href: "/user/izin",
    icon: <IconCalendarDot size={18} />,
  },
  {
    title: "Pinjaman",
    label: "",
    href: "/user/pinjaman",
    icon: <IconReportMoney size={18} />,
  },
  {
    title: "THR",
    label: "",
    href: "/user/thr",
    icon: <IconMoonStars size={18} />,
  },
  {
    title: "Profile",
    label: "",
    href: "/user/profile",
    icon: <IconUserCog size={18} />,
  },
];
