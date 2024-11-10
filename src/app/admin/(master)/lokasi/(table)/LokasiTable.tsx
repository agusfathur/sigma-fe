"use client";

import { DataTable } from "@/components/table/data-table";
import { useEffect, useState } from "react";
import Modal from "@/components/custom/modal";
import ModalDelete from "@/components/custom/modal-delete";
import { lokasiColumns } from "./LokasiColumns";
import { useLokasiStore } from "@/store/lokasi/lokasiStore";
import LokasiDetail from "../(form)/LokasiDetail";
import LokasiCreateForm from "../(form)/LokasiCreateForm";
import LokasiUpdateForm from "../(form)/LokasiEditForm";

const LokasiTable = () => {
  const fetchLokasi = useLokasiStore((state) => state.fetchLokasi);
  const lokasis = useLokasiStore((state) => state.lokasi);

  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

  const lokasiData = useLokasiStore((state) => state.lokasiData);

  //   function Delete
  const deleteLokasi = useLokasiStore((state) => state.deleteLokasi);

  const isModalDeleteOpen = useLokasiStore((state) => state.isModalDeleteOpen);
  const setIsModalDeleteOpen = useLokasiStore(
    (state) => state.setIsModalDeleteOpen,
  );

  const isModalEditOpen = useLokasiStore((state) => state.isModalEditOpen);
  const setIsModalEditOpen = useLokasiStore(
    (state) => state.setIsModalEditOpen,
  );

  const isModalDetailOpen = useLokasiStore((state) => state.isModalDetailOpen);
  const setIsModalDetailOpen = useLokasiStore(
    (state) => state.setIsModalDetailOpen,
  );

  useEffect(() => {
    fetchLokasi();
  }, [fetchLokasi]);

  const onSuccess = () => {
    fetchLokasi();
    if (isModalCreateOpen) {
      setIsModalCreateOpen(false);
    } else if (isModalEditOpen) {
      setIsModalEditOpen(false);
    }
  };

  const handleDelete = () => {
    if (!lokasiData) return;
    try {
      deleteLokasi(lokasiData?.id_lokasi);
    } catch (error) {
      console.log(error);
    } finally {
      setIsModalDeleteOpen(false);
    }
  };
  return (
    <>
      <DataTable
        data={lokasis}
        columns={lokasiColumns}
        onClickTambah={() => setIsModalCreateOpen(true)}
      />

      <Modal
        isOpen={isModalCreateOpen}
        textHeader="Create Data Lokasi"
        widthScreenSize="3xl"
        onClose={() => setIsModalCreateOpen(false)}
      >
        <LokasiCreateForm onSuccess={onSuccess} />
      </Modal>

      <Modal
        isOpen={isModalEditOpen}
        textHeader="Edit Data Lokasi"
        widthScreenSize="3xl"
        onClose={() => setIsModalEditOpen(false)}
      >
        <LokasiUpdateForm onSuccess={onSuccess} />
      </Modal>

      <Modal
        isOpen={isModalDeleteOpen}
        textHeader="Delete Data Lokasi"
        onClose={() => setIsModalDeleteOpen(false)}
      >
        <ModalDelete
          textHeader="Kamu Yakin Menghapus Lokasi Ini?"
          handleDelete={handleDelete}
          setIsModalDeleteOpen={setIsModalDeleteOpen}
        />
      </Modal>

      <Modal
        isOpen={isModalDetailOpen}
        textHeader="Detail Data Lokasi"
        widthScreenSize="3xl"
        onClose={() => setIsModalDetailOpen(false)}
      >
        <LokasiDetail />
      </Modal>
    </>
  );
};

export default LokasiTable;
