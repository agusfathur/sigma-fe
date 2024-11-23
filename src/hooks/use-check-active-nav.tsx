// 1. Import usePathname hook dari next/navigation
import { usePathname } from "next/navigation";

// 2. Membuat dan mengexport custom hook useCheckActiveNav
export default function useCheckActiveNav() {
  // 3. Menggunakan usePathname untuk mendapatkan current URL path
  const pathname = usePathname(); // Contoh nilai: "/admin/absensi"

  // 4. Membuat fungsi checkActiveNav yang menerima parameter nav
  const checkActiveNav = (nav: string) => {
    // 5. Membersihkan slash di awal nav bila ada
    const cleanNav = nav.replace(/^\//, "");
    // Contoh: "/admin" menjadi "admin"

    // 6. Memecah pathname menjadi array dan menghapus string kosong
    const pathArray = pathname.split("/").filter((item) => item !== "");
    // Contoh: "/admin/absensi" menjadi ["admin", "absensi"]

    // 7. Cek beberapa kondisi:

    // 7a. Cek jika ini halaman home
    if (nav === "/" && pathArray.length < 1) return true;

    // 7b. Cek jika path sama persis dengan nav
    if (pathname === nav) return true;

    // 7c. Cek khusus untuk path admin
    if (cleanNav === "admin" && pathArray[0] === "admin") return true;

    // 7d. Cek jika path mengandung nav yang diberikan
    return pathArray.includes(cleanNav);
  };

  return { checkActiveNav };
}
