import { Metadata } from "next";
// import Cek from "./cek";
import TunjanganTetapPegawaiPage from "./TunjanganTetapPegawaiPage";

export const metadata: Metadata = {
  title: "Setting Tunjangan Tetap Pegawai",
};

const SettingTunjanganTetapPegawai = () => {
  return (
    <>
      <TunjanganTetapPegawaiPage />
    </>
  );
};

export default SettingTunjanganTetapPegawai;
