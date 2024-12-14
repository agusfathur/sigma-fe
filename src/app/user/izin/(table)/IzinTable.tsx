/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/table/data-table";
import { useCallback, useEffect, useMemo, useState } from "react";
import Modal from "@/components/custom/modal";
import { Button } from "@/components/custom/button";
import { permohonanIzinColumns } from "./IzinColumns";
import { usePermohonanIzinStore } from "@/store/permohonanIzin/permohonanIzinStore";
import { useSession } from "next-auth/react";
import IzinCreateForm from "../(form)/IzinCreateForm";
import ModalDelete from "@/components/custom/modal-delete";
import Image from "next/image";
import { useToastStore } from "@/store/toastStore";
import ModalToast from "@/components/custom/modal-toast";
import axiosJWT from "@/lib/authJWT";
import { PermohonanIzin } from "@/store/permohonanIzin/permohonanIzin.types";
import { useJadwalKerjaStore } from "@/store/jadwalKerja/jadwalKerjaStore";
import { useAbsensiStore } from "@/store/absensi/absensiStore";
import { Absensi } from "@/store/absensi/absensi.types";
import { JadwalKerja } from "@/store/jadwalKerja/jadwalKerja.types";

interface Option {
  value: string;
  label: string;
}

const IzinTable = () => {
  const { data: session } = useSession();
  const {
    isOpen: toastOpen,
    message,
    type: toastType,
    setToast,
  } = useToastStore();
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [sumIzin, setSumIzin] = useState({
    tidak_hadir: 0,
    cuti: 0,
  });
  const {
    permohonanIzin: permpohonanIzins,
    fetchPermohonanIzinByUserFilter,
    fetchPermohonanIzinByTahun,
    deletePermohonanIzin: deleteIzin,
    isModalFilterOpen,
    setIsModalFilterOpen,
    isModalDeleteOpen,
    setIsModalDeleteOpen,
    isModalDetailOpen,
    setIsModalDetailOpen,
    permohonanIzinData,
  } = usePermohonanIzinStore();

  const { fetchJadwalKerjaPegawaiByUserFilter } = useJadwalKerjaStore();
  const { fetchAllAbsensiByUserFilter } = useAbsensiStore();

  const [tahunOptions, setTahunOptions] = useState<Option[]>([]);
  const [bulanOptions, setBulanOptions] = useState<Option[]>([]);

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
        value: "",
        label: "Semua",
      },
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

  const date = useMemo(() => new Date(), []);
  const [query, setQuery] = useState(`tahun=${date.getFullYear()}`);
  const [textFilter, setTextFilter] = useState(`Tahun ${date.getFullYear()}`);

  const buildDateFilter = (
    filterTanggal: string,
    filterBulan: string,
    filterTahun: string,
  ) => {
    const today = new Date();
    const currentYear = today.getFullYear();

    if (filterTanggal) {
      console.log("masuk tgl");
      setTextFilter(`Tanggal ${filterTanggal}`);
      return `tanggal=${filterTanggal}`;
    } else if (filterBulan && filterTahun) {
      setTextFilter(`${getMonthName(parseInt(filterBulan))} ${filterTahun}`);
      return `bulan=${filterBulan}&tahun=${filterTahun}`; // Bulan dan tahun
    } else if (filterBulan) {
      console.log("masuk bulan");
      setTextFilter(`${getMonthName(parseInt(filterBulan))} ${currentYear}`);
      return `bulan=${filterBulan}&tahun=${currentYear}`; // Bulan dengan tahun saat ini
    } else if (filterTahun && filterBulan === "") {
      setTextFilter(`Tahun ${filterTahun}`);
      return `tahun=${filterTahun}`;
    }
    return "";
  };

  const handleFilter = async () => {
    const filter = buildDateFilter(filterTanggal, filterBulan, filterTahun);
    setQuery(filter);
    await fetchPermohonanIzinByUserFilter(session?.user.id as string, query);
  };

  const handleDelete = async () => {
    if (!permohonanIzinData) return;
    try {
      await deleteIzin(permohonanIzinData?.id_permohonan_izin as string);
      await fetchPermohonanIzinByUserFilter(session?.user.id as string, query);
      setToast({
        isOpen: true,
        type: "success",
        message: "Izin Cuti berhasil dihapus",
      });
    } catch (error) {
      setToast({
        isOpen: true,
        type: "error",
        message: "Izin Cuti gagal dihapus",
      });
      console.log(error);
    } finally {
      await onSuccess();
    }
  };

  const getSumIzin = useCallback(async () => {
    const tanggalHariIni = new Date()
      .toLocaleDateString("id-ID")
      .split("/")
      .map((part) => part.padStart(2, "0"))
      .reverse()
      .join("-");
    try {
      const getIzins =
        (await fetchPermohonanIzinByTahun(
          date.getFullYear().toString(),
          session?.user.id as string,
        )) || [];
      const getJadwal =
        (await fetchJadwalKerjaPegawaiByUserFilter(
          session?.user.id as string,
          `tahun=${date.getFullYear()}`,
        )) || [];

      const getAbsensi =
        (await fetchAllAbsensiByUserFilter(
          session?.user.id as string,
          `tahun=${date.getFullYear()}`,
        )) || [];

      const filterIzinDiterima = getIzins.filter(
        (izin: PermohonanIzin) => izin.status === "diterima",
      );
      const filterJadwal = getJadwal.filter((jadwal: JadwalKerja) => {
        const jadwalTanggal = new Date(jadwal.tanggal); // Konversi tanggal jadwal ke objek Date
        const hariIni = new Date(tanggalHariIni); // Konversi tanggal hari ini ke objek Date
        return jadwalTanggal <= hariIni; // Bandingkan dua objek Date
      });

      const filterAbsensiMasuk = getAbsensi.filter(
        (absensi: Absensi) =>
          absensi.status_absen === "hadir" ||
          absensi.status_absen === "terlambat",
      );

      setSumIzin({
        cuti: filterIzinDiterima.length,
        tidak_hadir: filterJadwal.length - filterAbsensiMasuk.length,
      });
    } catch (error) {
      console.log(error);
    }
  }, [
    date,
    fetchPermohonanIzinByTahun,
    session?.user.id,
    fetchJadwalKerjaPegawaiByUserFilter,
    fetchAllAbsensiByUserFilter,
  ]);

  const onSuccess = async () => {
    if (isModalCreateOpen) {
      setIsModalCreateOpen(false);
    } else if (isModalDeleteOpen) {
      setIsModalDeleteOpen(false);
    }
    await fetchPermohonanIzinByUserFilter(session?.user.id as string, query);
  };

  useEffect(() => {
    getTahunOption();
    getBulanOption();
    getSumIzin();
    fetchPermohonanIzinByUserFilter(session?.user.id as string, query);
  }, [
    fetchPermohonanIzinByUserFilter,
    getSumIzin,
    query,
    permohonanIzinData,
    session?.user?.id,
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
        <div className="flex items-center space-x-1 md:space-x-2">
          <h4 className="text-sm font-bold">Total {date.getFullYear()}</h4>
          <p className="rounded-xl bg-red-100 px-2.5 py-1 text-sm font-medium text-red-950">
            Tidak Hadir :{" "}
            <span className="font-bold">{sumIzin.tidak_hadir}</span>
          </p>
          <p className="rounded-xl bg-cyan-100 px-2.5 py-1 text-sm font-medium text-cyan-950">
            Cuti : <span className="font-bold">{sumIzin.cuti}</span>
          </p>
        </div>
        <DataTable
          data={permpohonanIzins || []}
          columns={permohonanIzinColumns}
          onFilterChange={() => setIsModalFilterOpen(true)}
          onClickTambah={() => setIsModalCreateOpen(true)}
        />
      </div>

      {/* modal div */}
      <>
        <Modal
          isOpen={isModalCreateOpen}
          textHeader="Permohonan Izin"
          widthScreenSize="xl"
          onClose={() => setIsModalCreateOpen(false)}
        >
          <IzinCreateForm onSuccess={onSuccess} />
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
                height="550px"
                className="w-full rounded-md"
              ></iframe>
            )}
          </div>
        </Modal>

        {/* delete */}

        <Modal
          isOpen={isModalDeleteOpen}
          textHeader="Hapus Permohonan Izin"
          widthScreenSize="md"
          onClose={() => setIsModalDeleteOpen(false)}
        >
          <ModalDelete
            handleDelete={handleDelete}
            setIsModalDeleteOpen={setIsModalDeleteOpen}
            textHeader="Yakin ingin menghapus permohonan izin ini?"
          />
        </Modal>

        {/* filter */}
        <Modal
          isOpen={isModalFilterOpen}
          textHeader="Filter Izin Cuti"
          widthScreenSize="lg"
          onClose={() => setIsModalFilterOpen(false)}
        >
          <div className="space-y-2">
            <h2 className="mb-2 text-sm md:text-base">Tanggal</h2>
            <input
              type="date"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              onChange={(e) => setFilterTanggal(e.target.value)}
              value={filterTanggal}
            />
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

export default IzinTable;
