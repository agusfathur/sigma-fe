"use client";

import { DataTable } from "@/components/table/data-table";
import { useEffect, useState } from "react";
import Modal from "@/components/custom/modal";
import ModalDelete from "@/components/custom/modal-delete";
import { usePegawaiStore } from "@/store/pegawai/pegawaiStore";
import { pegawaiColumns } from "./PegawaiColumns";
import PegawaiCreateForm from "../(form)/PegawaiCreateForm";
import PegawaiEditForm from "../(form)/PegawaiEditForm";
import PegawaiDetail from "../(form)/PegawaiDetail";
import ModalToast from "@/components/custom/modal-toast";
import { useToastStore } from "@/store/toastStore";

const PegawaiTable = () => {
  const {
    isOpen: toastOpen,
    message,
    type: toastType,
    setToast,
  } = useToastStore();
  const fetchPegawai = usePegawaiStore((state) => state.fetchPegawai);
  const pegawais = usePegawaiStore((state) => state.pegawai);

  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

  const pegawaiData = usePegawaiStore((state) => state.pegawaiData);

  //   function Delete
  const deleteJadwalKerja = usePegawaiStore((state) => state.deletePegawai);

  const isModalDeleteOpen = usePegawaiStore((state) => state.isModalDeleteOpen);
  const setIsModalDeleteOpen = usePegawaiStore(
    (state) => state.setIsModalDeleteOpen,
  );

  const isModalEditOpen = usePegawaiStore((state) => state.isModalEditOpen);
  const setIsModalEditOpen = usePegawaiStore(
    (state) => state.setIsModalEditOpen,
  );

  const isModalDetailOpen = usePegawaiStore((state) => state.isModalDetailOpen);
  const setIsModalDetailOpen = usePegawaiStore(
    (state) => state.setIsModalDetailOpen,
  );
  useEffect(() => {
    fetchPegawai();
  }, [fetchPegawai]);

  const onSuccess = () => {
    fetchPegawai();
    if (isModalCreateOpen) {
      setIsModalCreateOpen(false);
    } else if (isModalEditOpen) {
      setIsModalEditOpen(false);
    }
  };

  const handleDelete = async () => {
    if (!pegawaiData) return;
    try {
      await deleteJadwalKerja(pegawaiData?.id_pegawai);
      await fetchPegawai();
      setToast({
        isOpen: true,
        message: "Pegawai berhasil dihapus",
        type: "success",
      });
    } catch (error) {
      setToast({
        isOpen: true,
        message: "Pegawai gagal dihapus",
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
        data={pegawais}
        columns={pegawaiColumns}
        onClickTambah={() => setIsModalCreateOpen(true)}
      />

      <Modal
        isOpen={isModalCreateOpen}
        textHeader="Create Pegawai"
        widthScreenSize="super"
        heightScreenSize="3xl"
        onClose={() => setIsModalCreateOpen(false)}
      >
        <PegawaiCreateForm onSuccess={onSuccess} />
      </Modal>

      <Modal
        isOpen={isModalEditOpen}
        textHeader="Edit Pegawai"
        widthScreenSize="super"
        heightScreenSize="3xl"
        onClose={() => setIsModalEditOpen(false)}
      >
        <PegawaiEditForm onSuccess={onSuccess} />
      </Modal>

      <Modal
        isOpen={isModalDeleteOpen}
        textHeader="Delete Pegawai"
        onClose={() => setIsModalDeleteOpen(false)}
      >
        <ModalDelete
          textHeader="Kamu Yakin Menghapus Pegawai Ini?"
          handleDelete={handleDelete}
          setIsModalDeleteOpen={setIsModalDeleteOpen}
        />
      </Modal>

      <Modal
        isOpen={isModalDetailOpen}
        textHeader="Detail Pegawai"
        widthScreenSize="super"
        heightScreenSize="3xl"
        onClose={() => setIsModalDetailOpen(false)}
      >
        <PegawaiDetail onSuccess={onSuccess} />
      </Modal>
    </>
  );
};

export default PegawaiTable;
