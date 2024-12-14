/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/table/data-table";
import { useEffect, useState } from "react";
import Modal from "@/components/custom/modal";
import ModalDelete from "@/components/custom/modal-delete";
import { useUserStore } from "@/store/user/userStore";
import { UserColumns } from "./UserColumns";
import UserCreateForm from "../(form)/UserCreateForm";
import UserEditForm from "../(form)/UserEditForm";
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

  const users = useUserStore((state) => state.user);
  const fetchUser = useUserStore((state) => state.fetchUser);
  const deleteUser = useUserStore((state) => state.deleteUser);

  const userData = useUserStore((state) => state.userData);

  const isModalEditOpen = useUserStore((state) => state.isModalEditOpen);
  const setIsModalEditOpen = useUserStore((state) => state.setIsModalEditOpen);

  const isModalDeleteOpen = useUserStore((state) => state.isModalDeleteOpen);
  const setIsModalDeleteOpen = useUserStore(
    (state) => state.setIsModalDeleteOpen,
  );

  const handleDelete = async () => {
    try {
      await deleteUser(userData?.id_user as string);
      onSuccess();
      setToast({
        isOpen: true,
        message: "User berhasil dihapus",
        type: "success",
      });
    } catch (error) {
      setToast({
        isOpen: true,
        message: "User gagal dihapus",
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
    await fetchUser();
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

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
          data={users}
          columns={UserColumns}
          // onFilterChange={() => setIsModalFilterOpen(true)}
          onClickTambah={() => setIsModalCreateOpen(true)}
        />
      </div>

      {/* modal div */}
      <>
        {/* create */}
        <Modal
          isOpen={isModalCreateOpen}
          textHeader="Create User"
          widthScreenSize="lg"
          onClose={() => setIsModalCreateOpen(false)}
        >
          <UserCreateForm onSuccess={onSuccess} />
        </Modal>

        {/* edit */}
        <Modal
          isOpen={isModalEditOpen}
          textHeader="Edit User"
          widthScreenSize="lg"
          onClose={() => setIsModalEditOpen(false)}
        >
          <UserEditForm onSuccess={onSuccess} />
        </Modal>

        {/* delete */}
        <Modal
          isOpen={isModalDeleteOpen}
          textHeader="Delete User"
          widthScreenSize="lg"
          onClose={() => setIsModalDeleteOpen(false)}
        >
          <ModalDelete
            textHeader="Kamu Yakin Menghapus User ?"
            handleDelete={handleDelete}
            setIsModalDeleteOpen={setIsModalDeleteOpen}
          />
        </Modal>
      </>
    </>
  );
};

export default PotongGajiTable;
