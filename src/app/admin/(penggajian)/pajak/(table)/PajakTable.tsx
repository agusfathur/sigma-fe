/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/table/data-table";
import { useEffect, useState } from "react";
import Modal from "@/components/custom/modal";
import ModalDelete from "@/components/custom/modal-delete";
import { usePajakStore } from "@/store/pajak/pajakStore";
import { PajakColumns } from "./PajakColumns";
import PajakCreateForm from "../(form)/PajakCreateForm";
import PajakEditForm from "../(form)/PajakEditForm";
import { useToastStore } from "@/store/toastStore";
import ModalToast from "@/components/custom/modal-toast";

const PajakTable = () => {
  const {
    isOpen: toastOpen,
    message,
    type: toastType,
    setToast,
  } = useToastStore();

  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

  const pajaks = usePajakStore((state) => state.pajak);

  const fetchPajak = usePajakStore((state) => state.fetchPajak);

  const deletePajak = usePajakStore((state) => state.deletePajak);

  const pajakData = usePajakStore((state) => state.pajakData);

  const isModalEditOpen = usePajakStore((state) => state.isModalEditOpen);
  const setIsModalEditOpen = usePajakStore((state) => state.setIsModalEditOpen);

  const isModalDeleteOpen = usePajakStore((state) => state.isModalDeleteOpen);
  const setIsModalDeleteOpen = usePajakStore(
    (state) => state.setIsModalDeleteOpen,
  );

  const handleDelete = async () => {
    try {
      await deletePajak(pajakData?.id_pajak as string);
      setToast({
        isOpen: true,
        message: "Data pajak berhasil dihapus",
        type: "success",
      });
      onSuccess();
    } catch (error) {
      setToast({
        isOpen: true,
        message: "Data pajak gagal dihapus",
        type: "error",
      });
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

    await fetchPajak();
  };

  useEffect(() => {
    fetchPajak();
  }, [fetchPajak]);

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
      <div className="space-y-4">
        <DataTable
          data={pajaks}
          columns={PajakColumns}
          // onFilterChange={() => setIsModalFilterOpen(true)}
          onClickTambah={() => setIsModalCreateOpen(true)}
        />
      </div>

      {/* modal div */}
      <>
        {/* create */}
        <Modal
          isOpen={isModalCreateOpen}
          textHeader="Create Pajak"
          widthScreenSize="lg"
          onClose={() => setIsModalCreateOpen(false)}
        >
          <PajakCreateForm onSuccess={onSuccess} />
        </Modal>

        {/* edit */}
        <Modal
          isOpen={isModalEditOpen}
          textHeader="Create Pajak"
          widthScreenSize="lg"
          onClose={() => setIsModalEditOpen(false)}
        >
          <PajakEditForm onSuccess={onSuccess} />
        </Modal>

        {/* delete */}
        <Modal
          isOpen={isModalDeleteOpen}
          textHeader="Delete Pajak"
          widthScreenSize="lg"
          onClose={() => setIsModalDeleteOpen(false)}
        >
          <ModalDelete
            textHeader="Kamu Yakin Menghapus Pajak Ini?"
            handleDelete={handleDelete}
            setIsModalDeleteOpen={setIsModalDeleteOpen}
          />
        </Modal>
      </>
    </>
  );
};

export default PajakTable;
