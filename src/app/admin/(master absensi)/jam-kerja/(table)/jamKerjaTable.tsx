"use client";

import { DataTable } from "@/components/table/data-table";
import { useEffect, useState } from "react";
import Modal from "@/components/custom/modal";
import ModalDelete from "@/components/custom/modal-delete";
import { useJamKerjaStore } from "@/store/jamKerja/jamKerjaStore";
import { jamKerjaColumns } from "./jamKerjaColumns";
import JamKerjaCreateForm from "../(form)/jamKerjaCreateForm";
import JamKerjaUpdateForm from "../(form)/jamKerjaEditForm";

const JamKerjaTable = () => {
  const fetchJamKerja = useJamKerjaStore((state) => state.fetchJamKerja);
  const jamKerjas = useJamKerjaStore((state) => state.jamKerja);

  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

  const jamKerjaData = useJamKerjaStore((state) => state.jamKerjaData);

  //   function Delete
  const deleteJamKerja = useJamKerjaStore((state) => state.deleteJamKerja);

  const isModalDeleteOpen = useJamKerjaStore(
    (state) => state.isModalDeleteOpen,
  );
  const setIsModalDeleteOpen = useJamKerjaStore(
    (state) => state.setIsModalDeleteOpen,
  );

  const isModalEditOpen = useJamKerjaStore((state) => state.isModalEditOpen);
  const setIsModalEditOpen = useJamKerjaStore(
    (state) => state.setIsModalEditOpen,
  );

  useEffect(() => {
    fetchJamKerja();
  }, [fetchJamKerja]);

  const onSuccess = () => {
    fetchJamKerja();
    if (isModalCreateOpen) {
      setIsModalCreateOpen(false);
    } else if (isModalEditOpen) {
      setIsModalEditOpen(false);
    }
  };

  const handleDelete = () => {
    if (!jamKerjaData) return;
    try {
      deleteJamKerja(jamKerjaData?.id_shift_kerja);
      fetchJamKerja();
    } catch (error) {
      console.log(error);
    } finally {
      setIsModalDeleteOpen(false);
    }
  };
  return (
    <>
      <DataTable
        data={jamKerjas}
        columns={jamKerjaColumns}
        onClickTambah={() => setIsModalCreateOpen(true)}
      />

      <Modal
        isOpen={isModalCreateOpen}
        textHeader="Create Status Pegawai"
        onClose={() => setIsModalCreateOpen(false)}
      >
        <JamKerjaCreateForm onSuccess={onSuccess} />
      </Modal>

      <Modal
        isOpen={isModalEditOpen}
        textHeader="Edit Status Pegawai"
        onClose={() => setIsModalEditOpen(false)}
      >
        <JamKerjaUpdateForm onSuccess={onSuccess} />
      </Modal>

      <Modal
        isOpen={isModalDeleteOpen}
        textHeader="Delete Status Pegawai"
        onClose={() => setIsModalDeleteOpen(false)}
      >
        <ModalDelete
          textHeader="Kamu Yakin Menghapus Status Pegawai Ini?"
          handleDelete={handleDelete}
          setIsModalDeleteOpen={setIsModalDeleteOpen}
        />
      </Modal>
    </>
  );
};

export default JamKerjaTable;