/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/table/data-table";
import { useEffect, useState } from "react";
import Select from "react-select";
import Modal from "@/components/custom/modal";
import {} from "@/store/absensi/absensiStore";
import { Button } from "@/components/custom/button";
import { permohonanIzinColumns } from "./PermohonanIzinColumns";
// import Image from "next/image";
import { usePermohonanIzinStore } from "@/store/permohonanIzin/permohonanIzinStore";
import Image from "next/image";
import ModalToast from "@/components/custom/modal-toast";

interface Option {
  value: string;
  label: string;
}

const PermohonanIzinTable = () => {
  const [toast, setToast] = useState({
    open: false,
    type: "success",
    message: "",
  });

  const permpohonanIzins = usePermohonanIzinStore(
    (state) => state.permohonanIzin,
  );

  const fetchPermohonanIzinByFilter = usePermohonanIzinStore(
    (state) => state.fetchPermohonanIzinByFilter,
  );

  const isModalFilterOpen = usePermohonanIzinStore(
    (state) => state.isModalFilterOpen,
  );
  const setIsModalFilterOpen = usePermohonanIzinStore(
    (state) => state.setIsModalFilterOpen,
  );

  const isModalEditOpen = usePermohonanIzinStore(
    (state) => state.isModalEditOpen,
  );
  const setIsModalEditOpen = usePermohonanIzinStore(
    (state) => state.setIsModalEditOpen,
  );

  const isModalDetailOpen = usePermohonanIzinStore(
    (state) => state.isModalDetailOpen,
  );
  const setIsModalDetailOpen = usePermohonanIzinStore(
    (state) => state.setIsModalDetailOpen,
  );
  const permohonanIzinData = usePermohonanIzinStore(
    (state) => state.permohonanIzinData,
  );

  const updateStatusPermohonanIzin = usePermohonanIzinStore(
    (state) => state.updateStatusPermohonanIzin,
  );

  const [statusIzin, setStatusIzin] = useState<string>(
    permohonanIzinData?.status || "",
  );
  const statusOptions: Option[] = [
    { value: "pending", label: "pending" },
    { value: "diterima", label: "diterima" },
    { value: "ditolak", label: "ditolak" },
    { value: "proses", label: "proses" },
  ];

  const [tahunOptions, setTahunOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [bulanOptions, setBulanOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const [filterTahun, setFilterTahun] = useState("");
  const [filterBulan, setFilterBulan] = useState("");
  const [filterTanggal, setFilterTanggal] = useState("");

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
    const options: Option[] = [
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

  const date = new Date();
  const [query, setQuery] = useState(
    `bulan=${date.getMonth() + 1}&tahun=${date.getFullYear()}`,
  );
  const [textFilter, setTextFilter] = useState(`
    ${getMonthName(date.getMonth() + 1)} ${date.getFullYear()}`);

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
    await fetchPermohonanIzinByFilter(query);
  };

  const handleReset = async () => {
    setQuery(`bulan=${date.getMonth() + 1}&tahun=${date.getFullYear()}`);
    setTextFilter(`${getMonthName(date.getMonth() + 1)} ${date.getFullYear()}`);
    await fetchPermohonanIzinByFilter(query);
  };

  const handleUpdate = async () => {
    try {
      await updateStatusPermohonanIzin(
        statusIzin as string,
        permohonanIzinData?.id_permohonan_izin as string,
      );
      await fetchPermohonanIzinByFilter(query);
      setToast({
        open: true,
        message: "Status Izin Berhasil Diubah",
        type: "success",
      });
      setIsModalEditOpen(false);
    } catch (error) {
      setToast({
        open: true,
        message: "Status Izin Gagal Diubah",
        type: "error",
      });
      console.error(error);
    }
  };

  useEffect(() => {
    getTahunOption();
    getBulanOption();
    fetchPermohonanIzinByFilter(query);
    setStatusIzin(permohonanIzinData?.status as string);
  }, [fetchPermohonanIzinByFilter, query, permohonanIzinData]);

  return (
    <>
      {/* toasr */}
      <ModalToast
        isOpen={toast.open}
        message={toast.message}
        type={toast.type as "success" | "error"}
      />
      <div className="space-y-4">
        <h3>
          Filter : <span>{textFilter}</span>
        </h3>
        <DataTable
          data={permpohonanIzins}
          columns={permohonanIzinColumns}
          onFilterChange={() => setIsModalFilterOpen(true)}
          // onClickTambah={() => setIsModalCreateOpen(true)}
        />
      </div>

      {/* modal div */}
      <>
        {/* update status */}
        <Modal
          isOpen={isModalEditOpen}
          textHeader="Update Status Permohonan Izin"
          heightScreenSize="lg"
          onClose={() => setIsModalEditOpen(false)}
        >
          <Select
            options={statusOptions}
            className="w-full rounded-md dark:text-black"
            classNamePrefix="react-select"
            placeholder="Select status lembur"
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "black", // Warna border saat di-focus
                primary25: "#e5e7eb", // Warna abu-abu terang saat di-hover
                primary50: "#d1d5db", // Warna abu-abu saat di-click
                neutral20: "black", // Border default
                neutral80: "black",
              },
            })}
            onChange={(selectedOption) =>
              setStatusIzin(selectedOption ? String(selectedOption.value) : "")
            }
            defaultValue={
              statusOptions.find(
                (option: Option) =>
                  String(option.value) === String(permohonanIzinData?.status),
              ) || null
            }
            value={
              statusOptions.find(
                (option: any) => String(option.value) === String(statusIzin),
              ) || null
            }
          />
          <Button onClick={handleUpdate} className="mt-48 w-full">
            Update
          </Button>
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

        {/* detail */}
        <Modal
          isOpen={isModalDetailOpen}
          textHeader="Bukti Permohonan Izin"
          heightScreenSize="2xl"
          widthScreenSize="2xl"
          onClose={() => setIsModalDetailOpen(false)}
        >
          <div>
            {permohonanIzinData?.format_bukti === "image" ? (
              <Image
                src={permohonanIzinData?.bukti ?? ""}
                alt="bukti"
                width={500}
                height={500}
                className="w-full rounded-md"
              />
            ) : (
              <iframe
                src={permohonanIzinData?.bukti ?? ""}
                width="100%"
                height="500px"
                className="w-full rounded-md"
              ></iframe>
            )}
          </div>
        </Modal>
      </>
    </>
  );
};

export default PermohonanIzinTable;
