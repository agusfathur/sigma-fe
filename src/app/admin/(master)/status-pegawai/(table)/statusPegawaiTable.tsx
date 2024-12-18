"use client";

import { DataTable } from "@/components/table/data-table";
import { useEffect, useState } from "react";
import { statusPegawaiColumns } from "./statusPegawaiColumns";
import Modal from "@/components/custom/modal";
import ModalDelete from "@/components/custom/modal-delete";
import { useStatusKepegawaianStore } from "@/store/statusKepegawaian/statusKepegawaianStore";
import StatusPegawaiCreateForm from "../(form)/statusPegawaiCreateForm";
import StatusPegawaiUpdateForm from "../(form)/statusPegawaiEditForm";
import ModalToast from "@/components/custom/modal-toast";
import { useToastStore } from "@/store/toastStore";

const StatusPegawaiTable = () => {
  const {
    isOpen: toastOpen,
    message,
    type: toastType,
    setToast,
  } = useToastStore();

  const fetchStatusKepegawaian = useStatusKepegawaianStore(
    (state) => state.fetchStatusKepegawaian,
  );
  const statusKepegawaians = useStatusKepegawaianStore(
    (state) => state.statusKepegawaian,
  );

  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

  const statusKepegawaianData = useStatusKepegawaianStore(
    (state) => state.statusKepegawaianData,
  );

  //   function Delete
  const deleteStatusKepegawaian = useStatusKepegawaianStore(
    (state) => state.deleteStatusKepegawaian,
  );

  const isModalDeleteOpen = useStatusKepegawaianStore(
    (state) => state.isModalDeleteOpen,
  );
  const setIsModalDeleteOpen = useStatusKepegawaianStore(
    (state) => state.setIsModalDeleteOpen,
  );

  const isModalEditOpen = useStatusKepegawaianStore(
    (state) => state.isModalEditOpen,
  );
  const setIsModalEditOpen = useStatusKepegawaianStore(
    (state) => state.setIsModalEditOpen,
  );

  useEffect(() => {
    fetchStatusKepegawaian();
  }, [fetchStatusKepegawaian]);

  const onSuccess = () => {
    fetchStatusKepegawaian();
    if (isModalCreateOpen) {
      setIsModalCreateOpen(false);
    } else if (isModalEditOpen) {
      setIsModalEditOpen(false);
    }
  };

  const handleDelete = async () => {
    if (!statusKepegawaianData) return;
    try {
      await deleteStatusKepegawaian(
        statusKepegawaianData?.id_status_kepegawaian,
      );
      setToast({
        isOpen: true,
        message: "Status Pegawai Berhasil Dihapus",
        type: "success",
      });
      onSuccess();
    } catch (error) {
      setToast({
        isOpen: true,
        message: "Status Pegawai Gagal Dihapus",
        type: "error",
      });
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
        data={statusKepegawaians}
        columns={statusPegawaiColumns}
        onClickTambah={() => setIsModalCreateOpen(true)}
      />

      <Modal
        isOpen={isModalCreateOpen}
        textHeader="Create Status Pegawai"
        onClose={() => setIsModalCreateOpen(false)}
      >
        <StatusPegawaiCreateForm onSuccess={onSuccess} />
      </Modal>

      <Modal
        isOpen={isModalEditOpen}
        textHeader="Edit Status Pegawai"
        onClose={() => setIsModalEditOpen(false)}
      >
        <StatusPegawaiUpdateForm onSuccess={onSuccess} />
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

export default StatusPegawaiTable;
