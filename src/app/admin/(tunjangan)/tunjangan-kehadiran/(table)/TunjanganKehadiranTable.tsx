/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/table/data-table";
import { useEffect, useState } from "react";
import Modal from "@/components/custom/modal";
import ModalDelete from "@/components/custom/modal-delete";
import { useTunjanganKehadiranStore } from "@/store/tunjanganKehadiran/tunjanganKehadiranStore";
import { TunjanganKehadiranColumns } from "./TunjanganKehadiranColumns";
import TunjanganKehadiranCreateForm from "../(form)/TunjanganKehadiranCreateForm";
import TunjanganKehadiranEditForm from "../(form)/TunjanganKehadiranEditForm";

const TunjanganKehadiranTable = () => {
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

  const tunjanganKehadirans = useTunjanganKehadiranStore(
    (state) => state.tunjanganKehadiran,
  );

  const fetchTunjanganKehadiran = useTunjanganKehadiranStore(
    (state) => state.fetchTunjanganKehadiran,
  );

  const deleteTunjanganKehadiran = useTunjanganKehadiranStore(
    (state) => state.deleteTunjanganKehadiran,
  );

  const tunjanganKehadiranData = useTunjanganKehadiranStore(
    (state) => state.tunjanganKehadiranData,
  );

  const isModalEditOpen = useTunjanganKehadiranStore(
    (state) => state.isModalEditOpen,
  );
  const setIsModalEditOpen = useTunjanganKehadiranStore(
    (state) => state.setIsModalEditOpen,
  );

  const isModalDeleteOpen = useTunjanganKehadiranStore(
    (state) => state.isModalDeleteOpen,
  );
  const setIsModalDeleteOpen = useTunjanganKehadiranStore(
    (state) => state.setIsModalDeleteOpen,
  );

  const handleDelete = async () => {
    try {
      await deleteTunjanganKehadiran(
        tunjanganKehadiranData?.id_tunjangan_kehadiran as string,
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

    await fetchTunjanganKehadiran();
  };

  useEffect(() => {
    fetchTunjanganKehadiran();
  }, [fetchTunjanganKehadiran]);

  return (
    <>
      <div className="space-y-4">
        <DataTable
          data={tunjanganKehadirans}
          columns={TunjanganKehadiranColumns}
          // onFilterChange={() => setIsModalFilterOpen(true)}
          onClickTambah={() => setIsModalCreateOpen(true)}
        />
      </div>

      {/* modal div */}
      <>
        {/* create */}
        <Modal
          isOpen={isModalCreateOpen}
          textHeader="Create Tunjangan Kehadiran"
          widthScreenSize="lg"
          onClose={() => setIsModalCreateOpen(false)}
        >
          <TunjanganKehadiranCreateForm onSuccess={onSuccess} />
        </Modal>

        {/* edit */}
        <Modal
          isOpen={isModalEditOpen}
          textHeader="Create Tunjangan Kehadiran"
          widthScreenSize="lg"
          onClose={() => setIsModalEditOpen(false)}
        >
          <TunjanganKehadiranEditForm onSuccess={onSuccess} />
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

export default TunjanganKehadiranTable;
