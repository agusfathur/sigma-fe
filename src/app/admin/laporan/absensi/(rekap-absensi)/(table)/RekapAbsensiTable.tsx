/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/table/data-table";
import { useEffect, useMemo, useRef, useState } from "react";
import Modal from "@/components/custom/modal";
import { Button } from "@/components/custom/button";
import ModalToast from "@/components/custom/modal-toast";
import { useToastStore } from "@/store/toastStore";
import { useAbsensiStore } from "@/store/absensi/absensiStore";
import { RekapAbsensiColumns, RekapAbsensiTypes } from "./RekapAbsensiColumns";
import { usePegawaiStore } from "@/store/pegawai/pegawaiStore";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { RekapAbsensiPDF } from "../(pdf)/RekapAbsensiPDF";
import { useDataSekolahStore } from "@/store/dataSekolah/dataSekolahStore";
import { useJadwalKerjaStore } from "@/store/jadwalKerja/jadwalKerjaStore";

interface Option {
  value: string;
  label: string;
}

const RekapAbsensiTable = () => {
  const {
    isOpen: toastOpen,
    message,
    type: toastType,
    setToast,
  } = useToastStore();
  const date = new Date();
  const [isModalFilterOpen, setIsModalFilterOpen] = useState(false);

  const { fetchPegawaiByFilter, pegawai } = usePegawaiStore();
  const { fetchDataSekolah, dataSekolah } = useDataSekolahStore();
  const { fetchAllAbsensiByFilter, absensi } = useAbsensiStore();
  const { fetchJadwalKerjaPegawaiByFilter, jadwalKerja } =
    useJadwalKerjaStore();

  const [dataRekap, setDataRekap] = useState<RekapAbsensiTypes[]>([]);

  const downloadLinkRef = useRef<any>(null);

  // filter code start
  const [filterTahun, setFilterTahun] = useState("");
  const [filterBulan, setFilterBulan] = useState("");

  const [query, setQuery] = useState(
    `bulan=${date.getMonth() + 1}&tahun=${date.getFullYear()}`,
  );
  const [tahunOptions, setTahunOptions] = useState<Option[]>([]);

  const bulanOptions: Option[] = [
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
    `${getMonthName(date.getMonth() + 1)} ${date.getFullYear()}`,
  );

  const buildDateFilter = (filterBulan: string, filterTahun: string) => {
    const today = new Date();
    const currentYear = today.getFullYear();

    if (filterBulan && filterTahun) {
      setTextFilter(`${getMonthName(parseInt(filterBulan))} ${filterTahun}`);
      return `bulan=${filterBulan}&tahun=${filterTahun}`; // Bulan dan tahun
    } else {
      setTextFilter(`${getMonthName(parseInt(filterBulan))} ${currentYear}`);
      return `bulan=${filterBulan}&tahun=${currentYear}`; // Bulan dengan tahun saat ini
    }
  };
  const getTahunOption = () => {
    const tahun = new Date().getFullYear(); // Mendapatkan tahun saat ini
    const options = [];
    for (let i = tahun; i >= 2024; i--) {
      options.push({ value: i.toString(), label: i.toString() });
    }

    setTahunOptions(options);
    setFilterTahun(options.length === 1 ? options[0].value : "");
  };
  const handleFilter = async () => {
    const filter = buildDateFilter(filterBulan, filterTahun);
    setQuery(filter);
  };
  const handleResetFilter = () => {
    setFilterBulan("");
    setFilterTahun("");
    setQuery(`bulan=${date.getMonth() + 1}&tahun=${date.getFullYear()}`);
    setTextFilter(`${getMonthName(date.getMonth() + 1)} ${date.getFullYear()}`);
  };
  // filter code end

  const handleDownloadPDF = () => {
    // Men-trigger click pada elemen PDFDownloadLink
    downloadLinkRef.current?.click();
  };

  useEffect(() => {
    getTahunOption();
    const initializeData = async () => {
      await fetchPegawaiByFilter("status=aktif");
      await fetchAllAbsensiByFilter(query);
      await fetchDataSekolah();

      // Modified getAbsensiByStatus function
      const getAbsensiByStatus = (pegawaiId: string, status: string) => {
        const filteredAbsensi = absensi.filter(
          (a) =>
            a.pegawai_id === pegawaiId &&
            a.status_absen.toLowerCase() === status.toLowerCase(),
        );
        return filteredAbsensi;
      };

      const formattedData: RekapAbsensiTypes[] = await Promise.all(
        pegawai.map(async (p) => {
          const jadwalCount = await fetchJadwalKerjaPegawaiByFilter(
            query,
            p.id_pegawai,
          );

          // Get counts for each status
          const hadirCount = getAbsensiByStatus(p.id_pegawai, "hadir").length;
          const terlambatCount = getAbsensiByStatus(
            p.id_pegawai,
            "terlambat",
          ).length;
          const izinCount = getAbsensiByStatus(p.id_pegawai, "izin").length;
          const cutiCount = getAbsensiByStatus(p.id_pegawai, "cuti").length;

          // Calculate tidak hadir based on jadwal count
          const tidakHadirCount =
            jadwalCount.length -
            (hadirCount + terlambatCount + izinCount + cutiCount);

          return {
            pegawai: p,
            countJadwal: jadwalCount.length,
            countHadir: hadirCount,
            countTerlambat: terlambatCount,
            countIzin: izinCount,
            countCuti: cutiCount,
            countTidakHadir: tidakHadirCount >= 0 ? tidakHadirCount : 0,
          };
        }),
      );

      setDataRekap(formattedData);
    };
    initializeData();
  }, [
    fetchAllAbsensiByFilter,
    fetchDataSekolah,
    fetchJadwalKerjaPegawaiByFilter,
    fetchPegawaiByFilter,
    pegawai,
    query,
  ]);

  return (
    <>
      <ModalToast
        isOpen={toastOpen}
        message={message}
        type={toastType}
        onClose={() =>
          setToast({ isOpen: false, message: "", type: toastType })
        }
      />
      <div className="space-y-4">
        <h3>
          Filter : <span>{textFilter}</span>
        </h3>
        <PDFDownloadLink
          document={
            <RekapAbsensiPDF
              rekapAbsensi={dataRekap}
              dataSekolah={dataSekolah}
            />
          }
          fileName={`Rekap Absensi - ${textFilter}.pdf`}
          className="hidden"
          ref={downloadLinkRef}
        >
          Download PDF
        </PDFDownloadLink>
        <DataTable
          data={dataRekap}
          columns={RekapAbsensiColumns}
          onFilterChange={() => setIsModalFilterOpen(true)}
          onPrint={handleDownloadPDF}
        />
      </div>

      {/* modal div */}
      <>
        {/* filter */}
        <Modal
          isOpen={isModalFilterOpen}
          textHeader="Filter Absensi"
          widthScreenSize="lg"
          onClose={() => setIsModalFilterOpen(false)}
        >
          <div>
            <h2 className="mb-2 text-sm md:text-base">Bulan</h2>
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
                onClick={handleResetFilter}
              >
                Reset
              </Button>
              <Button className="mt-2" onClick={handleFilter}>
                Filter
              </Button>
            </div>
          </div>
        </Modal>
      </>
    </>
  );
};

export default RekapAbsensiTable;
