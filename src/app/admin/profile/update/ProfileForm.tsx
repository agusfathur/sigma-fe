/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/custom/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToastStore } from "@/store/toastStore";
import { useUserStore } from "@/store/user/userStore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProfileForm = () => {
  const { data: session } = useSession();
  const { setToast } = useToastStore();
  const { updateUser, fetchUser, UserById } = useUserStore();
  const [data, setData] = useState({
    username: session?.user?.username,
    name: session?.user?.name,
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const handleUpdate = async () => {
    try {
      await updateUser({
        id_user: session?.user?.id as string,
        username: data.username,
        name: data.name as string,
      });
      setToast({
        isOpen: true,
        message: "Account berhasil diupdate",
        type: "success",
      });
      router.push("/admin/profile");
    } catch (error: Error | any) {
      const errMsg = error.response.data.message;
      if (errMsg) {
        setErrorMessage(errMsg.username ? errMsg.username.join(", ") : "");
      }
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    setData({
      username: UserById(session?.user?.id as string)?.username,
      name: UserById(session?.user?.id as string)?.name,
    });
  }, [session?.user, fetchUser, UserById]);

  return (
    <>
      <div className="mb-5 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Profil{" "}
          <Button variant={"link"}>
            <Link href="/admin/profile">Kembali</Link>
          </Button>
        </h1>
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
              {errorMessage && (
                <p className="text-center text-xs text-red-500">
                  {errorMessage}
                </p>
              )}
              <div className="my-2 flex items-center justify-between">
                <div className="w-2/5">
                  <p className="mx-4 font-bold">Username</p>
                </div>
                <p>:</p>
                <div className="w-3/5">
                  <Input
                    className={`mx-4 w-[90%] bg-transparent ${errorMessage ? "border-red-500" : ""}`}
                    type="text"
                    value={data.username || ""}
                    onChange={(e) => {
                      setData({ ...data, username: e.target.value });
                    }}
                  />
                </div>
              </div>
              <Separator />

              <div className="my-2 flex items-center justify-between">
                <div className="w-2/5">
                  <p className="mx-4 font-bold">Nama</p>
                </div>
                <p>:</p>
                <div className="w-3/5">
                  <Input
                    className={`mx-4 w-[90%] bg-transparent ${errorMessage ? "border-red-500" : ""}`}
                    type="text"
                    value={data.name || ""}
                    onChange={(e) => {
                      setData({ ...data, name: e.target.value });
                    }}
                  />
                </div>
              </div>
              <Separator />

              <div className="my-2 flex items-center justify-between">
                <div className="w-2/5">
                  <p className="mx-4 font-bold">Email</p>
                </div>
                <p>:</p>
                <div className="w-3/5">
                  <p className="mx-4">{session?.user?.email}</p>
                </div>
              </div>
              <Separator />
              <div className="my-2 flex items-center justify-between">
                <div className="w-2/5">
                  <p className="mx-4 font-bold">Role</p>
                </div>
                <p>:</p>
                <div className="w-3/5">
                  <p className="mx-4">{session?.user?.role}</p>
                </div>
              </div>
              <Separator />
            </div>
            <Button
              variant={"default"}
              className="text-sm"
              onClick={handleUpdate}
            >
              Update Profile
            </Button>
          </div>
        </div>
        <div className="w-full md:w-2/3"></div>
      </div>
    </>
  );
};

export default ProfileForm;
