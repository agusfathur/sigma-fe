"use client";

import { DataTable } from "@/components/table/data-table";
import { useEffect, useState } from "react";
import Modal from "@/components/custom/modal";
import ModalDelete from "@/components/custom/modal-delete";
import { useDataLiburStore } from "@/store/dataLibur/dataLiburStore";
import { dataLiburColumns } from "./DataLiburColumns";
import DataLiburCreateForm from "../(form)/DataLiburCreateForm";
import DataLiburUpdateForm from "../(form)/DataLiburEditForm";
import ModalToast from "@/components/custom/modal-toast";
import { useToastStore } from "@/store/toastStore";

const DataLiburTable = () => {
  const {
    isOpen: toastOpen,
    message,
    type: toastType,
    setToast,
  } = useToastStore();
  const fetchDataLibur = useDataLiburStore((state) => state.fetchDataLibur);
  const dataLiburs = useDataLiburStore((state) => state.dataLibur);

  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

  const dataLiburData = useDataLiburStore((state) => state.dataLiburData);

  //   function Delete
  const deleteDataLibur = useDataLiburStore((state) => state.deleteDataLibur);

  const isModalDeleteOpen = useDataLiburStore(
    (state) => state.isModalDeleteOpen,
  );
  const setIsModalDeleteOpen = useDataLiburStore(
    (state) => state.setIsModalDeleteOpen,
  );

  const isModalEditOpen = useDataLiburStore((state) => state.isModalEditOpen);
  const setIsModalEditOpen = useDataLiburStore(
    (state) => state.setIsModalEditOpen,
  );

  useEffect(() => {
    fetchDataLibur();
  }, [fetchDataLibur]);

  const onSuccess = () => {
    fetchDataLibur();
    if (isModalCreateOpen) {
      setIsModalCreateOpen(false);
    } else if (isModalEditOpen) {
      setIsModalEditOpen(false);
    }
  };

  const handleDelete = async () => {
    if (!dataLiburData) return;
    try {
      await deleteDataLibur(dataLiburData?.id_libur);
      setToast({
        isOpen: true,
        message: "Data Libur | Cuti Berhasil Dihapus",
        type: "success",
      });
      await fetchDataLibur();
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
        onClose={() =>
          setToast({ isOpen: false, message: "", type: toastType })
        }
        message={message}
        type={toastType}
      />
      <DataTable
        data={dataLiburs}
        columns={dataLiburColumns}
        onClickTambah={() => setIsModalCreateOpen(true)}
      />

      <Modal
        isOpen={isModalCreateOpen}
        textHeader="Create Data Libur | Cuti"
        onClose={() => setIsModalCreateOpen(false)}
      >
        <DataLiburCreateForm onSuccess={onSuccess} />
      </Modal>

      <Modal
        isOpen={isModalEditOpen}
        textHeader="Edit Data Libur | Cuti"
        onClose={() => setIsModalEditOpen(false)}
      >
        <DataLiburUpdateForm onSuccess={onSuccess} />
      </Modal>

      <Modal
        isOpen={isModalDeleteOpen}
        textHeader="Delete Data Libur | Cuti"
        onClose={() => setIsModalDeleteOpen(false)}
      >
        <ModalDelete
          textHeader="Kamu Yakin Menghapus Data Libur | Cuti Ini?"
          handleDelete={handleDelete}
          setIsModalDeleteOpen={setIsModalDeleteOpen}
        />
      </Modal>
    </>
  );
};

export default DataLiburTable;
