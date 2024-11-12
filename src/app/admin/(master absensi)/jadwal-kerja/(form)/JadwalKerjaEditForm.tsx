/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Select from "react-select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/custom/button";
import { useStatusKepegawaianStore } from "@/store/statusKepegawaian/statusKepegawaianStore";
import { useJadwalKerjaStore } from "@/store/jadwalKerja/jadwalKerjaStore";
import {
  JadwalKerjaUpdateSchema,
  TypeJadwalKerjaUpdate,
} from "./JadwalKerjaSchema";
import { useJamKerjaStore } from "@/store/jamKerja/jamKerjaStore";
import { Pegawai } from "@/store/pegawai/pegawai.types";
import { usePegawaiStore } from "@/store/pegawai/pegawaiStore";

interface JadwalKerjaUpdateFormProps {
  onSuccess: () => void;
  pegawaiDataProps?: Pegawai;
}

export default function StatusPegawaiUpdateForm({
  onSuccess,
  pegawaiDataProps,
}: JadwalKerjaUpdateFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const jadwalKerjaData = useJadwalKerjaStore((state) => state.jadwalKerjaData);

  const [tanggal, setTanggal] = useState<string>(
    jadwalKerjaData?.tanggal.split("T")[0] || "",
  );
  const fetchPegawai = usePegawaiStore((state) => state.fetchPegawai);
  const getPegawai = usePegawaiStore((state) => state.pegawaiById);

  let pegawai;
  if (pegawaiDataProps) {
    pegawai = pegawaiDataProps;
  } else {
    pegawai = getPegawai(jadwalKerjaData?.pegawai_id || "");
  }

  const updateJadwalKerja = useJadwalKerjaStore(
    (state) => state.updateJadwalKerja,
  );

  const jamKerja = useJamKerjaStore((state) => state.jamKerja);
  const fetchJamKerja = useJamKerjaStore((state) => state.fetchJamKerja);

  const jamKerjaOptions = jamKerja.map((jamKerja) => ({
    value: jamKerja.id_shift_kerja,
    label: `${jamKerja.waktu_masuk}-${jamKerja.waktu_pulang} | ${jamKerja.keterangan}`,
  }));

  useEffect(() => {
    fetchJamKerja();
    fetchPegawai();
  }, [fetchJamKerja, fetchPegawai]);

  const formJadwalKerja = useForm<TypeJadwalKerjaUpdate>({
    resolver: zodResolver(JadwalKerjaUpdateSchema),
    defaultValues: {
      id_jadwal: jadwalKerjaData?.id_jadwal || "",
      pegawai_id: pegawai?.nama || "",
      shift_id: jadwalKerjaData?.shift_id || "",
      tanggal: jadwalKerjaData?.tanggal.split("T")[0] || "",
    },
  });

  const onSubmit = async (data: TypeJadwalKerjaUpdate) => {
    setIsLoading(true);
    try {
      const res = await updateJadwalKerja({
        id_jadwal: data.id_jadwal,
        pegawai_id: jadwalKerjaData?.pegawai_id,
        shift_id: data.shift_id,
        tanggal: tanggal + "T00:00:00.000Z",
      });
      formJadwalKerja.reset();
      onSuccess();
    } catch (error) {
      console.error("Error Update Status Pegawai:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormProvider {...formJadwalKerja}>
        <form onSubmit={formJadwalKerja.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={formJadwalKerja.control}
              name="pegawai_id"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Pegawai
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="pegawai" {...field} readOnly />
                  </FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={formJadwalKerja.control}
              name="shift_id"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Jam Kerja
                  </FormLabel>
                  <Select
                    {...field}
                    options={jamKerjaOptions}
                    className="w-full rounded-md dark:text-black"
                    classNamePrefix="react-select"
                    placeholder="Select jam kerja"
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary: "black", // Warna border saat di-focus
                        primary25: "#e5e7eb", // Warna abu-abu terang saat di-hover
                        primary50: "#d1d5db", // Warna abu-abu saat di-click
                        neutral20: "black", // Border default
                        neutral80: "black",
                      },
                    })}
                    onChange={(selectedOption) =>
                      field.onChange(
                        selectedOption ? String(selectedOption.value) : "",
                      )
                    }
                    value={
                      jamKerjaOptions.find(
                        (option: any) =>
                          String(option.value) === String(field.value),
                      ) || null
                    }
                  />
                  <FormControl></FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={formJadwalKerja.control}
              name="tanggal"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Tanggal
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="tanggal kerja"
                      type="date"
                      {...field}
                      value={tanggal}
                      onChange={(e) => {
                        setTanggal(e.target.value);
                        formJadwalKerja.setValue("tanggal", e.target.value);
                      }}
                    />
                  </FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-2" loading={isLoading}>
              Update Jadwal Kerja
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
