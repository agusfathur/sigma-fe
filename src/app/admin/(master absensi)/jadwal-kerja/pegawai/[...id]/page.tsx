import { Metadata } from "next";
import JadwalKerjaTable from "./PegawaiJadwalKerjaPage";

export const metadata: Metadata = {
  title: "Data Jadwal Kerja Pegawai",
};

const PegawaiJadwalKerjaPage = () => {
  return <JadwalKerjaTable />;
};

export default PegawaiJadwalKerjaPage;
