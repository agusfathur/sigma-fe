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
import { useJadwalKerjaStore } from "@/store/jadwalKerja/jadwalKerjaStore";
import {
  JadwalKerjaCreateSchema,
  TypeJadwalKerjaCreate,
} from "./JadwalKerjaSchema";
import { useJamKerjaStore } from "@/store/jamKerja/jamKerjaStore";
import { usePegawaiStore } from "@/store/pegawai/pegawaiStore";
import { Checkbox } from "@/components/ui/checkbox";
import { Pegawai } from "@/store/pegawai/pegawai.types";
import { useToastStore } from "@/store/toastStore";

interface JadwalKerjaCreateFormProps {
  onSuccess: () => void;
  pegawaiDataProps?: Pegawai;
}

interface Option {
  value: string;
  label: string;
}

export default function JadwalKerjaCreateForm({
  onSuccess,
  pegawaiDataProps,
}: JadwalKerjaCreateFormProps) {
  const {
    isOpen: toastOpen,
    message,
    type: toastType,
    setToast,
  } = useToastStore();
  const [isLoading, setIsLoading] = useState(false);
  const [tanggalSenin, setTanggalSenin] = useState("");
  const [tanggalSelasa, setTanggalSelasa] = useState("");
  const [tanggalRabu, setTanggalRabu] = useState("");
  const [tanggalKamis, setTanggalKamis] = useState("");
  const [tanggalJumat, setTanggalJumat] = useState("");
  const [tanggalSabtu, setTanggalSabtu] = useState("");
  const [tanggalMinggu, setTanggalMinggu] = useState("");

  const fetchPegawai = usePegawaiStore((state) => state.fetchPegawai);
  const pegawais = usePegawaiStore((state) => state.pegawai);
  const fetchJamKerja = useJamKerjaStore((state) => state.fetchJamKerja);
  const jamKerja = useJamKerjaStore((state) => state.jamKerja);
  let pegawaiOptions: Option[];

  if (pegawaiDataProps) {
    pegawaiOptions = [
      {
        value: pegawaiDataProps.id_pegawai,
        label: pegawaiDataProps.nama,
      },
    ];
  } else {
    pegawaiOptions = pegawais.map((pegawai) => ({
      value: pegawai.id_pegawai,
      label: pegawai.nama,
    }));
  }
  const jamKerjaOptions: Option[] = jamKerja.map((jamKerja) => ({
    value: jamKerja.id_shift_kerja,
    label: `${jamKerja.waktu_masuk}-${jamKerja.waktu_pulang} | ${jamKerja.keterangan}`,
  }));

  const insertJadwalKerja = useJadwalKerjaStore(
    (state) => state.insertJadwalKerja,
  );

  const formJadwalKerja = useForm<TypeJadwalKerjaCreate>({
    resolver: zodResolver(JadwalKerjaCreateSchema),
    defaultValues: {
      pegawai_id: [],
      shift_id_senin: "",
      tanggal_senin: "",
      shift_id_selasa: "",
      tanggal_selasa: "",
      shift_id_rabu: "",
      tanggal_rabu: "",
      shift_id_kamis: "",
      tanggal_kamis: "",
      shift_id_jumat: "",
      tanggal_jumat: "",
      shift_id_sabtu: "",
      tanggal_sabtu: "",
      shift_id_minggu: "",
      tanggal_minggu: "",
    },
  });

  const onSubmit = async (data: TypeJadwalKerjaCreate) => {
    setIsLoading(true);
    try {
      const pegawai = data.pegawai_id;
      for await (const pge of pegawai) {
        if (data.shift_id_senin && data.tanggal_senin) {
          const res = await insertJadwalKerja({
            pegawai_id: pge,
            shift_id: data.shift_id_senin,
            tanggal: data.tanggal_senin + "T00:00:00.000Z",
          });
        }
        if (data.shift_id_selasa && data.tanggal_selasa) {
          const res = await insertJadwalKerja({
            pegawai_id: pge,
            shift_id: data.shift_id_selasa,
            tanggal: data.tanggal_selasa + "T00:00:00.000Z",
          });
        }
        if (data.shift_id_rabu && data.tanggal_rabu) {
          const res = await insertJadwalKerja({
            pegawai_id: pge,
            shift_id: data.shift_id_rabu,
            tanggal: data.tanggal_rabu + "T00:00:00.000Z",
          });
        }
        if (data.shift_id_kamis && data.tanggal_kamis) {
          const res = await insertJadwalKerja({
            pegawai_id: pge,
            shift_id: data.shift_id_kamis,
            tanggal: data.tanggal_kamis + "T00:00:00.000Z",
          });
        }
        if (data.shift_id_jumat && data.tanggal_jumat) {
          const res = await insertJadwalKerja({
            pegawai_id: pge,
            shift_id: data.shift_id_jumat,
            tanggal: data.tanggal_jumat + "T00:00:00.000Z",
          });
        }
        if (data.shift_id_sabtu && data.tanggal_sabtu) {
          const res = await insertJadwalKerja({
            pegawai_id: pge,
            shift_id: data.shift_id_sabtu,
            tanggal: data.tanggal_sabtu + "T00:00:00.000Z",
          });
        }
        if (data.shift_id_minggu && data.tanggal_minggu) {
          const res = await insertJadwalKerja({
            pegawai_id: pge,
            shift_id: data.shift_id_minggu,
            tanggal: data.tanggal_minggu + "T00:00:00.000Z",
          });
        }
      }
      formJadwalKerja.reset();
      setToast({
        isOpen: true,
        message: "Jadwal Kerja Berhasil Ditambahkan",
        type: "success",
      });
      onSuccess();
    } catch (error) {
      setToast({
        isOpen: true,
        message: "Jadwal Kerja Gagal Ditambahkan",
        type: "error",
      });
      console.error("Error Insert Jadwal Kerja:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJamKerja();
    fetchPegawai();
  }, [fetchJamKerja, fetchPegawai]);

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
                  <FormLabel className="mb-3 text-sm lg:text-base">
                    Pilih Pegawai
                  </FormLabel>
                  <div className="flex w-full justify-between space-x-4">
                    {/* Kolom Kiri */}
                    <div className="w-1/2 space-y-2">
                      {pegawaiOptions
                        ?.slice(0, Math.ceil(pegawaiOptions.length / 2)) // Setengah pertama opsi
                        .map((pegawai, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={pegawai.value}
                              value={pegawai.value}
                              checked={field.value.includes(pegawai.value)}
                              onCheckedChange={(isChecked) => {
                                const updatedValues = isChecked
                                  ? [...field.value, pegawai.value]
                                  : field.value.filter(
                                      (val) => val !== pegawai.value,
                                    );
                                field.onChange(updatedValues);
                              }}
                            />
                            <label
                              htmlFor={pegawai.value}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {pegawai.label}
                            </label>
                          </div>
                        ))}
                    </div>

                    {/* Kolom Kanan */}
                    <div className="w-1/2 space-y-2">
                      {pegawaiOptions
                        ?.slice(Math.ceil(pegawaiOptions.length / 2)) // Setengah kedua opsi
                        .map((pegawai, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={pegawai.value}
                              value={pegawai.value}
                              checked={field.value.includes(pegawai.value)}
                              onCheckedChange={(isChecked) => {
                                const updatedValues = isChecked
                                  ? [...field.value, pegawai.value]
                                  : field.value.filter(
                                      (val) => val !== pegawai.value,
                                    );
                                field.onChange(updatedValues);
                              }}
                            />
                            <label
                              htmlFor={pegawai.value}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {pegawai.label}
                            </label>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />

            <div className="flex w-full justify-between space-x-1" id="senin">
              <div className="w-1/2">
                <FormField
                  control={formJadwalKerja.control}
                  name="shift_id_senin"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Jam Kerja : Senin
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
              </div>
              <div className="w-1/2">
                <FormField
                  control={formJadwalKerja.control}
                  name="tanggal_senin"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Tanggal : Senin
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="durasi kerja"
                          type="date"
                          {...field}
                          value={tanggalSenin}
                          onChange={(e) => {
                            setTanggalSenin(e.target.value);
                            formJadwalKerja.setValue(
                              "tanggal_senin",
                              e.target.value,
                            );
                          }}
                        />
                      </FormControl>
                      <div className="h-2">
                        <FormMessage className="text-xs" />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex w-full justify-between space-x-1" id="selasa">
              <div className="w-1/2">
                <FormField
                  control={formJadwalKerja.control}
                  name="shift_id_selasa"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Jam Kerja : Selasa
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
              </div>
              <div className="w-1/2">
                <FormField
                  control={formJadwalKerja.control}
                  name="tanggal_selasa"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Tanggal : Selasa
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="durasi kerja"
                          type="date"
                          {...field}
                          value={tanggalSelasa}
                          onChange={(e) => {
                            setTanggalSelasa(e.target.value);
                            formJadwalKerja.setValue(
                              "tanggal_selasa",
                              e.target.value,
                            );
                          }}
                        />
                      </FormControl>
                      <div className="h-2">
                        <FormMessage className="text-xs" />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex w-full justify-between space-x-1" id="rabu">
              <div className="w-1/2">
                <FormField
                  control={formJadwalKerja.control}
                  name="shift_id_rabu"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Jam Kerja : Rabu
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
              </div>
              <div className="w-1/2">
                <FormField
                  control={formJadwalKerja.control}
                  name="tanggal_rabu"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Tanggal : Rabu
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="durasi kerja"
                          type="date"
                          {...field}
                          value={tanggalRabu}
                          onChange={(e) => {
                            setTanggalRabu(e.target.value);
                            formJadwalKerja.setValue(
                              "tanggal_rabu",
                              e.target.value,
                            );
                          }}
                        />
                      </FormControl>
                      <div className="h-2">
                        <FormMessage className="text-xs" />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex w-full justify-between space-x-1" id="kamis">
              <div className="w-1/2">
                <FormField
                  control={formJadwalKerja.control}
                  name="shift_id_kamis"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Jam Kerja : Kamis
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
              </div>
              <div className="w-1/2">
                <FormField
                  control={formJadwalKerja.control}
                  name="tanggal_kamis"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Tanggal : Kamis
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="durasi kerja"
                          type="date"
                          {...field}
                          value={tanggalKamis}
                          onChange={(e) => {
                            setTanggalKamis(e.target.value);
                            formJadwalKerja.setValue(
                              "tanggal_kamis",
                              e.target.value,
                            );
                          }}
                        />
                      </FormControl>
                      <div className="h-2">
                        <FormMessage className="text-xs" />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex w-full justify-between space-x-1" id="jumat">
              <div className="w-1/2">
                <FormField
                  control={formJadwalKerja.control}
                  name="shift_id_jumat"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Jam Kerja : Jumat
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
              </div>
              <div className="w-1/2">
                <FormField
                  control={formJadwalKerja.control}
                  name="tanggal_jumat"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Tanggal : Jumat
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="durasi kerja"
                          type="date"
                          {...field}
                          value={tanggalJumat}
                          onChange={(e) => {
                            setTanggalJumat(e.target.value);
                            formJadwalKerja.setValue(
                              "tanggal_jumat",
                              e.target.value,
                            );
                          }}
                        />
                      </FormControl>
                      <div className="h-2">
                        <FormMessage className="text-xs" />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex w-full justify-between space-x-1" id="sabtu">
              <div className="w-1/2">
                <FormField
                  control={formJadwalKerja.control}
                  name="shift_id_sabtu"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Jam Kerja : Sabtu
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
              </div>
              <div className="w-1/2">
                <FormField
                  control={formJadwalKerja.control}
                  name="tanggal_sabtu"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Tanggal : Sabtu
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="durasi kerja"
                          type="date"
                          {...field}
                          value={tanggalSabtu}
                          onChange={(e) => {
                            setTanggalSabtu(e.target.value);
                            formJadwalKerja.setValue(
                              "tanggal_sabtu",
                              e.target.value,
                            );
                          }}
                        />
                      </FormControl>
                      <div className="h-2">
                        <FormMessage className="text-xs" />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex w-full justify-between space-x-1" id="minggu">
              <div className="w-1/2">
                <FormField
                  control={formJadwalKerja.control}
                  name="shift_id_minggu"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Jam Kerja : Minggu
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
              </div>
              <div className="w-1/2">
                <FormField
                  control={formJadwalKerja.control}
                  name="tanggal_minggu"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Tanggal : Minggu
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="durasi kerja"
                          type="date"
                          {...field}
                          value={tanggalMinggu}
                          onChange={(e) => {
                            setTanggalMinggu(e.target.value);
                            formJadwalKerja.setValue(
                              "tanggal_minggu",
                              e.target.value,
                            );
                          }}
                        />
                      </FormControl>
                      <div className="h-2">
                        <FormMessage className="text-xs" />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button type="submit" className="mt-2" loading={isLoading}>
              Tambah Jadwal Kerja
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
