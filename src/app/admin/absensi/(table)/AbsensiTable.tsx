"use client";

import { DataTable } from "@/components/table/data-table";
import { useEffect, useState } from "react";
import Modal from "@/components/custom/modal";
import { useAbsensiStore } from "@/store/absensi/absensiStore";
import { absensiColumns } from "./AbsensiColumns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useJamKerjaStore } from "@/store/jamKerja/jamKerjaStore";
import { Button } from "@/components/custom/button";
import AbsensiPegawaiTable from "../(table pegawai)/AbsensiPegawaiTable";

const AbsensiTable = () => {
  const [query, setQuery] = useState("");
  const [tahunOptions, setTahunOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [bulanOptions, setBulanOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const [filterTahun, setFilterTahun] = useState("");
  const [filterBulan, setFilterBulan] = useState("");
  const [filterTanggal, setFilterTanggal] = useState("");
  const [textFilter, setTextFilter] = useState("Hari Ini");

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

  const fetchAbsensiByFilter = useAbsensiStore(
    (state) => state.fetchAllAbsensiByFilter,
  );

  const isModalFilterOpen = useAbsensiStore((state) => state.isModalFilterOpen);
  const setIsModalFilterOpen = useAbsensiStore(
    (state) => state.setIsModalFilterOpen,
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
  const buildDateFilter = (
    filterTanggal: string,
    filterBulan: string,
    filterTahun: string,
  ) => {
    const today = new Date();
    const currentYear = today.getFullYear();
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
    await fetchAbsensiByFilter(filter);
  };

  useEffect(() => {
    fetchJamKerja();
    getTahunOption();
    getBulanOption();
    const date = new Date();

    // Menyesuaikan waktu agar sesuai dengan GMT+7
    date.setHours(date.getHours() + 7);

    const thisDay = "tanggal=" + date.toISOString().split("T")[0];
    fetchAbsensiByFilter(query !== "" ? query : thisDay);
  }, [fetchAbsensiByFilter, fetchJamKerja, query]);

  return (
    <>
      <Tabs orientation="vertical" defaultValue="table" className="space-y-4">
        <div className="w-full overflow-x-auto pb-2">
          <TabsList>
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="pegawai">Pegawai</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="table" className="space-y-4">
          <>
            <h3>
              Filter : <span>{textFilter}</span>
            </h3>
            <DataTable
              data={absensis}
              columns={absensiColumns}
              onFilterChange={() => setIsModalFilterOpen(true)}
              // onClickTambah={() => setIsModalCreateOpen(true)}
            />
          </>
        </TabsContent>
        <TabsContent value="pegawai">
          <AbsensiPegawaiTable />
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
                onClick={() => {
                  setFilterTanggal("");
                  setFilterBulan("");
                  setFilterTahun("");
                }}
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
