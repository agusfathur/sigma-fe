import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";
import { useSession } from "next-auth/react";

export default function UserNavbar() {
  const { data: session } = useSession();
  return (
    <>
      {/* ===== Top Heading ===== */}
      {/* <TopNav links={topNav} /> */}
      <h1 className="font-medium tracking-tight">
        SISTEM INFORMASI GAJI dan MANAJAMEN ABSENSI
      </h1>
      <div className="ml-auto flex items-center space-x-4">
        {/* <Search /> */}
        <h3>
          Hi! <span className="font-bold">{session?.user?.name}</span>
        </h3>
        <ThemeSwitch />
        <UserNav />
      </div>
    </>
  );
}
