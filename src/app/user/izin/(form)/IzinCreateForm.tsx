/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Select from "react-select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/custom/button";
import { usePermohonanIzinStore } from "@/store/permohonanIzin/permohonanIzinStore";
import { IzinCreateSchema, TypeIzinCreateSchemaCreate } from "./IzinSchema";
import { useJenisIzinStore } from "@/store/jenisIzin/jenisIzinStore";
import { useSession } from "next-auth/react";
import axiosJWT from "@/lib/authJWT";

interface IzinCreateFormProps {
  onSuccess: () => void;
}

interface Option {
  value: string;
  label: string;
}

export default function IzinCreateForm({ onSuccess }: IzinCreateFormProps) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const insertPermohonanIzin = usePermohonanIzinStore(
    (state) => state.insertPermohonanIzin,
  );

  const jenisIzin = useJenisIzinStore((state) => state.jenisIzin);
  const fetchJenisIzin = useJenisIzinStore((state) => state.fetchJenisIzin);

  const jenisIzinOptions: Option[] = jenisIzin.map((item) => ({
    value: item.id_jenis_izin,
    label: `${item.jenis} | ${item.nama} (sisa: ${item.jatah})`,
  }));

  const jenisMohonIzinOptions = [
    { value: "cuti", label: "Cuti" },
    { value: "izin", label: "Izin" },
  ];

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [buktiMessage, setBuktiMessage] = useState<string>("");

  const formIzin = useForm<TypeIzinCreateSchemaCreate>({
    resolver: zodResolver(IzinCreateSchema),
    defaultValues: {
      jenis_izin_id: "",
      jenis_mohon_izin: "",
      tanggal_dari: "",
      tanggal_sampai: "",
      keterangan: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const fileName = file?.name;
      const fileExt = fileName.split(".")[fileName.split(".").length - 1];
      const ext = ["pdf", "png", "jpg", "jpeg", "PDF", "PNG", "JPG", "JPEG"];
      if (!ext.includes(fileExt)) {
        setBuktiMessage(
          "Format File Tidak Sesuai, Silahkan Upload File PDF, PNG, JPG, JPEG",
        );
        return;
      } else {
        setBuktiMessage("");
        formIzin.setValue("bukti", fileName);
        setSelectedFile(file); // Store the selected file
      }
    } else {
      setBuktiMessage("");
      setSelectedFile(null);
    }
  };

  const onSubmit = async (data: TypeIzinCreateSchemaCreate) => {
    setIsLoading(true);
    try {
      const pegawai = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pegawai/user/${session?.user?.id}`,
      );

      if (selectedFile) {
        const res = await insertPermohonanIzin({
          ...data,
          pegawai_id: pegawai.data.data.id_pegawai as string,
          bukti: selectedFile as File,
          status: "pending",
        });
      }
      formIzin.reset();
      onSuccess();
    } catch (error) {
      console.error("Error Insert Tunjangan Bonus:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJenisIzin();
  }, [fetchJenisIzin]);

  return (
    <>
      <FormProvider {...formIzin}>
        <form onSubmit={formIzin.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            {/* jenis mohon izin */}
            <FormField
              control={formIzin.control}
              name="jenis_mohon_izin"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Izin / Cuti
                  </FormLabel>
                  <Select
                    options={jenisMohonIzinOptions}
                    className="w-full rounded-md dark:text-black"
                    classNamePrefix="react-select"
                    placeholder="Izin / Cuti"
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
                  />
                  <FormControl></FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />
            {/* jenis izin */}

            <FormField
              control={formIzin.control}
              name="jenis_izin_id"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Jenis Izin
                  </FormLabel>
                  <Select
                    options={jenisIzinOptions}
                    className="w-full rounded-md dark:text-black"
                    classNamePrefix="react-select"
                    placeholder="Select jenis izin"
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
                  />

                  <FormControl></FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />

            {/* tanggal */}
            <div className="flex w-full space-x-2">
              <div className="w-1/2">
                <FormField
                  control={formIzin.control}
                  name="tanggal_dari"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Dari Tanggal
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="tanggal" type="date" {...field} />
                      </FormControl>
                      <div className="h-2">
                        <FormMessage className="text-xs" />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/2">
                <FormField
                  control={formIzin.control}
                  name="tanggal_sampai"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Sampai Tanggal
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="tanggal"
                          className="w-full"
                          type="date"
                          {...field}
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

            {/* keterangan */}
            <FormField
              control={formIzin.control}
              name="keterangan"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Keterangan
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="keterangan" />
                  </FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />

            {/* Bukti */}
            <FormField
              control={formIzin.control}
              name="bukti"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">Bukti</FormLabel>
                  <FormControl>
                    <Input
                      name="bukti"
                      type="file"
                      className="w-full rounded-md border-black dark:text-white"
                      placeholder="foto pegawai"
                      accept="pdf/*, image/*"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleFileChange(e);
                      }}
                    />
                  </FormControl>
                  <div className="flex h-2 space-x-1 md:space-x-2">
                    {buktiMessage && (
                      <p className="text-xs text-red-700">{buktiMessage}</p>
                    )}
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-2" loading={isLoading}>
              Buat Izin
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
