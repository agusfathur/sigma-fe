/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/table/data-table";
import { useEffect, useState } from "react";
import Modal from "@/components/custom/modal";
import { Button } from "@/components/custom/button";
import { useSlipGajiStore } from "@/store/slipGaji/slipGajiStore";
import { SlipGajiColumns } from "./SlipGajiColumns";
import { useSettingGajiStore } from "@/store/settingGaji/settingGajiStore";
import SlipGajiDetail from "./slipGajiDetail";
import { useSession } from "next-auth/react";

const SlipGajiTable = () => {
  const date = new Date();
  const { data: session } = useSession();

  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

  const slipGajis = useSlipGajiStore((state) => state.slipGaji);

  const fetchSlipGajiByUserPegawai = useSlipGajiStore(
    (state) => state.fetchSlipGajiByUserPegawai,
  );
  const slipGajiData = useSlipGajiStore((state) => state.SlipGajiData);

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

  // filter code start

  const [filterTahun, setFilterTahun] = useState("");
  const [filterBulan, setFilterBulan] = useState("");

  const isModalFilterOpen = useSlipGajiStore(
    (state) => state.isModalFilterOpen,
  );
  const setIsModalFilterOpen = useSlipGajiStore(
    (state) => state.setIsModalFilterOpen,
  );
  const [query, setQuery] = useState(`tahun=${date.getFullYear()}`);
  const [tahunOptions, setTahunOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const [textFilter, setTextFilter] = useState(`${date.getFullYear()}`);

  const buildDateFilter = (filterTahun: string) => {
    const today = new Date();
    const currentYear = today.getFullYear();

    if (filterTahun) {
      setTextFilter(`${filterTahun}`);
      return `tahun=${filterTahun}`; // Bulan dan tahun
    } else {
      setTextFilter(`${currentYear}`);
      return `tahun=${currentYear}`; // Bulan dengan tahun saat ini
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
    await fetchSlipGajiByUserPegawai(session?.user.id as string, query);
  };

  const onSuccess = async () => {
    if (isModalCreateOpen) {
      setIsModalCreateOpen(false);
    } else if (isModalEditOpen) {
      setIsModalEditOpen(false);
    }
    await fetchSlipGajiByUserPegawai(session?.user.id as string, query || "");
  };

  useEffect(() => {
    getTahunOption();
    fetchSlipGajiByUserPegawai(session?.user.id as string, query || "");
  }, [
    fetchSlipGajiByUserPegawai,
    query,
    slipGajiData?.status_pembayaran,
    session?.user.id,
  ]);

  return (
    <>
      <div className="space-y-4">
        <h3>
          Filter : <span>{textFilter}</span>
        </h3>
        <DataTable
          data={slipGajis}
          columns={SlipGajiColumns}
          onFilterChange={() => setIsModalFilterOpen(true)}
        />
      </div>

      {/* modal div */}
      <>
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
