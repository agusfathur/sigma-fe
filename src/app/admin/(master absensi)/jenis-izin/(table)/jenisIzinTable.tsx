"use client";

import { DataTable } from "@/components/table/data-table";
import { useEffect, useState } from "react";
import Modal from "@/components/custom/modal";
import ModalDelete from "@/components/custom/modal-delete";
import StatusPegawaiUpdateForm from "../(form)/jenisIzinEditForm";
import { jenisIzinColumns } from "./jenisIzinColumns";
import { useJenisIzinStore } from "@/store/jenisIzin/jenisIzinStore";
import JenisIzinCreateForm from "../(form)/jenisIzinCreateForm";

const JenisIzinTable = () => {
  const fetchJenisIzin = useJenisIzinStore((state) => state.fetchJenisIzin);
  const jenisIzins = useJenisIzinStore((state) => state.jenisIzin);

  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

  const jenisIzinData = useJenisIzinStore((state) => state.jenisIzinData);

  //   function Delete
  const deleteJenisIzin = useJenisIzinStore((state) => state.deleteJenisIzin);

  const isModalDeleteOpen = useJenisIzinStore(
    (state) => state.isModalDeleteOpen,
  );
  const setIsModalDeleteOpen = useJenisIzinStore(
    (state) => state.setIsModalDeleteOpen,
  );

  const isModalEditOpen = useJenisIzinStore((state) => state.isModalEditOpen);
  const setIsModalEditOpen = useJenisIzinStore(
    (state) => state.setIsModalEditOpen,
  );

  useEffect(() => {
    fetchJenisIzin();
  }, [fetchJenisIzin]);

  const onSuccess = () => {
    fetchJenisIzin();
    if (isModalCreateOpen) {
      setIsModalCreateOpen(false);
    } else if (isModalEditOpen) {
      setIsModalEditOpen(false);
    }
  };

  const handleDelete = () => {
    if (!jenisIzinData) return;
    try {
      deleteJenisIzin(jenisIzinData?.id_jenis_izin);
      fetchJenisIzin();
    } catch (error) {
      console.log(error);
    } finally {
      setIsModalDeleteOpen(false);
    }
  };
  return (
    <>
      <DataTable
        data={jenisIzins}
        columns={jenisIzinColumns}
        onClickTambah={() => setIsModalCreateOpen(true)}
      />

      <Modal
        isOpen={isModalCreateOpen}
        textHeader="Create Jenis Izin"
        onClose={() => setIsModalCreateOpen(false)}
      >
        <JenisIzinCreateForm onSuccess={onSuccess} />
      </Modal>

      <Modal
        isOpen={isModalEditOpen}
        textHeader="Edit Jenis Izin"
        onClose={() => setIsModalEditOpen(false)}
      >
        <StatusPegawaiUpdateForm onSuccess={onSuccess} />
      </Modal>

      <Modal
        isOpen={isModalDeleteOpen}
        textHeader="Delete Jenis Izin"
        onClose={() => setIsModalDeleteOpen(false)}
      >
        <ModalDelete
          textHeader="Kamu Yakin Menghapus Jenis Izin Ini?"
          handleDelete={handleDelete}
          setIsModalDeleteOpen={setIsModalDeleteOpen}
        />
      </Modal>
    </>
  );
};

export default JenisIzinTable;
