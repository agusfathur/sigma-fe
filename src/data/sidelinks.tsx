import {
  IconLayoutDashboard,
  IconDatabasePlus,
  IconUserCog,
  IconUserQuestion,
  IconLocation,
  IconHourglassHigh,
  IconCategory,
  IconCalendarUser,
  IconCalendarEvent,
  IconCalendarSmile,
  IconParking,
  IconUsersGroup,
  IconClover,
  IconTimeline,
  IconMessage2Up,
  IconMapDollar,
  IconMoonStars,
  IconUserDollar,
  IconMoodDollar,
  IconMapPinDollar,
  IconReceiptDollar,
  IconSquareRoundedPercentage,
  IconCashBanknote,
  IconCut,
  IconCashRegister,
  IconSettings,
  IconReport,
  IconFaceId,
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

export const sidelinks: SideLink[] = [
  {
    title: "Dashboard",
    label: "",
    href: "/admin/dashboard",
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: "Master Data Pegawai",
    label: "",
    href: "",
    icon: <IconDatabasePlus size={18} />,
    sub: [
      {
        title: "Jabatan",
        label: "",
        href: "/admin/jabatan",
        icon: <IconUserCog size={18} />,
      },
      {
        title: "Jabatan Fungsional",
        label: "",
        href: "/admin/jabatan-fungsional",
        icon: <IconUserCog size={18} />,
      },
      {
        title: "Status Pegawai",
        label: "",
        href: "/admin/status-pegawai",
        icon: <IconUserQuestion size={18} />,
      },
      {
        title: "Data Lokasi",
        label: "",
        href: "/admin/lokasi",
        icon: <IconLocation size={18} />,
      },
    ],
  },
  {
    title: "Data Pegawai",
    label: "",
    href: "/admin/pegawai",
    icon: <IconUsersGroup size={18} />,
  },
  {
    title: "Master Data Absensi",
    label: "",
    href: "",
    icon: <IconCalendarEvent size={18} />,
    sub: [
      {
        title: "Kategori Libur",
        label: "",
        href: "/admin/kategori-libur",
        icon: <IconCategory size={18} />,
      },
      {
        title: "Data Libur",
        label: "",
        href: "/admin/data-libur",
        icon: <IconCalendarSmile size={18} />,
      },
      {
        title: "Jenis Izin",
        label: "",
        href: "/admin/jenis-izin",
        icon: <IconParking size={18} />,
      },
      {
        title: "Jam Kerja",
        label: "",
        href: "/admin/jam-kerja",
        icon: <IconHourglassHigh size={18} />,
      },
      {
        title: "Data Jadwal Pegawai",
        label: "",
        href: "/admin/jadwal-kerja",
        icon: <IconCalendarUser size={18} />,
      },
    ],
  },
  {
    title: "Absensi",
    label: "",
    href: "/admin/absensi",
    icon: <IconFaceId size={18} />,
  },
  {
    title: "Data Absensi",
    label: "",
    href: "",
    icon: <IconTimeline size={18} />,
    sub: [
      {
        title: "Lembur",
        label: "",
        href: "/admin/lembur",
        icon: <IconClover size={18} />,
      },
      {
        title: "Permohonan Izin",
        label: "",
        href: "/admin/permohonan-izin",
        icon: <IconMessage2Up size={18} />,
      },
    ],
  },
  {
    title: "Data Tunjangan",
    label: "",
    href: "",
    icon: <IconMapDollar size={18} />,
    sub: [
      {
        title: "Tunjangan Tetap",
        label: "",
        href: "/admin/tunjangan-tetap",
        icon: <IconUserDollar size={18} />,
      },
      {
        title: "Tunjangan Kehadiran",
        label: "",
        href: "/admin/tunjangan-kehadiran",
        icon: <IconMapPinDollar size={18} />,
      },
      {
        title: "Tunjangan Bonus",
        label: "",
        href: "/admin/tunjangan-bonus",
        icon: <IconMoodDollar size={18} />,
      },
      {
        title: "Tunjangan Hari Raya",
        label: "",
        href: "/admin/tunjangan-hari-raya",
        icon: <IconMoonStars size={18} />,
      },
    ],
  },
  {
    title: "Data Gaji",
    label: "",
    href: "",
    icon: <IconReceiptDollar size={18} />,
    sub: [
      {
        title: "Pajak",
        label: "",
        href: "/admin/pajak",
        icon: <IconSquareRoundedPercentage size={18} />,
      },
      {
        title: "Pinjaman",
        label: "",
        href: "/admin/pinjaman",
        icon: <IconCashBanknote size={18} />,
      },
      {
        title: "Potong Gaji",
        label: "",
        href: "/admin/potong-gaji",
        icon: <IconCut size={18} />,
      },
    ],
  },
  {
    title: "Slip Gaji",
    label: "",
    href: "/admin/slip-gaji",
    icon: <IconCashRegister size={18} />,
  },
  {
    title: "Settings",
    label: "",
    href: "/admin/settings",
    icon: <IconSettings size={18} />,
    // sub: [
    //   {
    //     title: "Setting App",
    //     label: "",
    //     href: "/admin/setting-app",
    //     icon: <IconSettingsPin size={18} />,
    //   },
    //   {
    //     title: "Data Sekolah",
    //     label: "",
    //     href: "/admin/setting-sekolah",
    //     icon: <IconSchool size={18} />,
    //   },
    //   {
    //     title: "User Management",
    //     label: "",
    //     href: "/admin/setting-user",
    //     icon: <IconUserCog size={18} />,
    //   },
    // ],
  },
  {
    title: "Laporan",
    label: "",
    href: "",
    icon: <IconReport size={18} />,
  },
];
