"use client";

import { DataTable } from "@/components/table/data-table";
import { usePegawaiStore } from "@/store/pegawai/pegawaiStore";
import { useEffect } from "react";
import { absensiPegawaiColumns } from "./TunjanganTetapPegawaiColumns";

const TunjanganTetapPegawaiTable = () => {
  const fetchPegawai = usePegawaiStore((state) => state.fetchPegawai);
  const pegawais = usePegawaiStore((state) => state.pegawai);

  useEffect(() => {
    fetchPegawai();
  }, [fetchPegawai]);

  return (
    <>
      <DataTable columns={absensiPegawaiColumns} data={pegawais} />
    </>
  );
};

export default TunjanganTetapPegawaiTable;
