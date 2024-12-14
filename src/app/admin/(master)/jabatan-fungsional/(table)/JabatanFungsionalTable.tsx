"use client";

import { DataTable } from "@/components/table/data-table";
import { useJabatanFungsionalStore } from "@/store/jabatanFungsional/jabatanFungsionalStore";
import { useEffect, useState } from "react";
import { jabatanFungsionalColumns } from "./JabatanFungsionalColumns";
import Modal from "@/components/custom/modal";
import JabatanFungsionalCreateForm from "../(form)/JabatanFungsionalCreateForm";
import ModalDelete from "@/components/custom/modal-delete";
import JabatanFungsionalUpdateForm from "../(form)/JabatanFungsionalEditForm";
import ModalToast from "@/components/custom/modal-toast";
import { useToastStore } from "@/store/toastStore";

const JabatanFungsionalTable = () => {
  const {
    isOpen: toastOpen,
    message,
    type: toastType,
    setToast,
  } = useToastStore();
  const fetchJabatanFungsional = useJabatanFungsionalStore(
    (state) => state.fetchJabatanFungsional,
  );
  const jabatanFungsionals = useJabatanFungsionalStore(
    (state) => state.jabatanFungsional,
  );

  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

  const jabatanFungsionalData = useJabatanFungsionalStore(
    (state) => state.jabatanFungsionalData,
  );

  //   function Delete
  const deleteJabatanFungsional = useJabatanFungsionalStore(
    (state) => state.deleteJabatanFungsional,
  );

  const isModalDeleteOpen = useJabatanFungsionalStore(
    (state) => state.isModalDeleteOpen,
  );
  const setIsModalDeleteOpen = useJabatanFungsionalStore(
    (state) => state.setIsModalDeleteOpen,
  );

  const isModalEditOpen = useJabatanFungsionalStore(
    (state) => state.isModalEditOpen,
  );
  const setIsModalEditOpen = useJabatanFungsionalStore(
    (state) => state.setIsModalEditOpen,
  );

  useEffect(() => {
    fetchJabatanFungsional();
  }, [fetchJabatanFungsional]);

  const onSuccess = () => {
    fetchJabatanFungsional();
    if (isModalCreateOpen) {
      setIsModalCreateOpen(false);
    } else if (isModalEditOpen) {
      setIsModalEditOpen(false);
    }
  };

  const handleDelete = () => {
    if (!jabatanFungsionalData) return;
    try {
      deleteJabatanFungsional(jabatanFungsionalData?.id_jabatan_fungsional);
    } catch (error) {
      console.log(error);
    } finally {
      setIsModalDeleteOpen(false);
    }
  };
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
      <DataTable
        data={jabatanFungsionals}
        columns={jabatanFungsionalColumns}
        onClickTambah={() => setIsModalCreateOpen(true)}
      />

      <Modal
        isOpen={isModalCreateOpen}
        textHeader="Create Jabatan Fungsional"
        onClose={() => setIsModalCreateOpen(false)}
      >
        <JabatanFungsionalCreateForm onSuccess={onSuccess} />
      </Modal>

      <Modal
        isOpen={isModalEditOpen}
        textHeader="Edit Jabatan Fungsional"
        onClose={() => setIsModalEditOpen(false)}
      >
        <p>asda</p>
        <JabatanFungsionalUpdateForm onSuccess={onSuccess} />
      </Modal>

      <Modal
        isOpen={isModalDeleteOpen}
        textHeader="Delete Jabatan Fungsional"
        onClose={() => setIsModalDeleteOpen(false)}
      >
        <ModalDelete
          textHeader="Kamu Yakin Menghapus Jabatan Fungsional Ini?"
          handleDelete={handleDelete}
          setIsModalDeleteOpen={setIsModalDeleteOpen}
        />
      </Modal>
    </>
  );
};

export default JabatanFungsionalTable;
