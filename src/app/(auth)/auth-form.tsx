"use client";
import axios from "axios";
import { UserAuthForm } from "./user-auth-form";
import Image from "next/image";
import { useEffect, useState } from "react";

const AuthPage = () => {
  const [nama, setNama] = useState<string>(
    "SISTEM INFORMASI GAJI DAN MANAJEMEN ABSENSI",
  );

  const [logo, setLogo] = useState<string>("");
  const getData = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/app-setting`,
      );
      setNama(res.data.data.nama_sistem);
      setLogo(res.data.data.logo_sistem);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex h-[100vh] w-full bg-black">
        {/* sisi kiri */}
        <div className="flex w-full flex-col space-y-4 rounded-xl p-4 md:flex-row md:space-x-4 md:space-y-0">
          {/* Kolom kiri dengan gambar grid penuh */}
          {/* Kolom kanan */}
          <div className="flex w-full items-center justify-center overflow-hidden rounded-xl p-4 md:w-[60%]">
            <div className="text-center">
              <p className="mt-10 text-xl font-bold uppercase text-white md:text-2xl">
                {nama}
              </p>
              <p className="mt-2 text-white">MI NU HIDAYATUL MUBTADIIN</p>

              {/* Image will be visible only on medium and larger screens */}
              <div className="mt-10 hidden items-center justify-center md:flex">
                <Image
                  src="/lottie/log-in-girl.svg"
                  width={100}
                  height={100}
                  alt="Lottie Animation"
                  className="h-[30rem] w-[30rem]"
                />
              </div>
            </div>
          </div>

          {/* Kolom kanan */}
          <div className="mx-auto flex w-[90%] items-center justify-center overflow-hidden rounded-xl bg-white p-4 md:w-[40%] md:flex-col">
            {logo && (
              <Image
                src={logo}
                alt="logo"
                width={50}
                height={50}
                className="-mt-10 hidden md:block"
              />
            )}
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
