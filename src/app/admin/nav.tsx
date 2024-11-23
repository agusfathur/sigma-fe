import { Search } from "@/components/search";
import ThemeSwitch from "@/components/theme-switch";
import { TopNav } from "@/components/top-nav";

const topNav = [
  {
    title: "Settings",
    href: "/admin/settings",
    isActive: false,
  },
];

export default function AdminNavbar() {
  return (
    <>
      {/* ===== Top Heading ===== */}
      <TopNav links={topNav} />
      <div className="ml-auto flex items-center space-x-4">
        <Search />
        <ThemeSwitch />
      </div>
    </>
  );
}
