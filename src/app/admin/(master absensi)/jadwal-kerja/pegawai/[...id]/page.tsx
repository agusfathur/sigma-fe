"use client";

import { DataTable } from "@/components/table/data-table";
import { useEffect, useState } from "react";
import Modal from "@/components/custom/modal";
import ModalDelete from "@/components/custom/modal-delete";
import StatusPegawaiUpdateForm from "../../(form)/JadwalKerjaEditForm";
import { jadwalKerjaColumns } from "../../(table)/JadwalKerjaColumns";
import { useJadwalKerjaStore } from "@/store/jadwalKerja/jadwalKerjaStore";
import JadwalKerjaCreateForm from "../../(form)/JadwalKerjaCreateForm";
import { Button } from "@/components/custom/button";
import { useParams, useRouter } from "next/navigation";
import { usePegawaiStore } from "@/store/pegawai/pegawaiStore";

const JadwalKerjaTable = () => {
  const { id: pegawaiId }: { id: string } = useParams();
  const router = useRouter();

  const fetchJadwalKerjaPegawaiByFilter = useJadwalKerjaStore(
    (state) => state.fetchJadwalKerjaPegawaiByFilter,
  );
  const jadwalKerjas = useJadwalKerjaStore((state) => state.jadwalKerja);

  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

  const jadwalKerjaData = useJadwalKerjaStore((state) => state.jadwalKerjaData);

  //   function Delete
  const deleteJadwalKerja = useJadwalKerjaStore(
    (state) => state.deleteJadwalKerja,
  );

  const isModalDeleteOpen = useJadwalKerjaStore(
    (state) => state.isModalDeleteOpen,
  );
  const setIsModalDeleteOpen = useJadwalKerjaStore(
    (state) => state.setIsModalDeleteOpen,
  );

  const pegawaiData = usePegawaiStore((state) => state.pegawaiData);

  const isModalEditOpen = useJadwalKerjaStore((state) => state.isModalEditOpen);
  const setIsModalEditOpen = useJadwalKerjaStore(
    (state) => state.setIsModalEditOpen,
  );

  // filter code start

  const [filterTahun, setFilterTahun] = useState("");
  const [filterBulan, setFilterBulan] = useState("");
  const [filterTanggal, setFilterTanggal] = useState("");

  const date = new Date();

  const isModalFilterOpen = useJadwalKerjaStore(
    (state) => state.isModalFilterOpen,
  );
  const setIsModalFilterOpen = useJadwalKerjaStore(
    (state) => state.setIsModalFilterOpen,
  );

  const [query, setQuery] = useState(
    `bulan=${date.getMonth() + 1}&tahun=${date.getFullYear()}`,
  );
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

  const [textFilter, setTextFilter] = useState(
    `${getMonthName(date.getMonth() + 1)} ${date.getFullYear()}`,
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
    await fetchJadwalKerjaPegawaiByFilter(query, pegawaiId);
  };
  // filter code end

  useEffect(() => {
    getTahunOption();
    getBulanOption();
    fetchJadwalKerjaPegawaiByFilter(query, pegawaiId);
  }, [fetchJadwalKerjaPegawaiByFilter, query, pegawaiId]);

  const onSuccess = () => {
    fetchJadwalKerjaPegawaiByFilter(query, pegawaiId);
    if (isModalCreateOpen) {
      setIsModalCreateOpen(false);
    } else if (isModalEditOpen) {
      setIsModalEditOpen(false);
    }
  };

  const handleDelete = async () => {
    if (!jadwalKerjaData) return;
    try {
      await deleteJadwalKerja(jadwalKerjaData?.id_jadwal);
      await fetchJadwalKerjaPegawaiByFilter(query, pegawaiId);
    } catch (error) {
      console.log(error);
    } finally {
      setIsModalDeleteOpen(false);
    }
  };

  const handleBack = () => {
    router.back();
  };
  return (
    <div className="space-y-4">
      <div className="mb-5 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Data Jadwal Kerja : <span>{pegawaiData?.nama}</span>
        </h1>
      </div>
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
      <Button
        variant={"outline"}
        size={"sm"}
        className="border-black dark:border-white"
        onClick={handleBack}
      >
        Kembali
      </Button>
      <h3>
        Filter : <span>{textFilter}</span>
      </h3>
      <DataTable
        data={jadwalKerjas}
        columns={jadwalKerjaColumns}
        onClickTambah={() => setIsModalCreateOpen(true)}
        onFilterChange={() => setIsModalFilterOpen(true)}
      />

      <Modal
        isOpen={isModalCreateOpen}
        textHeader="Create Jadwal Kerja"
        widthScreenSize="3xl"
        onClose={() => setIsModalCreateOpen(false)}
      >
        <JadwalKerjaCreateForm
          pegawaiDataProps={pegawaiData}
          onSuccess={onSuccess}
        />
      </Modal>

      <Modal
        isOpen={isModalEditOpen}
        textHeader="Edit Jadwal Kerja"
        onClose={() => setIsModalEditOpen(false)}
      >
        <StatusPegawaiUpdateForm
          pegawaiDataProps={pegawaiData}
          onSuccess={onSuccess}
        />
      </Modal>

      <Modal
        isOpen={isModalDeleteOpen}
        textHeader="Delete Jadwal Kerja"
        onClose={() => setIsModalDeleteOpen(false)}
      >
        <ModalDelete
          textHeader="Kamu Yakin Menghapus Jadwal Kerja Ini?"
          handleDelete={handleDelete}
          setIsModalDeleteOpen={setIsModalDeleteOpen}
        />
      </Modal>
    </div>
  );
};

export default JadwalKerjaTable;
