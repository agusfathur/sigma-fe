/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/custom/modal";
import { useAbsensiStore } from "@/store/absensi/absensiStore";
import { absensiColumns } from "./AbsensiColumns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useJamKerjaStore } from "@/store/jamKerja/jamKerjaStore";
import { Button } from "@/components/custom/button";
import UserLemburTable from "../(table lembur)/LemburTable";
import { useSession } from "next-auth/react";
import { Absensi } from "@/store/absensi/absensi.types";
import { useJadwalKerjaStore } from "@/store/jadwalKerja/jadwalKerjaStore";
import AbsensiCustomTable from "./AbsensiCustomTable";

const AbsensiTable = () => {
  const { data: session } = useSession();
  const [tahunOptions, setTahunOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [bulanOptions, setBulanOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const [filterTahun, setFilterTahun] = useState("");
  const [filterBulan, setFilterBulan] = useState("");
  const [filterTanggal, setFilterTanggal] = useState("");

  const absensis = useAbsensiStore((state) => state.absensi);

  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

  const absensiData = useAbsensiStore((state) => state.absensiData);

  const isModalKoordinatOpen = useAbsensiStore(
    (state) => state.isModalKoordinatOpen,
  );
  const setIsModalKoordinatOpen = useAbsensiStore(
    (state) => state.setIsModalKoordinatOpen,
  );

  const fetchJamKerja = useJamKerjaStore((state) => state.fetchJamKerja);

  const fetchAllAbsensiByUserFilter = useAbsensiStore(
    (state) => state.fetchAllAbsensiByUserFilter,
  );

  const isModalFilterOpen = useAbsensiStore((state) => state.isModalFilterOpen);
  const setIsModalFilterOpen = useAbsensiStore(
    (state) => state.setIsModalFilterOpen,
  );

  const jadwals = useJadwalKerjaStore((state) => state.jadwalKerja);
  const fetchJadwalKerjaPegawaiByUserFilter = useJadwalKerjaStore(
    (state) => state.fetchJadwalKerjaPegawaiByUserFilter,
  );

  const getTahunOption = () => {
    const tahun = new Date().getFullYear(); // Mendapatkan tahun saat ini
    const options = [];
    for (let i = tahun; i >= 2024; i--) {
      options.push({ value: i.toString(), label: i.toString() });
    }

    setTahunOptions(options);
    setFilterTahun(options.length === 1 ? options[0].value : "");
  };

  const getBulanOption = () => {
    const options = [
      {
        value: "01",
        label: "Januari",
      },
      {
        value: "02",
        label: "Februari",
      },
      {
        value: "03",
        label: "Maret",
      },
      {
        value: "04",
        label: "April",
      },
      {
        value: "05",
        label: "Mei",
      },
      {
        value: "06",
        label: "Juni",
      },
      {
        value: "07",
        label: "Juli",
      },
      {
        value: "08",
        label: "Agustus",
      },
      {
        value: "09",
        label: "September",
      },
      {
        value: "10",
        label: "Oktober",
      },
      {
        value: "11",
        label: "November",
      },
      {
        value: "12",
        label: "Desember",
      },
    ];

    setBulanOptions(options);
  };
  const getMonthName = (monthNumber: number) => {
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    return months[monthNumber - 1]; // monthNumber dimulai dari 1, jadi kurangi 1 untuk akses array
  };

  const [textFilter, setTextFilter] = useState(
    `${getMonthName(new Date().getMonth() + 1)} ${new Date().getFullYear()}`,
  );

  const [query, setQuery] = useState(
    `bulan=${new Date().getMonth() + 1}&tahun=${new Date().getFullYear()}`,
  );

  const buildDateFilter = (
    filterTanggal: string,
    filterBulan: string,
    filterTahun: string,
  ) => {
    const today = new Date();
    const currentYear = today.getFullYear();

    if (filterTanggal) {
      setTextFilter(`Tanggal ${filterTanggal}`);
      return `tanggal=${filterTanggal}`;
    } else if (filterBulan && filterTahun) {
      setTextFilter(`${getMonthName(parseInt(filterBulan))} ${filterTahun}`);
      return `bulan=${filterBulan}&tahun=${filterTahun}`; // Bulan dan tahun
    } else if (filterBulan) {
      setTextFilter(`${getMonthName(parseInt(filterBulan))} ${currentYear}`);
      return `bulan=${filterBulan}&tahun=${currentYear}`; // Bulan dengan tahun saat ini
    }
    return "";
  };

  const handleFilter = async () => {
    const filter = buildDateFilter(filterTanggal, filterBulan, filterTahun);
    setQuery(filter);
    await fetchAllAbsensiByUserFilter(session?.user?.id as string, query);
  };

  const handleReset = async () => {
    setQuery(
      `bulan=${new Date().getMonth() + 1}&tahun=${new Date().getFullYear()}`,
    ); // Reset query ke bulan dan tahun saat ini
    setTextFilter(
      `${getMonthName(new Date().getMonth() + 1)} ${new Date().getFullYear()}`,
    );
    await fetchAllAbsensiByUserFilter(
      session?.user?.id as string,
      `bulan=${new Date().getMonth() + 1}&tahun=${new Date().getFullYear()}`,
    );
  };

  useEffect(() => {
    getTahunOption();
    getBulanOption();
    fetchJamKerja();
    fetchAllAbsensiByUserFilter(session?.user?.id as string, query);
    fetchJadwalKerjaPegawaiByUserFilter(session?.user?.id as string, query);
  }, [
    fetchAllAbsensiByUserFilter,
    fetchJadwalKerjaPegawaiByUserFilter,
    fetchJamKerja,
    query,
    session?.user?.id,
  ]);

  return (
    <>
      <Tabs orientation="vertical" defaultValue="absensi" className="space-y-4">
        <div className="w-full overflow-x-auto pb-2">
          <TabsList>
            <TabsTrigger value="absensi">Absensi</TabsTrigger>
            <TabsTrigger value="lembur">Lembur</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="absensi" className="space-y-4">
          <>
            <h3 className="font-medium">
              Filter : <span>{textFilter}</span>
            </h3>

            <AbsensiCustomTable
              mappedAbsensis={absensis}
              jadwals={jadwals}
              absensiColumns={absensiColumns}
              setIsModalFilterOpen={() => setIsModalFilterOpen(true)}
            />
          </>
        </TabsContent>
        <TabsContent value="lembur" className="space-y-4">
          <UserLemburTable />
        </TabsContent>
      </Tabs>
      {/* modal div */}
      <>
        <Modal
          isOpen={isModalCreateOpen}
          textHeader="Create Pegawai"
          onClose={() => setIsModalCreateOpen(false)}
        >
          <p>s</p>
        </Modal>

        {/* filter */}
        <Modal
          isOpen={isModalFilterOpen}
          textHeader="Filter Absensi"
          widthScreenSize="lg"
          onClose={() => setIsModalFilterOpen(false)}
        >
          <div>
            <h2 className="mb-2 text-sm md:text-base">Tanggal</h2>
            <input
              type="date"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              onChange={(e) => setFilterTanggal(e.target.value)}
              value={filterTanggal}
            />
            <h2 className="mb-2 text-sm md:text-base">Tahun</h2>
            <select
              value={filterBulan}
              onChange={(e) => setFilterBulan(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              {bulanOptions.map((bulan, index) => (
                <option className="text-black" key={index} value={bulan.value}>
                  {bulan.label}
                </option>
              ))}
            </select>
            <h2 className="mb-2 text-sm md:text-base">Tahun</h2>
            <select
              value={filterTahun}
              onChange={(e) => setFilterTahun(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              {tahunOptions.map((tahun, index) => (
                <option className="text-black" key={index} value={tahun.value}>
                  {tahun.label}
                </option>
              ))}
            </select>
            <div>
              <Button
                className="mr-2 mt-2 border-black"
                variant="outline"
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button className="mt-2" onClick={handleFilter}>
                Filter
              </Button>
            </div>
          </div>
        </Modal>

        {/* detail koordinat */}
        <Modal
          isOpen={isModalKoordinatOpen}
          textHeader="Koordinat Absen"
          widthScreenSize="2xl"
          onClose={() => setIsModalKoordinatOpen(false)}
        >
          <div className="flex justify-between space-x-2">
            <div>
              <h2 className="mb-2">Koordinat Masuk</h2>
              {absensiData?.koordinat_masuk ? (
                <iframe
                  id="googleMap"
                  src={`https://maps.google.com/maps?q=${absensiData?.koordinat_masuk?.split(",")[0]},${absensiData?.koordinat_masuk?.split(",")[1]}&z=15&output=embed&layer=t`}
                  className="h-72 w-[300px] rounded-md md:w-[300px]"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              ) : (
                <div className="flex h-72 w-[300px] items-center justify-center rounded-md bg-gray-200 md:w-[300px]">
                  <p className="text-center text-sm font-semibold text-gray-600">
                    Tidak Ada Koordinat
                    <br />
                    atau belum absen
                  </p>
                </div>
              )}
            </div>
            <div>
              <h2 className="mb-2">Koordinat Pulang</h2>
              {absensiData?.koordinat_pulang ? (
                <iframe
                  id="googleMap"
                  src={`https://maps.google.com/maps?q=${absensiData?.koordinat_pulang?.split(",")[0]},${absensiData?.koordinat_pulang?.split(",")[1]}&z=15&output=embed&layer=t`}
                  className="h-72 w-[300px] rounded-md md:w-[300px]"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              ) : (
                <div className="flex h-72 w-[300px] items-center justify-center rounded-md bg-gray-200 md:w-[300px]">
                  <p className="text-center text-sm font-semibold text-gray-600">
                    Tidak Ada Koordinat
                    <br />
                    atau belum pulang
                  </p>
                </div>
              )}
            </div>
          </div>
        </Modal>
      </>
    </>
  );
};

export default AbsensiTable;
