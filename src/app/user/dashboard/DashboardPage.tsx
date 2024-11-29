/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/custom/button";
import ContentSection from "@/components/custom/conten-separator";
import Modal from "@/components/custom/modal";
import { useAbsensiStore } from "@/store/absensi/absensiStore";
import {
  IconCalendarDot,
  IconCalendarUser,
  IconCashRegister,
  IconFaceId,
  IconMoonStars,
  IconReportMoney,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRef, useState } from "react";
import Webcam from "react-webcam";

const UserDashboardPage = () => {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [lokasi, setLokasi] = useState({ latitude: 0, longitude: 0 });
  const absenMasuk = useAbsensiStore((state) => state.insertAbsensiMasuk);
  const absenPulang = useAbsensiStore((state) => state.insertAbsensiPulang);
  const checkAbsensi = useAbsensiStore((state) => state.checkAbsensi);

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

    const koordinat = await getLocation();
    if (koordinat) {
      console.log("Lokasi Absen:", koordinat);
    }

    const tanggal = new Date()
      .toLocaleDateString("id-ID")
      .split("/")
      .reverse()
      .join("-");

    const checkAbsen = await checkAbsensi(session?.user.id as string, tanggal);
    if (checkAbsen.length > 0) {
      await absenPulang({
        user_id: session?.user.id as string,
        koordinat_pulang: `${lokasi.latitude}, ${lokasi.longitude}`,
        foto_pulang: imageFile as File,
      });
    } else {
      await absenMasuk({
        user_id: session?.user.id as string,
        koordinat_masuk: `${lokasi.latitude}, ${lokasi.longitude}`,
        foto_masuk: imageFile as File,
      });
    }
  };
  return (
    <ContentSection title="Dashboard" desc="Dashboard User">
      <div>
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          textHeader="Absensi"
        >
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
          <Button onClick={insertAbsensi} variant={"destructive"}>
            Absen
          </Button>
        </Modal>
        <Modal
          isOpen={showModal2}
          onClose={() => setShowModal2(false)}
          textHeader="Absensi"
        >
          <p>modal 2</p>
        </Modal>
        <Button onClick={() => setShowModal(true)}>Absen</Button>
        <div className="lg:justify- h-80 w-full space-y-4 rounded border-b-2 border-t-2 border-slate-900 bg-white">
          {/* layer up */}
          <div className="my-2 flex justify-around space-x-4">
            <Link
              href={"/user/riwayat-absensi"}
              className="flex h-20 w-20 cursor-pointer flex-col items-center justify-between rounded-sm border-[2px] border-black py-2 shadow-[2px_5px_0px_1px_rgba(0,0,0,1)] active:scale-95"
            >
              <IconFaceId className="h-8 w-8 text-black" />
              <h5 className="text-center text-xs font-bold text-black">
                Absensi
              </h5>
            </Link>

            <Link
              href={"/user/izin"}
              className="flex h-20 w-20 flex-col items-center rounded-sm border-[2px] border-black py-2 shadow-[2px_5px_0px_1px_rgba(0,0,0,1)] hover:scale-95 active:scale-90"
            >
              <IconCalendarDot className="h-8 w-8 text-black" />
              <h5 className="mt-2 text-center text-xs font-semibold text-black">
                Izin
              </h5>
            </Link>
            <div className="flex h-20 w-20 flex-col items-center rounded-sm border-[2px] border-black py-2 shadow-[2px_5px_0px_1px_rgba(0,0,0,1)]">
              <IconCalendarUser className="h-8 w-8 text-black" />
              <h5 className="mt-2 text-center text-xs font-semibold text-black">
                Jadwal
              </h5>
            </div>
          </div>
          {/* layer up end */}
          {/* layer down */}
          <div className="my-2 flex justify-around space-x-4">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center rounded-full bg-black p-2">
                <IconCashRegister className="h-6 w-6 text-white" />
              </div>
              <h5 className="mt-2 text-center text-xs font-semibold text-black">
                Gaji
              </h5>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center rounded-full bg-black p-2">
                <IconMoonStars className="h-6 w-6 text-white" />
              </div>
              <h5 className="mt-2 text-center text-xs font-semibold text-black">
                THR
              </h5>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center rounded-full bg-black p-2">
                <IconReportMoney className="h-6 w-6 text-white" />
              </div>
              <h5 className="mt-2 text-center text-xs font-semibold text-black">
                Pinjaman
              </h5>
            </div>
          </div>
          {/* layer down end */}
        </div>
      </div>
    </ContentSection>
  );
};

export default UserDashboardPage;
