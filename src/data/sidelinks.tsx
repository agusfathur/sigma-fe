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
  IconArrowRightToArc,
  IconClover,
  IconTimeline,
  IconMessage2Up,
  IconMapDollar,
  IconMoonStars,
  IconUserDollar,
  IconMoodDollar,
  IconMapPinDollar,
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
    icon: <IconArrowRightToArc size={18} />,
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
  // {
  //   title: "Category",
  //   label: "",
  //   href: "/category",
  //   icon: <IconBoxSeam size={18} />,
  // },
  // {
  //   title: "Product",
  //   label: "",
  //   href: "/product",
  //   icon: <IconBoxMargin size={18} />,
  // },
  // {
  //   title: "Authentication",
  //   label: "",
  //   href: "",
  //   icon: <IconUserShield size={18} />,
  //   sub: [
  //     {
  //       title: "Sign In (email + password)",
  //       label: "",
  //       href: "/sign-in",
  //       icon: <IconHexagonNumber1 size={18} />,
  //     },
  //     {
  //       title: "Sign In (Box)",
  //       label: "",
  //       href: "/sign-in-2",
  //       icon: <IconHexagonNumber2 size={18} />,
  //     },
  //     {
  //       title: "Sign Up",
  //       label: "",
  //       href: "/sign-up",
  //       icon: <IconHexagonNumber3 size={18} />,
  //     },
  //     {
  //       title: "Forgot Password",
  //       label: "",
  //       href: "/forgot-password",
  //       icon: <IconHexagonNumber4 size={18} />,
  //     },
  //     {
  //       title: "OTP",
  //       label: "",
  //       href: "/otp",
  //       icon: <IconHexagonNumber5 size={18} />,
  //     },
  //   ],
  // },
  // {
  //   title: "Users",
  //   label: "",
  //   href: "/users",
  //   icon: <IconUsers size={18} />,
  // },
  // {
  //   title: "Requests",
  //   label: "10",
  //   href: "/requests",
  //   icon: <IconRouteAltLeft size={18} />,
  //   sub: [
  //     {
  //       title: "Trucks",
  //       label: "9",
  //       href: "/trucks",
  //       icon: <IconTruck size={18} />,
  //     },
  //     {
  //       title: "Cargos",
  //       label: "",
  //       href: "/cargos",
  //       icon: <IconBoxSeam size={18} />,
  //     },
  //   ],
  // },
  // {
  //   title: "Analysis",
  //   label: "",
  //   href: "/analysis",
  //   icon: <IconChartHistogram size={18} />,
  // },
  // {
  //   title: "Extra Components",
  //   label: "",
  //   href: "/extra-components",
  //   icon: <IconComponents size={18} />,
  // },
  // {
  //   title: "Error Pages",
  //   label: "",
  //   href: "",
  //   icon: <IconExclamationCircle size={18} />,
  //   sub: [
  //     {
  //       title: "Not Found",
  //       label: "",
  //       href: "/404",
  //       icon: <IconError404 size={18} />,
  //     },
  //     {
  //       title: "Internal Server Error",
  //       label: "",
  //       href: "/500",
  //       icon: <IconServerOff size={18} />,
  //     },
  //     {
  //       title: "Maintenance Error",
  //       label: "",
  //       href: "/503",
  //       icon: <IconBarrierBlock size={18} />,
  //     },
  //     {
  //       title: "Unauthorised Error",
  //       label: "",
  //       href: "/401",
  //       icon: <IconLock size={18} />,
  //     },
  //   ],
  // },
  // {
  //   title: "Settings",
  //   label: "",
  //   href: "/settings",
  //   icon: <IconSettings size={18} />,
  // },
];
