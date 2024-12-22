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
import { usePegawaiStore } from "@/store/pegawai/pegawaiStore";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { RekapAbsensiPDF } from "../(pdf)/RekapKehadiranPDF";
import { useDataSekolahStore } from "@/store/dataSekolah/dataSekolahStore";
import {
  RekapKehadiranColumns,
  RekapKehadiranTypes,
} from "./RekapKehadiranColumns";
import { Absensi } from "@/store/absensi/absensi.types";
import { set } from "zod";

interface Option {
  value: string;
  label: string;
}

const RekapKehadiranTable = () => {
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

  const [dataRekap, setDataRekap] = useState<RekapKehadiranTypes[]>([]);

  const downloadLinkRef = useRef<any>(null);

  // filter code start
  const [filterTanggal, setFilterTanggal] = useState("");

  const tanggal = new Date()
    .toLocaleDateString("id-ID")
    .split("/")
    .map((part) => part.padStart(2, "0"))
    .reverse()
    .join("-");

  const [query, setQuery] = useState(`tanggal=${tanggal}`);

  const [textFilter, setTextFilter] = useState(tanggal);

  const handleFilter = async () => {
    setTextFilter(filterTanggal);
    setQuery("tanggal=" + filterTanggal);
  };
  const handleResetFilter = () => {
    setFilterTanggal("");
    setQuery(`bulan=${date.getMonth() + 1}&tahun=${date.getFullYear()}`);
    setTextFilter(tanggal);
  };
  // filter code end

  const handleDownloadPDF = () => {
    // Men-trigger click pada elemen PDFDownloadLink
    downloadLinkRef.current?.click();
  };

  useEffect(() => {
    const initializeData = async () => {
      await fetchPegawaiByFilter("status=aktif");
      await fetchAllAbsensiByFilter(query);
      await fetchDataSekolah();
      const formattedData: RekapKehadiranTypes[] = await Promise.all(
        pegawai.map((p) => {
          const getAbsensiByPegawai = (pegawaiId: string) => {
            const filteredAbsensi = absensi.find(
              (a) => a.pegawai_id === pegawaiId,
            );
            return filteredAbsensi;
          };
          return {
            pegawai: p,
            absensi: getAbsensiByPegawai(p.id_pegawai) || ({} as Absensi),
          };
        }),
      );

      setDataRekap(formattedData);
    };
    initializeData();
  }, [
    fetchAllAbsensiByFilter,
    fetchDataSekolah,
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
              absensi={dataRekap}
              dataSekolah={dataSekolah}
              filter={textFilter}
            />
          }
          fileName={`Kehadiran Harian - ${textFilter}.pdf`}
          className="hidden"
          ref={downloadLinkRef}
        >
          Download PDF
        </PDFDownloadLink>
        <DataTable
          data={dataRekap}
          columns={RekapKehadiranColumns}
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
            <h2 className="mb-2 text-sm md:text-base">Tanggal</h2>
            <input
              type="date"
              value={filterTanggal}
              onChange={(e) => setFilterTanggal(e.target.value)}
              className="mb-2 w-full rounded-md border border-gray-300 p-2 dark:text-black"
            />
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

export default RekapKehadiranTable;
