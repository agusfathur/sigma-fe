"use client";

import { DataTable } from "@/components/table/data-table";
import { useEffect, useState } from "react";
import Modal from "@/components/custom/modal";
import ModalDelete from "@/components/custom/modal-delete";
import StatusPegawaiUpdateForm from "../(form)/JadwalKerjaEditForm";
import { jadwalKerjaColumns } from "./JadwalKerjaColumns";
import { useJadwalKerjaStore } from "@/store/jadwalKerja/jadwalKerjaStore";
import JadwalKerjaCreateForm from "../(form)/JadwalKerjaCreateForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const JadwalKerjaTable = () => {
  const fetchJadwalKerja = useJadwalKerjaStore(
    (state) => state.fetchJadwalKerja,
  );
  const jadwalKerjas = useJadwalKerjaStore((state) => state.jadwalKerja);

  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

  const jadwalKerjaData = useJadwalKerjaStore((state) => state.jadwalKerjaData);

  //   function Delete
  const deleteJadwalKerja = useJadwalKerjaStore(
    (state) => state.deleteJadwalKerja,
  );

  const isModalDeleteOpen = useJadwalKerjaStore(
    (state) => state.isModalDeleteOpen,
  );
  const setIsModalDeleteOpen = useJadwalKerjaStore(
    (state) => state.setIsModalDeleteOpen,
  );

  const isModalEditOpen = useJadwalKerjaStore((state) => state.isModalEditOpen);
  const setIsModalEditOpen = useJadwalKerjaStore(
    (state) => state.setIsModalEditOpen,
  );

  useEffect(() => {
    fetchJadwalKerja();
  }, [fetchJadwalKerja]);

  const onSuccess = () => {
    fetchJadwalKerja();
    if (isModalCreateOpen) {
      setIsModalCreateOpen(false);
    } else if (isModalEditOpen) {
      setIsModalEditOpen(false);
    }
  };

  const handleDelete = async () => {
    if (!jadwalKerjaData) return;
    try {
      await deleteJadwalKerja(jadwalKerjaData?.id_jadwal);
      await fetchJadwalKerja();
    } catch (error) {
      console.log(error);
    } finally {
      setIsModalDeleteOpen(false);
    }
  };
  return (
    <>
      <Tabs orientation="vertical" defaultValue="table" className="space-y-4">
        <div className="w-full overflow-x-auto pb-2">
          <TabsList>
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="pegawai">Pegawai</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="table" className="space-y-4">
          <>
            <DataTable
              data={jadwalKerjas}
              columns={jadwalKerjaColumns}
              onClickTambah={() => setIsModalCreateOpen(true)}
            />

            <Modal
              isOpen={isModalCreateOpen}
              textHeader="Create Jadwal Kerja"
              widthScreenSize="3xl"
              onClose={() => setIsModalCreateOpen(false)}
            >
              <JadwalKerjaCreateForm onSuccess={onSuccess} />
            </Modal>

            <Modal
              isOpen={isModalEditOpen}
              textHeader="Edit Jadwal Kerja"
              onClose={() => setIsModalEditOpen(false)}
            >
              <StatusPegawaiUpdateForm onSuccess={onSuccess} />
            </Modal>

            <Modal
              isOpen={isModalDeleteOpen}
              textHeader="Delete Jadwal Kerja"
              onClose={() => setIsModalDeleteOpen(false)}
            >
              <ModalDelete
                textHeader="Kamu Yakin Menghapus Jadwal Kerja Ini?"
                handleDelete={handleDelete}
                setIsModalDeleteOpen={setIsModalDeleteOpen}
              />
            </Modal>
          </>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default JadwalKerjaTable;
