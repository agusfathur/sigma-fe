"use client";

import { usePegawaiStore } from "@/store/pegawai/pegawaiStore";
import { useParams, useRouter } from "next/navigation";
import TunjanganTetapPegawaiTable from "./(table)/TunjanganTetapPegawaiTable";
import { Button } from "@/components/custom/button";

const TunjanganTetapPegawaiPage = () => {
  const { id: pegawaiId } = useParams();
  const pegawaiData = usePegawaiStore((state) => state.pegawaiData);

  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <div>
      <div className="mb-5 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Setting Tunjangan Tetap Pegawai : {pegawaiData?.nama}
        </h1>
      </div>

      <div className="space-y-4">
        <Button
          variant={"outline"}
          size={"sm"}
          className="border-black dark:border-white"
          onClick={handleBack}
        >
          Kembali
        </Button>
        <TunjanganTetapPegawaiTable pegawaiId={pegawaiId as string} />
      </div>
    </div>
  );
};

export default TunjanganTetapPegawaiPage;
