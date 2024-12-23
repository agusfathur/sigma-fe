/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/table/data-table";
import { useEffect, useMemo, useRef, useState } from "react";
import Modal from "@/components/custom/modal";
import { Button } from "@/components/custom/button";
import ModalToast from "@/components/custom/modal-toast";
import { useToastStore } from "@/store/toastStore";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useDataSekolahStore } from "@/store/dataSekolah/dataSekolahStore";
import { LapPotongGajiPDF } from "../(pdf)/LapPotongGajiPDF";
import { usePotongGajiStore } from "@/store/potongGaji/potongGajiStore";
import { LapPotongGajiColumns } from "./LapPotongGajiColumns";
import { PotongGaji } from "@/store/potongGaji/potongGaji.types";

interface Option {
  value: string;
  label: string;
}

const LapPotongGajiTable = () => {
  const {
    isOpen: toastOpen,
    message,
    type: toastType,
    setToast,
  } = useToastStore();
  const date = new Date();
  const [isModalFilterOpen, setIsModalFilterOpen] = useState(false);
  const { fetchDataSekolah, dataSekolah } = useDataSekolahStore();
  const { fetchPotongGajiByFilter, potongGaji } = usePotongGajiStore();
  const [data, setData] = useState<PotongGaji[]>([]);

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
      await fetchPotongGajiByFilter(query);
      await fetchDataSekolah();
      setData(potongGaji);
    };
    initializeData();
  }, [query, fetchDataSekolah, fetchPotongGajiByFilter, potongGaji]);

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
            <LapPotongGajiPDF
              potongGajis={data}
              dataSekolah={dataSekolah}
              filter={textFilter}
            />
          }
          fileName={`Laporan Potong Gaji - ${textFilter}.pdf`}
          className="hidden"
          ref={downloadLinkRef}
        >
          Download PDF
        </PDFDownloadLink>
        <DataTable
          data={data}
          columns={LapPotongGajiColumns}
          onFilterChange={() => setIsModalFilterOpen(true)}
          onPrint={handleDownloadPDF}
        />
      </div>

      {/* modal div */}
      <>
        {/* filter */}
        <Modal
          isOpen={isModalFilterOpen}
          textHeader="Filter Laporan Slip Gaji"
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

export default LapPotongGajiTable;
