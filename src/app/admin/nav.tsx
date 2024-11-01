import { Search } from "@/components/search";
import ThemeSwitch from "@/components/theme-switch";
import { TopNav } from "@/components/top-nav";
import { UserNav } from "@/components/user-nav";

const topNav = [
  {
    title: "Overview",
    href: "dashboard/overview",
    isActive: true,
  },
  {
    title: "Customers",
    href: "dashboard/customers",
    isActive: false,
  },
  {
    title: "Products",
    href: "dashboard/products",
    isActive: false,
  },
  {
    title: "Settings",
    href: "dashboard/settings",
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
        <UserNav />
      </div>
    </>
  );
}
