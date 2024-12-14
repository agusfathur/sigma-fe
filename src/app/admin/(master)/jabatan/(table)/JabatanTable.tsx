"use client";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/table/data-table";
import { useJabatanStore } from "@/store/jabatan/jabatanStore";
import { jabatanColumns } from "./JabatanColumns";
import Modal from "@/components/custom/modal";
import JabatanCreateForm from "../(form)/JabatanCreateForm";
import ModalDelete from "@/components/custom/modal-delete";
import JabatanEditForm from "../(form)/JabatanEditForm";
import { useToastStore } from "@/store/toastStore";
import ModalToast from "@/components/custom/modal-toast";

const JabatanTable = () => {
  const {
    isOpen: toastOpen,
    message,
    type: toastType,
    setToast,
  } = useToastStore();
  const fetchJabatan = useJabatanStore((state) => state.fetchJabatan);
  const jabatans = useJabatanStore((state) => state.jabatan);
  const jabatanData = useJabatanStore((state) => state.jabatanData);

  // function Delete
  const deleteJabatan = useJabatanStore((state) => state.deleteJabatan);

  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

  const isModalDeleteOpen = useJabatanStore((state) => state.isModalDeleteOpen);
  const setIsModalDeleteOpen = useJabatanStore(
    (state) => state.setIsModalDeleteOpen,
  );

  const isModalEditOpen = useJabatanStore((state) => state.isModalEditOpen);
  const setIsModalEditOpen = useJabatanStore(
    (state) => state.setIsModalEditOpen,
  );

  useEffect(() => {
    fetchJabatan();
  }, [fetchJabatan]);

  const onSuccess = () => {
    fetchJabatan();
    if (isModalCreateOpen) {
      setIsModalCreateOpen(false);
    } else if (isModalEditOpen) {
      setIsModalEditOpen(false);
    }
  };

  const handleDelete = async () => {
    if (!jabatanData) return;
    try {
      await deleteJabatan(jabatanData?.id_jabatan);
      setToast({
        isOpen: true,
        type: "success",
        message: "Jabatan deleted successfully",
      });
      await onSuccess();
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
        data={jabatans}
        columns={jabatanColumns}
        onClickTambah={() => setIsModalCreateOpen(true)}
      />
      {/* Modal Create */}
      <Modal
        isOpen={isModalCreateOpen}
        textHeader="Create Jabatan"
        onClose={() => setIsModalCreateOpen(false)}
      >
        <JabatanCreateForm onSuccess={onSuccess} />
      </Modal>
      {/* Modal Edit */}
      <Modal
        isOpen={isModalEditOpen}
        textHeader="Edit Jabatan"
        onClose={() => setIsModalEditOpen(false)}
      >
        <JabatanEditForm onSuccess={onSuccess} />
      </Modal>
      {/* Modal Delete */}
      <Modal
        isOpen={isModalDeleteOpen}
        textHeader="Delete Jabatan"
        onClose={() => setIsModalDeleteOpen(false)}
      >
        <ModalDelete
          textHeader="Are you sure to delete Jabatan?"
          handleDelete={handleDelete}
          setIsModalDeleteOpen={setIsModalDeleteOpen}
        />
      </Modal>
    </>
  );
};

export default JabatanTable;
