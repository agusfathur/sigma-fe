"use client";
import { Button } from "@/components/custom/button";
import ModalToast from "@/components/custom/modal-toast";
import { Separator } from "@/components/ui/separator";
import { useToastStore } from "@/store/toastStore";
import { useUserStore } from "@/store/user/userStore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const ProfileIndex = () => {
  const { data: session } = useSession();
  const {
    isOpen: toastOpen,
    message,
    type: toastType,
    setToast,
  } = useToastStore();

  const { fetchUser, UserById } = useUserStore();

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
      <div className="mb-5 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Profil</h1>
      </div>
      <Separator />
      <div className="my-4 flex flex-wrap space-x-4">
        {/* Account Card */}
        <div className="w-full rounded-lg border bg-white p-4 shadow-xl dark:bg-transparent md:w-1/3">
          <div className="mb-5 flex flex-col items-center justify-center space-y-4">
            <h2 className="my-2 text-lg font-bold tracking-tight">
              Account Profile
            </h2>
            {session?.user?.image && (
              <Image
                src={session.user.image}
                alt="profile"
                width={120}
                height={120}
                className="rounded-full border-2 border-gray-300"
              />
            )}
            <div className="w-[90%]">
              <div className="my-2 flex items-center justify-between">
                <div className="w-2/5">
                  <p className="mx-4 font-bold">Username</p>
                </div>
                <p>:</p>
                <div className="w-3/5">
                  <p className="mx-4">
                    {UserById(session?.user?.id as string)?.username}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="my-2 flex items-center justify-between">
                <div className="w-2/5">
                  <p className="mx-4 font-bold">Nama</p>
                </div>
                <p>:</p>
                <div className="w-3/5">
                  <p className="mx-4">
                    {UserById(session?.user?.id as string)?.name}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="my-2 flex items-center justify-between">
                <div className="w-2/5">
                  <p className="mx-4 font-bold">Email</p>
                </div>
                <p>:</p>
                <div className="w-3/5">
                  <p className="mx-4">
                    {" "}
                    {UserById(session?.user?.id as string)?.email}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="my-2 flex items-center justify-between">
                <div className="w-2/5">
                  <p className="mx-4 font-bold">Role</p>
                </div>
                <p>:</p>
                <div className="w-3/5">
                  <p className="mx-4">
                    {" "}
                    {UserById(session?.user?.id as string)?.role}
                  </p>
                </div>
              </div>
              <Separator />
            </div>
            <Link href={`/admin/profile/update`}>
              <Button variant={"default"} className="text-sm">
                Update Profile
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-2/3"></div>
      </div>
    </>
  );
};

export default ProfileIndex;
