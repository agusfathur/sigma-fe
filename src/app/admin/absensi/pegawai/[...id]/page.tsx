import { Metadata } from "next";
import AbsensiPegawaiDetailTable from "./PegawaiAbsensiPage";

export const metadata: Metadata = {
  title: "Detail Absensi Pegawai",
};

const DetailAbsensiPegawai = () => {
  return (
    <>
      <AbsensiPegawaiDetailTable />
    </>
  );
};

export default DetailAbsensiPegawai;
