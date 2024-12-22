"use client";
import { Button } from "@/components/custom/button";
import ModalToast from "@/components/custom/modal-toast";
import { Separator } from "@/components/ui/separator";
import axiosJWT from "@/lib/authJWT";
import { JabatanFungsional } from "@/store/jabatanFungsional/jabatanFungsional.types";
import { useToastStore } from "@/store/toastStore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProfileIndex = () => {
  const { data: session } = useSession();
  const {
    isOpen: toastOpen,
    message,
    type: toastType,
    setToast,
  } = useToastStore();

  const [data, setData] = useState({
    username: "",
    email: "",
    image: "",
    role: "",
  });

  const [pegawai, setPegawai] = useState({
    nama: "",
    email: "",
    nomor_hp: "",
    nik: "",
    nip: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    tanggal_masuk: "",
    tanggal_pensiun: "",
    gender: "",
    agama: "",
    alamat: "",
    tenaga: "",
    status: "",
    status_tetap: "",
    jabatan: "",
    status_kepegawaian: "",
    riwayat_pendidikan: [],
    status_pernikahan: "",
    jumlah_istri: "",
    jumlah_anak: "",
    nomor_rekening: "",
    status_pegawai: "",
    lokasi: "",
    jabatan_fungsional: [],
  });

  const getUser = async () => {
    try {
      const user = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/${session?.user.id}`,
      );
      const getPegawai = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pegawai/user/${session?.user.id}`,
      );
      const pegawaiData = getPegawai.data.data;

      setData({
        username: user.data.data.username,
        email: user.data.data.email,
        image: user.data.data.image,
        role: user.data.data.role,
      });
      setPegawai({
        nama: pegawaiData.nama,
        email: pegawaiData.email,
        nomor_hp: pegawaiData.nomor_hp,
        nik: pegawaiData.nik,
        nip: pegawaiData.nip,
        tempat_lahir: pegawaiData.tempat_lahir,
        tanggal_lahir: pegawaiData.tanggal_lahir,
        tanggal_masuk: pegawaiData.tanggal_masuk,
        tanggal_pensiun: pegawaiData.tanggal_pensiun,
        gender: pegawaiData.gender,
        agama: pegawaiData.agama,
        alamat: pegawaiData.alamat,
        tenaga: pegawaiData.tenaga,
        status: pegawaiData.status_pegawai,
        status_tetap: pegawaiData.status_tetap,
        jabatan: pegawaiData.jabatan.nama,
        status_kepegawaian: pegawaiData.status_kepegawaian.nama,
        riwayat_pendidikan: pegawaiData.riwayat_pendidikan,
        status_pernikahan: pegawaiData.status_pernikahan,
        jumlah_istri: pegawaiData.jumlah_istri,
        jumlah_anak: pegawaiData.jumlah_anak,
        nomor_rekening: pegawaiData.nomor_rekening,
        status_pegawai: pegawaiData.status_pegawai,
        lokasi: pegawaiData.data_lokasi.nama,
        jabatan_fungsional: pegawaiData.jabatanFungsional,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [session?.user.id]);

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

      <div className="my-4 flex flex-wrap justify-center space-y-2 md:flex-nowrap md:justify-normal md:space-x-4 md:space-y-0">
        {/* Account Card */}
        <div className="h-[450px] w-[80%] rounded-lg border bg-white p-4 shadow-xl dark:bg-transparent md:w-1/3">
          <div className="mb-5 flex flex-col items-center justify-center space-y-4">
            <h2 className="my-2 text-lg font-bold tracking-tight">
              Account Profile
            </h2>
            {data?.image && (
              <Image
                src={data?.image}
                alt="profile"
                width={120}
                height={120}
                className="rounded-full border-2 border-gray-300"
              />
            )}
            <div className="w-[90%]">
              <div className="my-2 flex items-center justify-between">
                <div className="w-2/5">
                  <p className="mx-4 text-xs font-bold md:text-sm">Username</p>
                </div>
                <p>:</p>
                <div className="w-3/5">
                  <p className="mx-4 text-xs md:text-sm">{data.username}</p>
                </div>
              </div>
              <Separator />
              <div className="my-2 flex items-center justify-between">
                <div className="w-2/5">
                  <p className="mx-4 text-xs font-bold md:text-sm">Email</p>
                </div>
                <p>:</p>
                <div className="w-3/5">
                  <p className="mx-4 text-xs md:text-sm">{data.email}</p>
                </div>
              </div>
              <Separator />
              <div className="my-2 flex items-center justify-between">
                <div className="w-2/5">
                  <p className="mx-4 text-xs font-bold md:text-sm">Role</p>
                </div>
                <p>:</p>
                <div className="w-3/5">
                  <p className="mx-4 text-xs md:text-sm">{data.role}</p>
                </div>
              </div>
              <Separator />
            </div>
            <Link href={`/user/profile/update`}>
              <Button variant={"default"} className="text-sm">
                Update Profile
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-[80%] rounded-lg border bg-white p-4 shadow-xl dark:bg-transparent md:w-2/3">
          <div className="mb-5 flex flex-col items-center justify-center space-y-4">
            <h2 className="my-2 text-lg font-bold tracking-tight">
              Data Profile
            </h2>

            <div className="w-[90%]">
              <div className="my-2 flex items-center justify-between">
                <div className="w-2/6">
                  <p className="mx-4 text-xs font-bold md:text-sm">Nama</p>
                </div>
                <p>:</p>
                <div className="w-4/6">
                  <p className="mx-4 text-xs md:text-sm">{pegawai.nama}</p>
                </div>
              </div>
              <Separator />
              <div className="my-2 flex items-center justify-between">
                <div className="w-2/6">
                  <p className="mx-4 text-xs font-bold md:text-sm">Email</p>
                </div>
                <p>:</p>
                <div className="w-4/6">
                  <p className="mx-4 text-xs md:text-sm">{pegawai.email}</p>
                </div>
              </div>
              <Separator />
              <div className="my-2 flex items-center justify-between">
                <div className="w-2/6">
                  <p className="mx-4 text-xs font-bold md:text-sm">Nomor HP</p>
                </div>
                <p>:</p>
                <div className="w-4/6">
                  <p className="mx-4 text-xs md:text-sm">{pegawai.nomor_hp}</p>
                </div>
              </div>
              <Separator />
              <div className="my-2 flex items-center justify-between">
                <div className="w-2/6">
                  <p className="mx-4 text-xs font-bold md:text-sm">NIK</p>
                </div>
                <p>:</p>
                <div className="w-4/6">
                  <p className="mx-4 text-xs md:text-sm">{pegawai.nik}</p>
                </div>
              </div>
              <Separator />
              <div className="my-2 flex items-center justify-between">
                <div className="w-2/6">
                  <p className="mx-4 text-xs font-bold md:text-sm">NIP</p>
                </div>
                <p>:</p>
                <div className="w-4/6">
                  <p className="mx-4 text-xs md:text-sm">
                    {pegawai.nip ?? "-"}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="my-2 flex items-center justify-between">
                <div className="w-2/6">
                  <p className="mx-4 text-xs font-bold md:text-sm">
                    Tempat Lahir
                  </p>
                </div>
                <p>:</p>
                <div className="w-4/6">
                  <p className="mx-4 text-xs md:text-sm">
                    {pegawai.tempat_lahir}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="my-2 flex items-center justify-between">
                <div className="w-2/6">
                  <p className="mx-4 text-xs font-bold md:text-sm">
                    Tanggal Lahir
                  </p>
                </div>
                <p>:</p>
                <div className="w-4/6">
                  <p className="mx-4 text-xs md:text-sm">
                    {pegawai.tanggal_lahir.split("T")[0]}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="my-2 flex items-center justify-between">
                <div className="w-2/6">
                  <p className="mx-4 text-xs font-bold md:text-sm">
                    Jenis Kelamin
                  </p>
                </div>
                <p>:</p>
                <div className="w-4/6">
                  <p className="mx-4 text-xs md:text-sm">
                    {pegawai.gender === "laki_laki" ? "Laki-laki" : "Perempuan"}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="my-2 flex items-center justify-between">
                <div className="w-2/6">
                  <p className="mx-4 text-xs font-bold md:text-sm">Agama</p>
                </div>
                <p>:</p>
                <div className="w-4/6">
                  <p className="mx-4 text-xs capitalize md:text-sm">
                    {pegawai.agama}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="my-2 flex items-center justify-between">
                <div className="w-2/6">
                  <p className="mx-4 text-xs font-bold md:text-sm">Alamat</p>
                </div>
                <p>:</p>
                <div className="w-4/6">
                  <p className="mx-4 text-xs md:text-sm">{pegawai.alamat}</p>
                </div>
              </div>
              <Separator />
              <div className="my-2 flex items-center justify-between">
                <div className="w-2/6">
                  <p className="mx-4 text-xs font-bold md:text-sm">
                    Status Pernikahan
                  </p>
                </div>
                <p>:</p>
                <div className="w-4/6">
                  <p className="mx-4 text-xs capitalize md:text-sm">
                    {pegawai.status_pernikahan}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="my-2 flex items-center justify-between">
                <div className="w-2/6">
                  <p className="mx-4 text-xs font-bold md:text-sm">Istri</p>
                </div>
                <p>:</p>
                <div className="w-4/6">
                  <p className="mx-4 text-xs md:text-sm">
                    {pegawai.jumlah_istri}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="my-2 flex items-center justify-between">
                <div className="w-2/6">
                  <p className="mx-4 text-xs font-bold md:text-sm">Anak</p>
                </div>
                <p>:</p>
                <div className="w-4/6">
                  <p className="mx-4 text-xs md:text-sm">
                    {pegawai.jumlah_anak}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="my-2 flex items-center justify-between">
                <div className="w-2/6">
                  <p className="mx-4 text-xs font-bold md:text-sm">
                    No. Rekening
                  </p>
                </div>
                <p>:</p>
                <div className="w-4/6">
                  <p className="mx-4 text-xs md:text-sm">
                    {pegawai.nomor_rekening}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="my-2 flex items-center justify-between">
                <div className="w-2/6">
                  <p className="mx-4 text-xs font-bold md:text-sm">
                    Riwayat Pendidikan
                  </p>
                </div>
                <p>:</p>
                <div className="w-4/6">
                  <p className="mx-4 text-xs md:text-sm">
                    {pegawai.riwayat_pendidikan.join(", ")}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="my-2 flex items-center justify-between">
                <div className="w-2/6">
                  <p className="mx-4 text-xs font-bold md:text-sm">Status</p>
                </div>
                <p>:</p>
                <div className="w-4/6">
                  <p className="mx-4 text-xs capitalize md:text-sm">
                    {pegawai.status}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="my-2 flex items-center justify-between">
                <div className="w-2/6">
                  <p className="mx-4 text-xs font-bold md:text-sm">Tenaga</p>
                </div>
                <p>:</p>
                <div className="w-4/6">
                  <p className="mx-4 text-xs capitalize md:text-sm">
                    {pegawai.tenaga}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="my-2 flex items-center justify-between">
                <div className="w-2/6">
                  <p className="mx-4 text-xs font-bold md:text-sm">
                    Status Kepegawaian
                  </p>
                </div>
                <p>:</p>
                <div className="w-4/6">
                  <p className="mx-4 text-xs md:text-sm">
                    {pegawai.status_kepegawaian}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="my-2 flex items-center justify-between">
                <div className="w-2/6">
                  <p className="mx-4 text-xs font-bold md:text-sm">
                    Tanggal Masuk
                  </p>
                </div>
                <p>:</p>
                <div className="w-4/6">
                  <p className="mx-4 text-xs md:text-sm">
                    {pegawai.tanggal_masuk.split("T")[0]}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="my-2 flex items-center justify-between">
                <div className="w-2/6">
                  <p className="mx-4 text-xs font-bold md:text-sm">
                    Tanggal Pensiun
                  </p>
                </div>
                <p>:</p>
                <div className="w-4/6">
                  <p className="mx-4 text-xs md:text-sm">
                    {pegawai.tanggal_pensiun.split("T")[0]}
                  </p>
                </div>
              </div>
              <Separator />
              <Separator />
              <div className="my-2 flex items-center justify-between">
                <div className="w-2/6">
                  <p className="mx-4 text-xs font-bold md:text-sm">Jabatan</p>
                </div>
                <p>:</p>
                <div className="w-4/6">
                  <p className="mx-4 text-xs md:text-sm">{pegawai.jabatan}</p>
                </div>
              </div>
              <Separator />
              <Separator />
              <div className="my-2 flex items-center justify-between">
                <div className="w-2/6">
                  <p className="mx-4 text-xs font-bold md:text-sm">
                    Jabatan Fungsional
                  </p>
                </div>
                <p>:</p>
                <div className="w-4/6">
                  {pegawai.jabatan_fungsional.map((jabatan: any, index) => (
                    <p key={index} className="mx-4 text-xs md:text-sm">
                      {jabatan.jabatanFungsional.nama} ,
                    </p>
                  ))}
                </div>
              </div>
              <Separator />
              <div className="my-2 flex items-center justify-between">
                <div className="w-2/6">
                  <p className="mx-4 text-xs font-bold md:text-sm">
                    Lokasi Kerja
                  </p>
                </div>
                <p>:</p>
                <div className="w-4/6">
                  <p className="mx-4 text-xs md:text-sm">{pegawai.lokasi}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileIndex;
