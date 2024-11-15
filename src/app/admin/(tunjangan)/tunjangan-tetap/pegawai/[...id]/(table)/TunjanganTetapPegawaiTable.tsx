/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/table/data-table";
import { useEffect, useState } from "react";
import Modal from "@/components/custom/modal";
import ModalDelete from "@/components/custom/modal-delete";
import { useTunjanganTetapPegawaiStore } from "@/store/tunjanganTetap/tunjanganTetapPegawaiStore";
import { TunjanganTetapPegawaiColumns } from "./TunjangaTetapPegawaiColumns";
import TunjangaTetapPegawaiCreateForm from "../(form)/TunjangaTetapPegawaiCreateForm";
import TunjangaTetapPegawaiEditForm from "../(form)/TunjangaTetapPegawaiEditForm";

const TunjanganTetapPegawaiTable = ({ pegawaiId }: { pegawaiId: string }) => {
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

  const tunjanganTetapPegawais = useTunjanganTetapPegawaiStore(
    (state) => state.tunjanganTetapPegawai,
  );

  const fetchTunjanganTetapPegawaiById = useTunjanganTetapPegawaiStore(
    (state) => state.fetchTunjanganTetapPegawaiById,
  );

  const deleteTunjanganTetapPegawai = useTunjanganTetapPegawaiStore(
    (state) => state.deleteTunjanganTetapPegawai,
  );

  const tunjanganTetapPegawaiData = useTunjanganTetapPegawaiStore(
    (state) => state.tunjanganTetapPegawaiData,
  );

  const isModalEditOpen = useTunjanganTetapPegawaiStore(
    (state) => state.isModalEditOpen,
  );
  const setIsModalEditOpen = useTunjanganTetapPegawaiStore(
    (state) => state.setIsModalEditOpen,
  );

  const isModalDeleteOpen = useTunjanganTetapPegawaiStore(
    (state) => state.isModalDeleteOpen,
  );
  const setIsModalDeleteOpen = useTunjanganTetapPegawaiStore(
    (state) => state.setIsModalDeleteOpen,
  );

  const handleDelete = async () => {
    try {
      await deleteTunjanganTetapPegawai(
        tunjanganTetapPegawaiData?.id_tunjangan_tetap_pegawai as string,
      );
      onSuccess();
    } catch (error) {
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

    await fetchTunjanganTetapPegawaiById(pegawaiId as string);
  };

  useEffect(() => {
    fetchTunjanganTetapPegawaiById(pegawaiId as string);
  }, [fetchTunjanganTetapPegawaiById, pegawaiId]);

  return (
    <>
      <div className="space-y-4">
        <DataTable
          data={tunjanganTetapPegawais}
          columns={TunjanganTetapPegawaiColumns}
          // onFilterChange={() => setIsModalFilterOpen(true)}
          onClickTambah={() => setIsModalCreateOpen(true)}
        />
      </div>

      {/* modal div */}
      <>
        {/* create */}
        <Modal
          isOpen={isModalCreateOpen}
          textHeader="Create Tunjangan Kehadiran"
          widthScreenSize="lg"
          onClose={() => setIsModalCreateOpen(false)}
        >
          <TunjangaTetapPegawaiCreateForm
            onSuccess={onSuccess}
            pegawaiId={pegawaiId[0]}
          />
        </Modal>

        {/* edit */}
        <Modal
          isOpen={isModalEditOpen}
          textHeader="Create Tunjangan Kehadiran"
          widthScreenSize="lg"
          onClose={() => setIsModalEditOpen(false)}
        >
          <TunjangaTetapPegawaiEditForm onSuccess={onSuccess} />
        </Modal>

        {/* delete */}
        <Modal
          isOpen={isModalDeleteOpen}
          textHeader="Delete Tunjangan Kehadiran"
          widthScreenSize="lg"
          onClose={() => setIsModalDeleteOpen(false)}
        >
          <ModalDelete
            textHeader="Kamu Yakin Menghapus Tunjangan Kehadiran Ini?"
            handleDelete={handleDelete}
            setIsModalDeleteOpen={setIsModalDeleteOpen}
          />
        </Modal>
      </>
    </>
  );
};

export default TunjanganTetapPegawaiTable;
