/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/table/data-table";
import { useEffect, useState } from "react";
import Modal from "@/components/custom/modal";
import { Button } from "@/components/custom/button";
import { useSlipGajiStore } from "@/store/slipGaji/slipGajiStore";
import { SlipGajiColumns } from "./SlipGajiColumns";
import SettingGajiCreateForm from "../(form)/SettingGajiForm";
import { useSettingGajiStore } from "@/store/settingGaji/settingGajiStore";
import PembayaranGajiCreateForm from "../(form)/(pembayaran-gaji)/PembayaranGajiForm";
import SlipGajiDetail from "./slipGajiDetail";
import ModalToast from "@/components/custom/modal-toast";
import { useToastStore } from "@/store/toastStore";

interface Option {
  value: string;
  label: string;
}

const SlipGajiTable = () => {
  const {
    isOpen: toastOpen,
    message,
    type: toastType,
    setToast,
  } = useToastStore();
  const date = new Date();

  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalSettingOpen, setIsModalSettingOpen] = useState(false);

  const slipGajis = useSlipGajiStore((state) => state.slipGaji);

  const fetchSlipGajiByFilter = useSlipGajiStore(
    (state) => state.fetchSlipGajiByFilter,
  );
  const slipGajiData = useSlipGajiStore((state) => state.SlipGajiData);
  const insertSlipGaji = useSlipGajiStore((state) => state.insertSlipGaji);
  const updateSlipGaji = useSlipGajiStore((state) => state.updateSlipGaji);

  const fetchSettingGaji = useSettingGajiStore(
    (state) => state.fetchSettingGaji,
  );

  const isModalEditOpen = useSlipGajiStore((state) => state.isModalEditOpen);
  const setIsModalEditOpen = useSlipGajiStore(
    (state) => state.setIsModalEditOpen,
  );
  const isModalDetailOpen = useSlipGajiStore(
    (state) => state.isModalDetailOpen,
  );
  const setIsModalDetailOpen = useSlipGajiStore(
    (state) => state.setIsModalDetailOpen,
  );

  // create
  const [tahunCreateOptions, setTahunCreateOptions] = useState<Option[]>([]);
  const [bulanCreateOptions, setBulanCreateOptions] = useState<Option[]>([]);

  const [tahunCreate, setTahunCreate] = useState(Number(date.getFullYear()));
  const [bulanCreate, setBulanCreate] = useState(Number(date.getMonth() + 1));

  // create end

  // filter code start

  const [filterTahun, setFilterTahun] = useState("");
  const [filterBulan, setFilterBulan] = useState("");

  const isModalFilterOpen = useSlipGajiStore(
    (state) => state.isModalFilterOpen,
  );
  const setIsModalFilterOpen = useSlipGajiStore(
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
    setBulanCreateOptions(options);
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
    `Bulan ${getMonthName(date.getMonth() + 1)} ${date.getFullYear()}`,
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
    setTahunCreateOptions(options);
    setFilterTahun(options.length === 1 ? options[0].value : "");
  };
  const handleFilter = async () => {
    const filter = buildDateFilter(filterBulan, filterTahun);
    setQuery(filter);
    await fetchSlipGajiByFilter(query);
  };
  // filter code end

  // const handleUpdate = async () => {
  //   try {
  //     await updateStatusPinjaman(
  //       pinjamanData?.id_pinjaman as string,
  //       statusPinjaman as string,
  //     );
  //     onSuccess();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleCreate = async () => {
    try {
      const check = await fetchSlipGajiByFilter(
        `bulan=${bulanCreate}&tahun=${tahunCreate}`,
      );
      const slipGaji = slipGajis;

      if (slipGaji.length > 0) {
        await updateSlipGaji({
          bulan: bulanCreate,
          tahun: tahunCreate,
        });
      } else {
        const res = await insertSlipGaji({
          bulan: bulanCreate,
          tahun: tahunCreate,
        });
      }

      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };
  const onSuccess = async () => {
    if (isModalCreateOpen) {
      setIsModalCreateOpen(false);
    } else if (isModalEditOpen) {
      setIsModalEditOpen(false);
    }
    await fetchSlipGajiByFilter(query || "");
  };

  useEffect(() => {
    getTahunOption();
    getBulanOption();
    fetchSlipGajiByFilter(query || "");
  }, [fetchSlipGajiByFilter, query, slipGajiData?.status_pembayaran]);

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
          data={slipGajis}
          columns={SlipGajiColumns}
          onFilterChange={() => setIsModalFilterOpen(true)}
          onClickTambah={() => setIsModalCreateOpen(true)}
          onSettingChange={async () => {
            await fetchSettingGaji();
            setIsModalSettingOpen(true);
          }}
        />
      </div>

      {/* modal div */}
      <>
        {/* create */}
        <Modal
          isOpen={isModalCreateOpen}
          textHeader="Create / Update Slip Gaji"
          widthScreenSize="lg"
          onClose={() => setIsModalCreateOpen(false)}
        >
          <div>
            <h2 className="mb-2 text-sm md:text-base">Bulan</h2>
            <select
              value={bulanCreate}
              onChange={(e) => setBulanCreate(Number(e.target.value))}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              {bulanCreateOptions.map((bulan, index) => (
                <option className="text-black" key={index} value={bulan.value}>
                  {bulan.label}
                </option>
              ))}
            </select>
            <h2 className="mb-2 text-sm md:text-base">Tahun</h2>
            <select
              value={tahunCreate}
              onChange={(e) => setTahunCreate(Number(e.target.value))}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              {tahunCreateOptions.map((tahun, index) => (
                <option className="text-black" key={index} value={tahun.value}>
                  {tahun.label}
                </option>
              ))}
            </select>
            <div className="mt-3">
              <Button
                className="mr-2 mt-2 border-black"
                variant="outline"
                onClick={() => {
                  setBulanCreate(0);
                  setTahunCreate(0);
                }}
              >
                Reset
              </Button>
              <Button className="mt-2" onClick={handleCreate}>
                Create / Update Slip Gaji
              </Button>
            </div>
          </div>
        </Modal>

        {/* edit status pembayaran */}
        <Modal
          isOpen={isModalEditOpen}
          textHeader="Update Status Pembayaran"
          widthScreenSize="md"
          onClose={() => setIsModalEditOpen(false)}
        >
          <PembayaranGajiCreateForm onSuccess={onSuccess} />
        </Modal>

        {/* edit setting gaji */}
        <Modal
          isOpen={isModalSettingOpen}
          textHeader="Update Setting Gaji"
          widthScreenSize="md"
          onClose={() => setIsModalSettingOpen(false)}
        >
          <SettingGajiCreateForm
            onSuccess={() => setIsModalSettingOpen(false)}
          />
        </Modal>

        <Modal
          isOpen={isModalDetailOpen}
          textHeader="Detail Slip Gaji"
          widthScreenSize="3xl"
          onClose={() => setIsModalDetailOpen(false)}
        >
          <SlipGajiDetail />
        </Modal>

        {/* filter */}
        <Modal
          isOpen={isModalFilterOpen}
          textHeader="Filter Slip Gaji"
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
                onClick={() => {
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

export default SlipGajiTable;
