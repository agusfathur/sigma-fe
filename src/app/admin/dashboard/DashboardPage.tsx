"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  IconUserCog,
  IconUsers,
  IconUserShield,
  IconUsersMinus,
} from "@tabler/icons-react";
import axiosJWT from "@/lib/authJWT";
import { Pegawai } from "@/store/pegawai/pegawai.types";
import { User } from "@/store/user/user.types";
import { PegawaiIzin } from "./components/Pegawai-izin";
import { JadwalKerja } from "@/store/jadwalKerja/jadwalKerja.types";
import { PegawaiAbsen } from "./components/Pegawai-Absen";
import { PegawaiRekap } from "./components/Pegawai-Rekap";
import CalendarJadwal from "./components/Calendar-jadwal";

export default function DashboardPage() {
  const [users, setUsers] = useState(0);
  const [pegawai, setPegawai] = useState<Pegawai[]>([]);
  const [jabatan, setJabatan] = useState(0);
  const [pegawaiIzin, setPegawaiIzin] = useState([]);
  const [jadwal, setJadwal] = useState({} as JadwalKerja);
  const [pegawaiAbsen, setPegawaiAbsen] = useState([]);

  const tanggal = new Date()
    .toLocaleDateString("id-ID")
    .split("/")
    .map((part) => part.padStart(2, "0"))
    .reverse()
    .join("-");

  const getPegawai = async () => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pegawai`,
      );
      const pegawais = res.data.data || [];
      // Filter users
      const filterPegawai =
        pegawais.filter((p: Pegawai) => p.status_pegawai === "aktif") || [];
      setPegawai(filterPegawai);
    } catch (error) {
      console.error("Error fetching pegawai :", error);
    }
  };
  const getAdmin = async () => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
      );
      const user = res.data.data || [];

      const filterUser = user.filter((u: User) => u.role === "admin") || [];
      // Filter users
      setUsers(filterUser.length);
    } catch (error) {
      console.error("Error fetching  admin:", error);
    }
  };
  const getPegawaiIzin = async () => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/permohonan-izin/?tanggal=${tanggal}`,
      );
      setPegawaiIzin(res.data.data || []);
    } catch (error) {
      console.error("Error fetching pegawai izin:", error);
      setPegawaiIzin([]);
    }
  };

  const getJabatan = async () => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jabatan`,
      );
      setJabatan(res.data.data.length);
    } catch (error) {
      console.error("Error fetching jabatan:", error);
    }
  };

  const getJadwal = async () => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jadwal-pegawai?tanggal=${tanggal}`,
      );
      setJadwal(res.data.data[0]);
    } catch (error) {
      console.error("Error fetching jadwal:", error);
    }
  };

  const getAbsen = async () => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/absensi?tanggal=${tanggal}`,
      );
      console.log(res.data.data);
      setPegawaiAbsen(res.data.data);
    } catch (error) {
      console.error("Error fetching absensi:", error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        // Panggil fungsi fetch hanya jika komponen masih terpasang
        if (isMounted) {
          await getPegawaiIzin();
          await getAdmin();
          await getPegawai();
          await getJabatan();
          await getJadwal();
          await getAbsen();

          // Filter pegawai
        }
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    };

    // Panggil fetchData satu kali
    fetchData();

    // Cleanup function untuk mencegah memory leak dan fetch berulang
    return () => {
      isMounted = false;
    };
  }, []); //

  return (
    <>
      <div className="mb-5 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      </div>
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* total Pegawai */}
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">
                Total Pegawai Aktif
              </CardTitle>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700">
                <IconUsers className="h-6 w-6 text-white" />
              </div>
            </CardHeader>
            <CardContent className="-mt-4">
              <div className="text-xl font-bold">{pegawai.length ?? 0}</div>
              <p className="text-xs text-muted-foreground">Orang</p>
            </CardContent>
            <div className="b h-1 w-full bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700"></div>
          </Card>

          {/* total Pegawai izin*/}
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">
                Pegawai Sedang Izin / Cuti
              </CardTitle>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700">
                <IconUsersMinus className="h-6 w-6 text-white" />
              </div>
            </CardHeader>
            <CardContent className="-mt-4">
              <div className="text-xl font-bold">{pegawaiIzin.length ?? 0}</div>
              <p className="text-xs text-muted-foreground">
                Orang Sedang Izin / Cuti
              </p>
            </CardContent>
            <div className="h-1 w-full bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700"></div>
          </Card>

          {/* total Admin */}
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">Total Admin</CardTitle>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700">
                <IconUserCog className="h-6 w-6 text-white" />
              </div>
            </CardHeader>
            <CardContent className="-mt-4">
              <div className="text-xl font-bold">{users ?? 0}</div>
              <p className="text-xs text-muted-foreground">Admin</p>
            </CardContent>
            <div className="h-1 w-full bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700"></div>
          </Card>

          {/* total Pegawai Izin */}
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">
                Total Jabatan
              </CardTitle>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600">
                <IconUserShield className="h-6 w-6 text-white" />
              </div>
            </CardHeader>
            <CardContent className="-mt-4">
              <div className="text-xl font-bold">{jabatan ?? 0}</div>
              <p className="text-xs text-muted-foreground">Jabatan</p>
            </CardContent>
            <div className="h-1 w-full bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600"></div>
          </Card>
        </div>

        {/* card reako */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
          <Card className="col-span-1 h-[50vh] overflow-hidden md:h-[75vh] lg:col-span-5">
            <CardHeader>
              <CardTitle className="font-bold">Kalender Jadwal</CardTitle>
              <CardDescription>
                Bulan :{" "}
                {new Intl.DateTimeFormat("id-ID", { month: "long" }).format(
                  new Date(),
                )}{" "}
                {new Date().getFullYear()}
              </CardDescription>
              <div className="mt-2 w-full border border-slate-600"></div>
            </CardHeader>
            <CardContent className="h-[50vh] md:h-[65vh]">
              <CalendarJadwal pegawaId={pegawai[0]?.id_pegawai} />
            </CardContent>
          </Card>

          {/* card absensi hari ini */}
          <Card className="col-span-1 h-[40vh] overflow-hidden md:h-[75vh] lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-bold">
                Absensi Hari ini | Jadwal : {jadwal?.shift_kerja?.waktu_masuk} -{" "}
                {jadwal?.shift_kerja?.waktu_pulang}
              </CardTitle>
              <CardDescription>
                {new Intl.DateTimeFormat("id-ID", { dateStyle: "full" }).format(
                  new Date(tanggal),
                )}
              </CardDescription>
              <div className="mt-2 w-full border border-slate-600"></div>
            </CardHeader>
            <CardContent className="h-[40vh] overflow-y-scroll md:h-[65vh]">
              <PegawaiAbsen absen={pegawaiAbsen} pegawai={pegawai} />
            </CardContent>
          </Card>

          {/* card rekap */}
          <Card className="col-span-1 h-[50vh] overflow-hidden md:h-[60vh] lg:col-span-4">
            <CardHeader>
              <CardTitle className="font-bold">Rekap Kehadiran</CardTitle>
              <CardDescription>
                Tahun : {new Date().getFullYear()}
              </CardDescription>
              <div className="mt-2 w-full border border-slate-600"></div>
            </CardHeader>
            <CardContent className="h-[50vh] overflow-y-scroll md:h-[60vh]">
              <PegawaiRekap data={pegawai} />
            </CardContent>
          </Card>

          {/* card izin */}
          <Card className="col-span-1 h-[40vh] overflow-hidden md:h-[60vh] lg:col-span-3">
            <CardHeader>
              <CardTitle className="font-bold">
                Pegawai Sedang Izin | Cuti
              </CardTitle>
              <CardDescription>
                {new Intl.DateTimeFormat("id-ID", { dateStyle: "full" }).format(
                  new Date(tanggal),
                )}
              </CardDescription>
              <div className="mt-2 w-full border border-slate-600"></div>
            </CardHeader>
            <CardContent className="h-[40vh] overflow-y-scroll md:h-[60vh]">
              <PegawaiIzin data={pegawaiIzin} />
            </CardContent>
          </Card>

          {/* baris ke 2 */}
          {/* card grafik */}
          {/* <Card className="col-span-1 h-[60vh] lg:col-span-4">
            <CardHeader>
              <CardTitle className="font-bold">Overview</CardTitle>
            </CardHeader>
            <CardContent className="mx-auto pl-2">
              <Overview />
            </CardContent>
          </Card> */}
        </div>
      </div>
    </>
  );
}
