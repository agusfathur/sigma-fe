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
import axiosJWT from "@/lib/authJWT";
import { LapRekapGajiColumns } from "./LapRekapGajiColumns";
import { LapRekapGajiPDF } from "../(pdf)/LapRekapGajiPDF";

interface Option {
  value: string;
  label: string;
}

export interface RekapGaji {
  bulan: number;
  tahun: number;
  totalGajiPokok: number;
  totalTunjangan: number;
  totalPotongan: number;
  totalPengeluaran: number;
}

const LapRekapGajiTable = () => {
  const {
    isOpen: toastOpen,
    message,
    type: toastType,
    setToast,
  } = useToastStore();
  const date = new Date();
  const [isModalFilterOpen, setIsModalFilterOpen] = useState(false);
  const [rekapGaji, setRekapGaji] = useState<RekapGaji[]>([]);

  const { fetchDataSekolah, dataSekolah } = useDataSekolahStore();

  const downloadLinkRef = useRef<any>(null);

  // filter code start
  const [filterTahun, setFilterTahun] = useState("");

  const [query, setQuery] = useState(`${date.getFullYear()}`);
  const [tahunOptions, setTahunOptions] = useState<Option[]>([]);

  const [textFilter, setTextFilter] = useState(`${date.getFullYear()}`);

  const buildDateFilter = (filterTahun: string) => {
    const today = new Date();
    const currentYear = today.getFullYear();

    if (filterTahun) {
      setTextFilter(`${filterTahun}`);
      return `${filterTahun}`; // Bulan dan tahun
    } else {
      setTextFilter(`${currentYear}`);
      return `${currentYear}`; // Bulan dengan tahun saat ini
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
    const filter = buildDateFilter(filterTahun);
    setQuery(filter);
  };
  const handleResetFilter = () => {
    setFilterTahun("");
    setQuery(`${date.getFullYear()}`);
    setTextFilter(`${date.getFullYear()}`);
  };
  // filter code end

  const handleDownloadPDF = () => {
    // Men-trigger click pada elemen PDFDownloadLink
    downloadLinkRef.current?.click();
  };

  useEffect(() => {
    getTahunOption();
    const initializeData = async () => {
      await fetchDataSekolah();
      try {
        const res = await axiosJWT.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/slip-gaji/rekap/2024`,
        );

        setRekapGaji(res.data.data);
      } catch (error: any) {
        console.log(error);
        setToast({
          isOpen: true,
          message: "Gagal mengambil data rekap gaji",
          type: "error",
        });
      }
    };

    initializeData();
  }, [query, fetchDataSekolah, setToast]);

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
            <LapRekapGajiPDF
              rekapGaji={rekapGaji}
              dataSekolah={dataSekolah}
              filter={textFilter}
            />
          }
          fileName={`Laporan Rekap Gaji - ${textFilter}.pdf`}
          className="hidden"
          ref={downloadLinkRef}
        >
          Download PDF
        </PDFDownloadLink>
        <DataTable
          data={rekapGaji}
          columns={LapRekapGajiColumns}
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

export default LapRekapGajiTable;
