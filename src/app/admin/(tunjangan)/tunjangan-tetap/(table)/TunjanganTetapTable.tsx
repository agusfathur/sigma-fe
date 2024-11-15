/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/table/data-table";
import { useEffect, useState } from "react";
import Modal from "@/components/custom/modal";
import ModalDelete from "@/components/custom/modal-delete";
import { TunjanganTetapColumns } from "./TunjanganTetapColumns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TunjanganTetapPegawaiTable from "../(table pegawai)/TunjanganTetapPegawaiTable";
import { useTunjanganTetapStore } from "@/store/tunjanganTetap/tunjanganTetapStore";
import TunjanganTetapCreateForm from "../(form)/TunjanganTetapCreateForm";
import TunjanganTetapEditForm from "../(form)/TunjanganTetapEditForm";

const TunjanganTetapTable = () => {
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

  const tunjanganTetaps = useTunjanganTetapStore(
    (state) => state.tunjanganTetap,
  );

  const fetchTunjanganTetap = useTunjanganTetapStore(
    (state) => state.fetchTunjanganTetap,
  );

  const deleteTunjanganTetap = useTunjanganTetapStore(
    (state) => state.deleteTunjanganTetap,
  );

  const tunjanganTetapData = useTunjanganTetapStore(
    (state) => state.tunjanganTetapData,
  );

  const isModalEditOpen = useTunjanganTetapStore(
    (state) => state.isModalEditOpen,
  );
  const setIsModalEditOpen = useTunjanganTetapStore(
    (state) => state.setIsModalEditOpen,
  );

  const isModalDeleteOpen = useTunjanganTetapStore(
    (state) => state.isModalDeleteOpen,
  );
  const setIsModalDeleteOpen = useTunjanganTetapStore(
    (state) => state.setIsModalDeleteOpen,
  );

  const handleDelete = async () => {
    try {
      await deleteTunjanganTetap(
        tunjanganTetapData?.id_tunjangan_tetap as string,
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

    await fetchTunjanganTetap();
  };

  useEffect(() => {
    fetchTunjanganTetap();
  }, [fetchTunjanganTetap]);

  return (
    <>
      <Tabs orientation="vertical" defaultValue="table" className="space-y-4">
        <div className="w-full overflow-x-auto pb-2">
          <TabsList>
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="pegawai">Pegawai</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="table">
          <div className="space-y-4">
            <DataTable
              data={tunjanganTetaps}
              columns={TunjanganTetapColumns}
              // onFilterChange={() => setIsModalFilterOpen(true)}
              onClickTambah={() => setIsModalCreateOpen(true)}
            />
          </div>
        </TabsContent>
        <TabsContent value="pegawai" className="space-y-4">
          <TunjanganTetapPegawaiTable />
        </TabsContent>
      </Tabs>
      {/* modal div */}
      <>
        {/* create */}
        <Modal
          isOpen={isModalCreateOpen}
          textHeader="Create Tunjangan Kehadiran"
          widthScreenSize="lg"
          onClose={() => setIsModalCreateOpen(false)}
        >
          <TunjanganTetapCreateForm onSuccess={onSuccess} />
        </Modal>

        {/* edit */}
        <Modal
          isOpen={isModalEditOpen}
          textHeader="Create Tunjangan Kehadiran"
          widthScreenSize="lg"
          onClose={() => setIsModalEditOpen(false)}
        >
          <TunjanganTetapEditForm onSuccess={onSuccess} />
        </Modal>

        {/* delete */}
        <Modal
          isOpen={isModalDeleteOpen}
          textHeader="Delete Tunjangan Kehadiran"
          widthScreenSize="lg"
          onClose={() => setIsModalDeleteOpen(false)}
        >
          <ModalDelete
            textHeader="Kamu Yakin Menghapus Tunjangan Kehadiran Ini?"
            handleDelete={handleDelete}
            setIsModalDeleteOpen={setIsModalDeleteOpen}
          />
        </Modal>
      </>
    </>
  );
};

export default TunjanganTetapTable;
