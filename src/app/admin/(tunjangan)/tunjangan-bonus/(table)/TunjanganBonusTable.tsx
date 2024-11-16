/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/table/data-table";
import { useEffect, useState } from "react";
import Modal from "@/components/custom/modal";
import { Button } from "@/components/custom/button";
import ModalDelete from "@/components/custom/modal-delete";
import THREditForm from "../(form)/TunjanganBonusEditForm";
import { useTunjanganBonusStore } from "@/store/tunjanganBonus/tunjanganBonusStore";
import { TunjanganBonusColumns } from "./TunjanganBonusColumns";
import TunjanganTetapCreateForm from "../(form)/TunjanganBonusCreateForm";

const TunjanganBonusTable = () => {
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

  const tunjanganBonuss = useTunjanganBonusStore(
    (state) => state.tunjanganBonus,
  );
  // const fetchTunjanganBonus = useTunjanganBonusStore(
  //   (state) => state.fetchTunjanganBonus,
  // );
  const fetchTunjanganBonusByFilter = useTunjanganBonusStore(
    (state) => state.fetchTunjanganBonusByFilter,
  );
  const tunjanganBonusData = useTunjanganBonusStore(
    (state) => state.tunjanganBonusData,
  );
  const deleteTunjanganBonus = useTunjanganBonusStore(
    (state) => state.deleteTunjanganBonus,
  );

  const isModalFilterOpen = useTunjanganBonusStore(
    (state) => state.isModalFilterOpen,
  );
  const setIsModalFilterOpen = useTunjanganBonusStore(
    (state) => state.setIsModalFilterOpen,
  );

  const isModalEditOpen = useTunjanganBonusStore(
    (state) => state.isModalEditOpen,
  );
  const setIsModalEditOpen = useTunjanganBonusStore(
    (state) => state.setIsModalEditOpen,
  );

  const isModalDeleteOpen = useTunjanganBonusStore(
    (state) => state.isModalDeleteOpen,
  );
  const setIsModalDeleteOpen = useTunjanganBonusStore(
    (state) => state.setIsModalDeleteOpen,
  );

  const [tahunOptions, setTahunOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const [filterTahun, setFilterTahun] = useState("");

  const getTahunOption = () => {
    const tahun = new Date().getFullYear(); // Mendapatkan tahun saat ini
    const options = [];
    for (let i = tahun; i >= 2024; i--) {
      options.push({ value: i.toString(), label: i.toString() });
    }

    setTahunOptions(options);
    setFilterTahun(options.length === 1 ? options[0].value : "");
  };

  const date = new Date();
  const [query, setQuery] = useState(`tahun=${date.getFullYear()}`);
  const [textFilter, setTextFilter] = useState(`Tahun ${date.getFullYear()}`);

  const buildDateFilter = (filterTahun: string) => {
    const today = new Date();
    const currentYear = today.getFullYear();

    if (filterTahun) {
      setTextFilter(`Tahun ${filterTahun}`);
      return `tahun=${filterTahun}`; // Bulan dan tahun
    } else {
      setTextFilter(`Tahun ${currentYear}`);
      return `tahun=${currentYear}`; // Bulan dan tahun
    }
  };

  const handleFilter = async () => {
    const filter = buildDateFilter(filterTahun);
    setQuery(filter);
    await fetchTunjanganBonusByFilter(query);
  };
  const handleDelete = async () => {
    try {
      await deleteTunjanganBonus(
        tunjanganBonusData?.id_tunjangan_bonus as string,
      );
      onSuccess();
    } catch (error) {
      console.log(error);
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

    await fetchTunjanganBonusByFilter(query);
  };

  useEffect(() => {
    getTahunOption();
    fetchTunjanganBonusByFilter(query);
  }, [fetchTunjanganBonusByFilter, query]);

  return (
    <>
      <div className="space-y-4">
        <h3>
          Filter : <span>{textFilter}</span>
        </h3>
        <DataTable
          data={tunjanganBonuss}
          columns={TunjanganBonusColumns}
          onFilterChange={() => setIsModalFilterOpen(true)}
          onClickTambah={() => setIsModalCreateOpen(true)}
        />
      </div>

      {/* modal div */}
      <>
        {/* create */}
        <Modal
          isOpen={isModalCreateOpen}
          textHeader="Create THR"
          widthScreenSize="lg"
          onClose={() => setIsModalCreateOpen(false)}
        >
          <TunjanganTetapCreateForm onSuccess={onSuccess} />
        </Modal>

        {/* edit */}
        <Modal
          isOpen={isModalEditOpen}
          textHeader="Create Tuanjangan Bonus"
          widthScreenSize="lg"
          onClose={() => setIsModalEditOpen(false)}
        >
          <THREditForm onSuccess={onSuccess} />
        </Modal>

        {/* delete */}
        <Modal
          isOpen={isModalDeleteOpen}
          textHeader="Delete THR"
          widthScreenSize="lg"
          onClose={() => setIsModalDeleteOpen(false)}
        >
          <ModalDelete
            textHeader="Kamu Yakin Menghapus Tunjangan Bonus ?"
            handleDelete={handleDelete}
            setIsModalDeleteOpen={setIsModalDeleteOpen}
          />
        </Modal>

        {/* filter */}
        <Modal
          isOpen={isModalFilterOpen}
          textHeader="Filter Absensi"
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

export default TunjanganBonusTable;
