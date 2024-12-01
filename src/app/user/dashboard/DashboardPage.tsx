/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/custom/button";
import Modal from "@/components/custom/modal";
import ModalAlert from "@/components/custom/modal-alert";
import axiosJWT from "@/lib/authJWT";
import { useAbsensiStore } from "@/store/absensi/absensiStore";
import { useJadwalKerjaStore } from "@/store/jadwalKerja/jadwalKerjaStore";
import { Pegawai } from "@/store/pegawai/pegawai.types";
import {
  IconCalendarDot,
  IconCalendarUser,
  IconCashRegister,
  IconClock,
  IconFaceId,
  IconHourglass,
  IconHourglassLow,
  IconMoonStars,
  IconReportMoney,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

const UserDashboardPage = () => {
  const { data: session } = useSession();
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    message: "",
    type: "",
  });
  const [pegawai, setPegawai] = useState<Pegawai>({} as Pegawai);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [waktuAbsen, setWaktuAbsen] = useState({
    masuk: "",
    pulang: "",
  });

  const [jamKerja, setJamKerja] = useState({
    waktu_masuk: "-",
    waktu_pulang: "-",
  });
  const thisDay = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
  }).format(new Date());

  const [showModal, setShowModal] = useState(false);
  const [lokasi, setLokasi] = useState({ latitude: 0, longitude: 0 });
  const absenMasuk = useAbsensiStore((state) => state.insertAbsensiMasuk);
  const absenPulang = useAbsensiStore((state) => state.insertAbsensiPulang);
  const checkAbsensi = useAbsensiStore((state) => state.checkAbsensi);

  const jadwalKerja = useJadwalKerjaStore((state) => state.jadwalKerja);
  const fetchJadwalKerjaPegawaiByUserFilter = useJadwalKerjaStore(
    (state) => state.fetchJadwalKerjaPegawaiByUserFilter,
  );

  const menuItems = [
    {
      title: "Absensi",
      icon: <IconFaceId className="h-10 w-10 text-slate-900" />,
      href: "/user/riwayat-absensi",
    },
    {
      title: "Izin Cuti",
      icon: <IconCalendarDot className="h-10 w-10 text-slate-900" />,
      href: "/user/izin",
    },
    {
      title: "Jadwal",
      icon: <IconCalendarUser className="h-10 w-10 text-slate-900" />,
      href: "/user/jadwal",
    },

    {
      title: "Pinjaman",
      icon: <IconReportMoney className="h-10 w-10 text-slate-900" />,
      href: "/user/pinjaman",
    },
    {
      title: "THR",
      icon: <IconMoonStars className="h-10 w-10 text-slate-900" />,
      href: "/user/thr",
    },
    {
      title: "Slip Gaji",
      icon: <IconCashRegister className="h-10 w-10 text-slate-900" />,
      href: "/user/slip-gaji",
    },
  ];

  const getLocation = async () => {
    if ("geolocation" in navigator) {
      try {
        const { latitude, longitude } = await new Promise<{
          latitude: number;
          longitude: number;
        }>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            ({ coords }) =>
              resolve({
                latitude: coords.latitude,
                longitude: coords.longitude,
              }),
            (error) => reject(error),
          );
        });
        setLokasi({ latitude, longitude });
        return { latitude, longitude };
      } catch (error) {
        console.error("Error getting location:", error);
        return null;
      }
    } else {
      console.error("Geolocation is not supported");
      return null;
    }
  };

  // webcam
  const [hasPermission, setHasPermission] = useState(true);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const webcamRef = useRef<Webcam>(null);
  const videoConstraints = {
    width: 480,
    height: 480,
    facingMode: "user",
  };

  const handleUserMedia = () => {
    console.log("User granted access to the camera.");
  };

  const handleUserMediaError = (error: any) => {
    console.error("Error accessing camera:", error);
    setHasPermission(false);
    setError("Camera access is required to use this feature.");
    requestCameraPermission();
  };

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      console.log("Camera access granted.");
      setHasPermission(true);
      // Gunakan stream sesuai kebutuhan, misalnya untuk menampilkan video
    } catch (error) {
      console.error("Camera access denied:", error);
      setHasPermission(false);
      setError(
        "Unable to access camera. Please allow camera access in your browser settings.",
      );
    }
  };

  const getWaktuAbsen = async () => {
    const tanggal = new Date()
      .toLocaleDateString("id-ID")
      .split("/")
      .map((part) => part.padStart(2, "0"))
      .reverse()
      .join("-");

    try {
      const checkAbsen = await checkAbsensi(
        session?.user.id as string,
        tanggal,
      );
      if (checkAbsen.length > 0) {
        setWaktuAbsen({
          masuk: checkAbsen[0].waktu_masuk,
          pulang: checkAbsen[0].waktu_pulang,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserIdentity = async () => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pegawai/user/${session?.user.id}`,
      );
      setPegawai(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const insertAbsensi = async () => {
    let imageFile: File | null = null;
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImageUrl(imageSrc);
      const response = await fetch(imageSrc as string);
      // blob digunakan untuk mengambil gambar
      const blob = await response.blob();

      // Mengonversi blob menjadi File
      imageFile = new File([blob], "foto_masuk.jpg", { type: blob.type });
    }

    await getLocation();

    const tanggal = new Date()
      .toLocaleDateString("id-ID")
      .split("/")
      .map((part) => part.padStart(2, "0"))
      .reverse()
      .join("-");

    try {
      const checkAbsen = await checkAbsensi(
        session?.user.id as string,
        tanggal,
      );
      if (checkAbsen.length > 0) {
        await absenPulang({
          user_id: session?.user.id as string,
          koordinat_pulang: `${lokasi.latitude}, ${lokasi.longitude}`,
          foto_pulang: imageFile as File,
        });
        await getWaktuAbsen();
        setShowModal(false);
        setAlertMessage({
          message: `Absen Masuk Berhasil`,
          type: "success",
        });
        setShowModalAlert(true);
      } else {
        await absenMasuk({
          user_id: session?.user.id as string,
          koordinat_masuk: `${lokasi.latitude}, ${lokasi.longitude}`,
          foto_masuk: imageFile as File,
        });
        await getWaktuAbsen();
        setShowModal(false);
        setAlertMessage({
          message: `Absen Pulang Berhasil`,
          type: "success",
        });
        setShowModalAlert(true);
      }
    } catch (error: Error | any) {
      const errMsg = error.response.data.message;
      if (errMsg) {
        setShowModal(false);
        setAlertMessage({
          message: errMsg,
          type: "error",
        });
        setShowModalAlert(true);
      }
    }
  };

  const fetchJamKerja = async () => {
    const date = new Date()
      .toLocaleDateString("id-ID")
      .split("/")
      .map((part) => part.padStart(2, "0"))
      .reverse()
      .join("-");

    try {
      const pegawai = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pegawai/user/${session?.user.id}`,
      );
      const pegawaiId = pegawai.data.data.id_pegawai;
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jadwal-pegawai/pegawai/${pegawaiId}?tanggal=${date}`,
      );

      if (res.data.data.length > 0) {
        setJamKerja({
          waktu_masuk: res.data.data[0].shift_kerja.waktu_masuk,
          waktu_pulang: res.data.data[0].shift_kerja.waktu_pulang,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserIdentity();
    getWaktuAbsen();
    fetchJamKerja();
  }, [session?.user.id]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      const timeString = date.toLocaleTimeString("id-ID", { hour12: false }); // Menampilkan waktu dalam format 24 jam
      setCurrentTime(timeString);
    }, 1000); // Update setiap detik

    // Bersihkan interval ketika komponen di-unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div className="mb-5 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard User</h1>
        <Button onClick={() => setShowModalAlert(true)}>ALERT</Button>
      </div>

      <ModalAlert
        isOpen={showModalAlert}
        textHeader={alertMessage.message}
        type={alertMessage.type as "success" | "error"}
        setIsModalAlertOpen={() => setShowModalAlert(false)}
      />

      {/* modal absen*/}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        textHeader="Absensi"
      >
        <div className="space-y-4">
          <Webcam
            ref={webcamRef}
            audio={false}
            mirrored={true}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            onUserMedia={handleUserMedia}
            onUserMediaError={handleUserMediaError}
            className="rounded-md"
          />

          <Button
            onClick={insertAbsensi}
            className="w-full rounded-lg bg-violet-800 px-4 py-2 text-white transition duration-150 hover:bg-violet-900 active:scale-95"
          >
            Absen
          </Button>
        </div>
      </Modal>

      <div className="via-slate-960 mx-auto my-4 max-w-lg space-y-4 rounded-lg bg-gradient-to-t from-violet-950 to-slate-900 px-6 py-4 shadow-lg lg:max-w-full">
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <IconCalendarDot className="h-5 w-5 text-white" />
            <h5 className="text-md font-medium text-white">{thisDay}</h5>
          </div>
          <div className="flex items-center space-x-2">
            <IconHourglassLow className="h-5 w-5 text-white" />
            <h5 className="text-md font-bold text-white">{currentTime}</h5>
          </div>
        </div>

        {/* card jadwal */}
        <div className="flex items-center justify-between space-x-4">
          {/* Card Masuk */}
          <div className="flex items-center space-x-2">
            <IconCalendarUser className="h-5 w-5 text-white" />
            <h5 className="text-md font-medium text-white">Jadwal Kerja</h5>
          </div>
          <div className="flex space-x-2">
            <div className="flex items-center space-x-2 rounded-lg bg-slate-500 bg-opacity-60 px-3 py-1 text-center backdrop-blur-2xl backdrop-filter">
              <h5 className="text-md font-medium text-white">
                Masuk:
                <span className="ml-1">{jamKerja.waktu_masuk ?? "-"}</span>
              </h5>
            </div>

            {/* Card Pulang */}
            <div className="flex items-center space-x-2 rounded-lg bg-slate-500 bg-opacity-60 px-3 py-1 text-center backdrop-blur-2xl backdrop-filter">
              <h5 className="text-md font-medium text-white">
                Pulang:
                <span className="ml-1">{jamKerja.waktu_pulang ?? "-"}</span>
              </h5>
            </div>
          </div>
        </div>
      </div>

      {/* card absen */}
      <div className="mx-auto max-w-lg rounded-lg bg-gradient-to-t from-slate-900 via-slate-900 to-violet-950 p-6 shadow-lg lg:max-w-full">
        {/* Card Utama dengan Warna Gradasi */}

        <div className="flex w-full items-center gap-x-4">
          {/* Foto Profil */}
          {session?.user.image ? (
            <Image
              className="avatar rounded-full border-2 border-opacity-40"
              src={session?.user.image}
              alt="Profile"
              height={70}
              width={70}
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
              <span className="text-white">No Image</span>
            </div>
          )}

          {/* Nama Pengguna, Jabatan dan Status Online */}
          <div className="text-white">
            <h3 className="text-lg font-semibold">
              Hi{" "}
              <span className="font-bold uppercase">{session?.user.name}</span>
            </h3>
            <p className="text-md font-medium">
              Jabatan:{" "}
              <span className="capitalize">{pegawai?.jabatan?.nama}</span>
            </p>
          </div>
        </div>

        {/* Jam Masuk dan Pulang dengan Efek Kaca (Glassmorphism) */}

        <div className="mt-6 flex justify-between space-x-4 lg:flex-row lg:space-y-0">
          {/* Card Masuk dengan Efek Kaca */}
          <div className="h-full w-1/2 rounded-xl bg-white bg-opacity-80 p-5 text-center backdrop-blur-2xl backdrop-filter">
            <p className="font-mono text-lg font-bold text-gray-800">Masuk</p>
            <p className="font-mono text-lg font-bold text-gray-900">
              {waktuAbsen.masuk || "--:--"}
            </p>
          </div>

          {/* Card Pulang dengan Efek Kaca */}
          <div className="h-full w-1/2 rounded-xl bg-white bg-opacity-80 p-5 text-center backdrop-blur-2xl backdrop-filter">
            <p className="font-mono text-lg font-bold text-gray-800">Pulang</p>
            <p className="font-mono text-lg font-bold text-gray-900">
              {waktuAbsen.pulang || "--:--"}
            </p>
          </div>
        </div>

        {/* Tombol Absen */}
        <div className="mt-6 w-full">
          <Button
            onClick={() => setShowModal(true)}
            className="w-full rounded-lg bg-violet-800 px-4 py-2 text-white transition duration-150 hover:bg-violet-900 active:scale-95"
          >
            Absensi
          </Button>
        </div>
      </div>
      {/* card absen end */}

      {/* menu */}
      <div className="via-slate-960 mx-auto my-4 max-w-lg space-y-4 rounded-lg bg-gradient-to-t from-violet-950 to-slate-900 px-6 py-4 shadow-lg lg:max-w-full">
        <h3 className="flex justify-center text-lg font-bold text-white">
          MENU
        </h3>
        <div className="mt-6 flex flex-wrap justify-between gap-x-4 gap-y-6 lg:flex-row lg:space-y-0">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="h-full w-[30%] cursor-pointer rounded-xl bg-white bg-opacity-80 p-5 text-center backdrop-blur-2xl backdrop-filter transition duration-150 hover:scale-110 hover:bg-gray-300 active:scale-90 active:bg-gray-300 lg:w-[14%]"
            >
              <Link
                href={item.href}
                className="flex h-full flex-col items-center justify-center space-y-4"
              >
                {item.icon}
                <h5 className="text-md text-center font-mono font-bold text-slate-900">
                  {item.title}
                </h5>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;
