"use client";

import { DataTable } from "@/components/table/data-table";
import { useEffect, useState } from "react";
import { kategoriLiburColumns } from "./kategoriLiburColumns";
import Modal from "@/components/custom/modal";
import ModalDelete from "@/components/custom/modal-delete";
import StatusPegawaiUpdateForm from "../(form)/kategoriLiburEditForm";
import { useKategoriLiburStore } from "@/store/kategoriLibur/kategoriLiburStore";
import KategoriLiburCreateForm from "../(form)/kategoriLiburCreateForm";
import KategoriLiburUpdateForm from "../(form)/kategoriLiburEditForm";

const KategoriLiburTable = () => {
  const fetchKategoriLibur = useKategoriLiburStore(
    (state) => state.fetchKategoriLibur,
  );
  const kategoriLiburs = useKategoriLiburStore((state) => state.kategoriLibur);

  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

  const kategoriLiburData = useKategoriLiburStore(
    (state) => state.kategoriLiburData,
  );

  //   function Delete
  const deleteKategoriLibur = useKategoriLiburStore(
    (state) => state.deleteKategoriLibur,
  );

  const isModalDeleteOpen = useKategoriLiburStore(
    (state) => state.isModalDeleteOpen,
  );
  const setIsModalDeleteOpen = useKategoriLiburStore(
    (state) => state.setIsModalDeleteOpen,
  );

  const isModalEditOpen = useKategoriLiburStore(
    (state) => state.isModalEditOpen,
  );
  const setIsModalEditOpen = useKategoriLiburStore(
    (state) => state.setIsModalEditOpen,
  );

  useEffect(() => {
    fetchKategoriLibur();
  }, [fetchKategoriLibur]);

  const onSuccess = () => {
    fetchKategoriLibur();
    if (isModalCreateOpen) {
      setIsModalCreateOpen(false);
    } else if (isModalEditOpen) {
      setIsModalEditOpen(false);
    }
  };

  const handleDelete = () => {
    if (!kategoriLiburData) return;
    try {
      deleteKategoriLibur(kategoriLiburData?.id_kategori_libur);
      fetchKategoriLibur();
    } catch (error) {
      console.log(error);
    } finally {
      setIsModalDeleteOpen(false);
    }
  };
  return (
    <>
      <DataTable
        data={kategoriLiburs}
        columns={kategoriLiburColumns}
        onClickTambah={() => setIsModalCreateOpen(true)}
      />

      <Modal
        isOpen={isModalCreateOpen}
        textHeader="Create Kategori Libur"
        onClose={() => setIsModalCreateOpen(false)}
      >
        <KategoriLiburCreateForm onSuccess={onSuccess} />
      </Modal>

      <Modal
        isOpen={isModalEditOpen}
        textHeader="Edit Kategori Libur"
        onClose={() => setIsModalEditOpen(false)}
      >
        <KategoriLiburUpdateForm onSuccess={onSuccess} />
      </Modal>

      <Modal
        isOpen={isModalDeleteOpen}
        textHeader="Delete Kategori Libur"
        onClose={() => setIsModalDeleteOpen(false)}
      >
        <ModalDelete
          textHeader="Kamu Yakin Menghapus Kategori Libur Ini?"
          handleDelete={handleDelete}
          setIsModalDeleteOpen={setIsModalDeleteOpen}
        />
      </Modal>
    </>
  );
};

export default KategoriLiburTable;
