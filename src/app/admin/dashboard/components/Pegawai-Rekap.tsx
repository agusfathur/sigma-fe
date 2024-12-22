"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axiosJWT from "@/lib/authJWT";
import { Absensi } from "@/store/absensi/absensi.types";
import { Pegawai } from "@/store/pegawai/pegawai.types";
import { useEffect, useState } from "react";

interface PegawaiWithJadwal {
  pegawai: Pegawai;
  jadwals: number;
  absensi: {
    hadir: number;
    izin: number;
    terlambat: number;
  };
}

export function PegawaiRekap({ data }: { data: Pegawai[] }) {
  const [pegawaiWithJadwals, setPegawaiWithJadwals] = useState<
    PegawaiWithJadwal[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tahun = new Date().getFullYear();

  useEffect(() => {
    let isMounted = true;

    const fetchJadwals = async () => {
      try {
        setLoading(true);
        const jadwalPromises = data.map(async (pegawai) => {
          const res = await axiosJWT.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/jadwal-pegawai/pegawai/${pegawai.id_pegawai}?tahun=${tahun}`,
          );

          const absensi = await axiosJWT.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/absensi/pegawai/${pegawai.id_pegawai}?tahun=${tahun}`,
          );

          const filterHadir = absensi.data.data.filter(
            (absen: Absensi) => absen.status_absen === "hadir",
          );
          const filterTerlambat = absensi.data.data.filter(
            (absen: Absensi) => absen.status_absen === "terlambat",
          );
          const filterIzin = absensi.data.data.filter(
            (absen: Absensi) =>
              absen.status_absen === "izin" || absen.status_absen === "cuti",
          );

          return {
            pegawai,
            jadwals: res.data.data.length,
            absensi: {
              hadir: filterHadir.length,
              izin: filterIzin.length,
              terlambat: filterTerlambat.length,
            },
          };
        });

        const results = await Promise.all(jadwalPromises);

        if (isMounted) {
          setPegawaiWithJadwals(results);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching jadwals in rekap:", error);
        if (isMounted) {
          setError("Gagal memuat jadwal pegawai");
          setLoading(false);
        }
      }
    };

    fetchJadwals();

    return () => {
      isMounted = false;
    };
  }, [data, tahun]);

  if (loading) {
    return (
      <div className="text-center text-sm text-muted-foreground">
        Memuat data...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-sm text-rose-600">{error}</div>;
  }

  if (data.length === 0) {
    return (
      <div className="text-center text-sm text-muted-foreground">
        Tidak ada data pegawai
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {pegawaiWithJadwals.map((item, index) => (
        <div
          key={index}
          className="flex w-full flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0"
        >
          {/* Bagian kiri: Avatar dan Info */}
          <div className="flex w-full items-center space-x-4 md:w-[40%]">
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={item.pegawai.foto || ""}
                alt={`Foto ${item.pegawai.nama}`}
                onError={(e) => {
                  e.currentTarget.src = "/default-avatar.png";
                }}
              />
              <AvatarFallback>
                {item.pegawai.nama?.charAt(0) || "P"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">
                {item.pegawai.nama}
              </p>
              <p className="text-sm text-gray-500">
                {item.pegawai.jabatan.nama || "Pegawai"}
              </p>
            </div>
          </div>

          {/* Bagian kanan: Statistik */}
          <div className="grid w-full grid-cols-2 gap-2 md:flex md:w-[60%] md:justify-end">
            <div className="rounded-sm bg-emerald-700 px-2 py-1 text-center text-xs font-semibold text-white">
              Hadir: {item.absensi.hadir || 0}
            </div>
            <div className="rounded-sm bg-indigo-700 px-2 py-1 text-center text-xs font-semibold text-white">
              Terlambat: {item.absensi.terlambat || 0}
            </div>
            <div className="rounded-sm bg-cyan-700 px-2 py-1 text-center text-xs font-semibold text-white">
              Izin: {item.absensi.izin || 0}
            </div>
            <div className="rounded-sm bg-rose-700 px-2 py-1 text-center text-xs font-semibold text-white">
              Tidak Hadir:{" "}
              {item.jadwals -
                item.absensi.hadir -
                item.absensi.izin -
                item.absensi.terlambat || 0}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
