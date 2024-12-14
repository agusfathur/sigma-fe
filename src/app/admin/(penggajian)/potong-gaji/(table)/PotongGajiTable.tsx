/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/table/data-table";
import { useEffect, useState } from "react";
import Modal from "@/components/custom/modal";
import ModalDelete from "@/components/custom/modal-delete";
import { usePotongGajiStore } from "@/store/potongGaji/potongGajiStore";
import { PotongGajiColumns } from "./PotongGajiColumns";
import PotongGajiCreateForm from "../(form)/PotongGajiCreateForm";
import PotongGajiEditForm from "../(form)/PotongGajiEditForm";
import ModalToast from "@/components/custom/modal-toast";
import { useToastStore } from "@/store/toastStore";

const PotongGajiTable = () => {
  const {
    isOpen: toastOpen,
    message,
    type: toastType,
    setToast,
  } = useToastStore();
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

  const potongGajis = usePotongGajiStore((state) => state.potongGaji);
  const fetchPotongGaji = usePotongGajiStore((state) => state.fetchPotongGaji);

  const potongGajiData = usePotongGajiStore((state) => state.potongGajiData);
  const deletePotongGaji = usePotongGajiStore(
    (state) => state.deletePotongGaji,
  );

  const isModalEditOpen = usePotongGajiStore((state) => state.isModalEditOpen);
  const setIsModalEditOpen = usePotongGajiStore(
    (state) => state.setIsModalEditOpen,
  );

  const isModalDeleteOpen = usePotongGajiStore(
    (state) => state.isModalDeleteOpen,
  );
  const setIsModalDeleteOpen = usePotongGajiStore(
    (state) => state.setIsModalDeleteOpen,
  );

  const handleDelete = async () => {
    try {
      await deletePotongGaji(potongGajiData?.id_potong_gaji as string);
      setToast({
        isOpen: true,
        message: "Data potong gaji berhasil dihapus",
        type: "success",
      });
      onSuccess();
    } catch (error) {
      setToast({
        isOpen: true,
        message: "Data potong gaji gagal dihapus",
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
    await fetchPotongGaji();
  };

  useEffect(() => {
    fetchPotongGaji();
  }, [fetchPotongGaji]);

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
          data={potongGajis}
          columns={PotongGajiColumns}
          // onFilterChange={() => setIsModalFilterOpen(true)}
          onClickTambah={() => setIsModalCreateOpen(true)}
        />
      </div>

      {/* modal div */}
      <>
        {/* create */}
        <Modal
          isOpen={isModalCreateOpen}
          textHeader="Create Potong Gaji"
          widthScreenSize="lg"
          onClose={() => setIsModalCreateOpen(false)}
        >
          <PotongGajiCreateForm onSuccess={onSuccess} />
        </Modal>

        {/* edit */}
        <Modal
          isOpen={isModalEditOpen}
          textHeader="Edit Potong Gaji"
          widthScreenSize="lg"
          onClose={() => setIsModalEditOpen(false)}
        >
          <PotongGajiEditForm onSuccess={onSuccess} />
        </Modal>

        {/* delete */}
        <Modal
          isOpen={isModalDeleteOpen}
          textHeader="Delete Potong Gaji"
          widthScreenSize="lg"
          onClose={() => setIsModalDeleteOpen(false)}
        >
          <ModalDelete
            textHeader="Kamu Yakin Menghapus Potong Gaji ?"
            handleDelete={handleDelete}
            setIsModalDeleteOpen={setIsModalDeleteOpen}
          />
        </Modal>
      </>
    </>
  );
};

export default PotongGajiTable;
