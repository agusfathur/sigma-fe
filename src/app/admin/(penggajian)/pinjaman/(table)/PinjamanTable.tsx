/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/table/data-table";
import { useEffect, useState } from "react";
import Select from "react-select";
import Modal from "@/components/custom/modal";
import { usePinjamanStore } from "@/store/pinjaman/pinjamanStore";
import { PinjamanColumns } from "./PinjamanColumns";
import { Button } from "@/components/custom/button";
import { useToastStore } from "@/store/toastStore";
import ModalToast from "@/components/custom/modal-toast";

interface Option {
  value: string;
  label: string;
}

const PinjamanTable = () => {
  const {
    isOpen: toastOpen,
    message,
    type: toastType,
    setToast,
  } = useToastStore();
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

  const pinjamans = usePinjamanStore((state) => state.pinjaman);

  const fetchPinjamanByFilter = usePinjamanStore(
    (state) => state.fetchPinjamanByFilter,
  );
  const pinjamanData = usePinjamanStore((state) => state.pinjamanData);

  const isModalEditOpen = usePinjamanStore((state) => state.isModalEditOpen);
  const setIsModalEditOpen = usePinjamanStore(
    (state) => state.setIsModalEditOpen,
  );

  const isModalDeleteOpen = usePinjamanStore(
    (state) => state.isModalDeleteOpen,
  );
  const setIsModalDeleteOpen = usePinjamanStore(
    (state) => state.setIsModalDeleteOpen,
  );

  // update code

  const updateStatusPinjaman = usePinjamanStore(
    (state) => state.updateStatusPinjaman,
  );

  const [statusPinjaman, setStatusPinjaman] = useState<string>(
    pinjamanData?.status_pinjaman || "",
  );
  const statusOptions: Option[] = [
    { value: "pending", label: "pending" },
    { value: "diterima", label: "diterima" },
    { value: "ditolak", label: "ditolak" },
    { value: "proses", label: "proses" },
  ];
  // update code end

  // filter code start

  const [filterTahun, setFilterTahun] = useState("");
  const [filterBulan, setFilterBulan] = useState("");
  const [filterTanggal, setFilterTanggal] = useState("");

  const isModalFilterOpen = usePinjamanStore(
    (state) => state.isModalFilterOpen,
  );
  const setIsModalFilterOpen = usePinjamanStore(
    (state) => state.setIsModalFilterOpen,
  );

  const [query, setQuery] = useState("");
  const [tahunOptions, setTahunOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [bulanOptions, setBulanOptions] = useState<
    { value: string; label: string }[]
  >([]);
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

  const [textFilter, setTextFilter] = useState("All");

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
    setTextFilter("All");
    return "";
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
    const filter = buildDateFilter(filterTanggal, filterBulan, filterTahun);
    setQuery(filter);
    await fetchPinjamanByFilter(query);
  };
  // filter code end

  // const handleDelete = async () => {
  //   try {
  //     await deletePinjaman(pinjamanData?.id_pinjaman as string);
  //     onSuccess();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleUpdate = async () => {
    try {
      await updateStatusPinjaman(
        pinjamanData?.id_pinjaman as string,
        statusPinjaman as string,
      );
      setToast({
        isOpen: true,
        message: "Status pinjaman berhasil diupdate",
        type: "success",
      });
      onSuccess();
    } catch (error) {
      setToast({
        isOpen: true,
        message: "Status pinjaman gagal diupdate",
        type: "error",
      });
      console.error(error);
    }
  };
  const onSuccess = async () => {
    if (isModalCreateOpen) {
      setIsModalCreateOpen(false);
    } else if (isModalEditOpen) {
      setIsModalEditOpen(false);
    } else if (isModalDeleteOpen) {
      setIsModalDeleteOpen(false);
    }
    await fetchPinjamanByFilter(query || "");
  };

  useEffect(() => {
    getTahunOption();
    getBulanOption();
    fetchPinjamanByFilter(query || "");
    setStatusPinjaman(pinjamanData?.status_pinjaman || "");
  }, [fetchPinjamanByFilter, query, pinjamanData?.status_pinjaman]);

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
        <DataTable
          data={pinjamans}
          columns={PinjamanColumns}
          onFilterChange={() => setIsModalFilterOpen(true)}
          // onClickTambah={() => setIsModalCreateOpen(true)}
        />
      </div>

      {/* modal div */}
      <>
        {/* create */}
        {/* <Modal
          isOpen={isModalCreateOpen}
          textHeader="Create Potong Gaji"
          widthScreenSize="lg"
          onClose={() => setIsModalCreateOpen(false)}
        >
          <PotongGajiCreateForm onSuccess={onSuccess} />
        </Modal> */}

        {/* edit */}
        <Modal
          isOpen={isModalEditOpen}
          textHeader="Edit Potong Gaji"
          widthScreenSize="lg"
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
              setStatusPinjaman(
                selectedOption ? String(selectedOption.value) : "",
              )
            }
            value={
              statusOptions.find(
                (option: any) =>
                  String(option.value) === String(statusPinjaman),
              ) || null
            }
          />
          <Button onClick={handleUpdate} className="mt-48 w-full">
            Update Status
          </Button>
        </Modal>

        {/* delete */}
        {/* <Modal
          isOpen={isModalDeleteOpen}
          textHeader="Delete Potong Gaji"
          widthScreenSize="lg"
          onClose={() => setIsModalDeleteOpen(false)}
        >
          <ModalDelete
            textHeader="Kamu Yakin Menghapus Potong Gaji ?"
            handleDelete={handleDelete}
            setIsModalDeleteOpen={setIsModalDeleteOpen}
          />
        </Modal> */}

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
      </>
    </>
  );
};

export default PinjamanTable;
