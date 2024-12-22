/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
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
import { TypePegawaiCreate, PegawaiCreateSchema } from "./PegawaiSchema";
import { usePegawaiStore } from "@/store/pegawai/pegawaiStore";
import { useLokasiStore } from "@/store/lokasi/lokasiStore";
import { useJabatanStore } from "@/store/jabatan/jabatanStore";
import { useJabatanFungsionalStore } from "@/store/jabatanFungsional/jabatanFungsionalStore";
import { useStatusKepegawaianStore } from "@/store/statusKepegawaian/statusKepegawaianStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useToastStore } from "@/store/toastStore";

interface PegawaiCreateFormProps {
  onSuccess: () => void;
}

interface Option {
  value: string;
  label: string;
}

export default function PegawaiCreateForm({
  onSuccess,
}: PegawaiCreateFormProps) {
  const {
    isOpen: toastOpen,
    message,
    type: toastType,
    setToast,
  } = useToastStore();
  const [isLoading, setIsLoading] = useState(false);
  const [riwayatPendidikan, setRiwayatPendidikan] = useState([""]);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const animatedComponents = makeAnimated();

  // Lokasi
  const fetchLokasi = useLokasiStore((state) => state.fetchLokasi);
  const lokasis = useLokasiStore((state) => state.lokasi);
  const lokasiOptions: Option[] = lokasis.map((lokasi) => ({
    value: lokasi.id_lokasi,
    label: lokasi.nama,
  }));

  // jabatan
  const fetchJabatan = useJabatanStore((state) => state.fetchJabatan);
  const jabatans = useJabatanStore((state) => state.jabatan);
  const jabatanOptions: Option[] = jabatans.map((jabatan) => ({
    value: jabatan.id_jabatan,
    label: jabatan.nama,
  }));

  // jabatan fungsional
  const fetchJabatanFungsional = useJabatanFungsionalStore(
    (state) => state.fetchJabatanFungsional,
  );
  const jabatanFungsionals = useJabatanFungsionalStore(
    (state) => state.jabatanFungsional,
  );
  const jabatanFungsionalOptions: Option[] = jabatanFungsionals.map(
    (jabatanFungsional) => ({
      value: jabatanFungsional.id_jabatan_fungsional,
      label: jabatanFungsional.nama,
    }),
  );

  // status kepegawaian
  const fetchStatusKepegawaian = useStatusKepegawaianStore(
    (state) => state.fetchStatusKepegawaian,
  );
  const statusKepegawaians = useStatusKepegawaianStore(
    (state) => state.statusKepegawaian,
  );

  const statusKepegawaianOptions: Option[] = statusKepegawaians.map(
    (statusKepegawaian) => ({
      value: statusKepegawaian.id_status_kepegawaian,
      label: statusKepegawaian.nama,
    }),
  );

  // agama
  const agamaOptions: Option[] = [
    { value: "islam", label: "Islam" },
    { value: "kristen", label: "Kristen" },
    { value: "katolik", label: "Katolik" },
    { value: "hindu", label: "Hindu" },
    { value: "buddha", label: "Budha" },
    { value: "konghucu", label: "Konghucu" },
  ];

  // gender
  const genderOptions: Option[] = [
    { value: "laki_laki", label: "Laki-laki" },
    { value: "perempuan", label: "Perempuan" },
  ];

  // tenaga role
  const tenagaRoleOptions: Option[] = [
    { value: "pendidik", label: "Tenaga Pendidik" },
    { value: "kependidikan", label: "Tenaga Kependidikan" },
  ];

  // status tetap
  const statusTetapOptions: Option[] = [
    { value: "tetap", label: "Tetap" },
    { value: "tidak_tetap", label: "Tidak Tetap" },
  ];

  // status pegawai
  const statusPegawaiOptions: Option[] = [
    { value: "aktif", label: "Aktif" },
    { value: "pindah", label: "Pindah" },
    { value: "keluar", label: "Keluar" },
    { value: "meninggal", label: "Meninggal" },
    { value: "pensiun", label: "Pensiun" },
  ];

  // user
  // userRole
  const userRoleOptions: Option[] = [
    { value: "admin", label: "Admin" },
    { value: "super_admin", label: "Super Admin" },
    { value: "user", label: "User" },
  ];

  // status pernikahan
  const statusPernikahanOptions: Option[] = [
    { value: "menikah", label: "Menikah" },
    { value: "belum menikah", label: "Belum Menikah" },
    { value: "janda", label: "Janda" },
    { value: "duda", label: "Duda" },
  ];

  const insertPegawai = usePegawaiStore((state) => state.insertPegawai);
  const formPegawai = useForm<TypePegawaiCreate>({
    resolver: zodResolver(PegawaiCreateSchema),
    defaultValues: {
      nama: "",
      username: "",
      password: "",
      role: "",
      email: "",
      nomor_hp: "",
      nik: "",
      nip: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      tanggal_masuk: "",
      gender: "",
      agama: "",
      tenaga: "",
      status_tetap: "",
      jabatan_id: "",
      status_kepegawaian_id: "",
      riwayat_pendidikan: [""],
      status_pernikahan: "",
      jumlah_istri: 0,
      jumlah_anak: 0,
      nomor_rekening: "",
      status_pegawai: "",
      lokasi_id: "",
      jabatan_fungsional_id: [""],
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file); // Store the selected file
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      setSelectedFile(null);
    }
  };

  // Fungsi untuk menambah input riwayat pendidikan baru
  const handleRiwayatPendidikanField = () => {
    setRiwayatPendidikan([...riwayatPendidikan, ""]);
  };

  // Fungsi untuk menghapus input riwayat pendidikan berdasarkan indeks
  const handleRemoveRiwayatPendidikanField = (index: number) => {
    setRiwayatPendidikan((prev) => prev.filter((_, i) => i !== index));
  };
  const handleInputChange = (index: number, value: string) => {
    const updatedRiwayat = [...riwayatPendidikan];
    updatedRiwayat[index] = value;
    setRiwayatPendidikan(updatedRiwayat);
    formPegawai.setValue(`riwayat_pendidikan.${index}`, value);
  };

  const [tanggalLahir, setTanggalLahir] = useState("");
  const [tanggalPensiun, setTanggalPensiun] = useState("");
  const handleTanggalPensiun = (tanggal_lahir: string) => {
    if (tanggal_lahir) {
      const date = new Date(tanggal_lahir);
      date.setFullYear(date.getFullYear() + 60);
      setTanggalPensiun(date.toISOString().split("T")[0]);
      formPegawai.setValue("tanggal_pensiun", date.toISOString().split("T")[0]);
    }
  };

  const [errorMessage, setErrorMessage] = useState({
    foto: "",
    username: "",
    email: "",
    nomor_hp: "",
    nip: "",
    nik: "",
    nomor_rekening: "",
  });

  const onSubmit = async (data: TypePegawaiCreate) => {
    if (!selectedFile) {
      setErrorMessage({ ...errorMessage, foto: "Foto tidak boleh kosong" });
      return;
    }
    setIsLoading(true);
    try {
      const create = await insertPegawai({ ...data, foto: selectedFile });

      if (create) {
        onSuccess();
        setToast({
          isOpen: true,
          message: "Pegawai berhasil ditambahkan",
          type: "success",
        });
      }
    } catch (error: Error | any) {
      console.error("Error Insert Pegawai:", error);
      const errMsg = error.response.data.message;
      if (errMsg) {
        setErrorMessage({
          foto: errMsg.foto ? errMsg.foto.join(", ") : "",
          email: errMsg.email ? errMsg.email.join(", ") : "",
          username: errMsg.username ? errMsg.username.join(", ") : "",
          nomor_hp: errMsg.nomor_hp ? errMsg.nomor_hp.join(", ") : "",
          nip: errMsg.nip ? errMsg.nip.join(", ") : "",
          nik: errMsg.nik ? errMsg.nik.join(", ") : "",
          nomor_rekening: errMsg.nomor_rekening
            ? errMsg.nomor_rekening.join(", ")
            : "",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLokasi();
    fetchJabatan();
    fetchJabatanFungsional();
    fetchStatusKepegawaian();
  }, [
    fetchLokasi,
    fetchJabatan,
    fetchJabatanFungsional,
    fetchStatusKepegawaian,
  ]);

  return (
    <>
      <FormProvider {...formPegawai}>
        <form
          onSubmit={formPegawai.handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <Tabs
            orientation="vertical"
            defaultValue="pribadi"
            className="space-y-4"
          >
            <div className="w-full overflow-x-auto pb-2">
              <TabsList>
                <TabsTrigger value="pribadi">Data Pribadi</TabsTrigger>
                <TabsTrigger value="kepegawaian">Kepegawaian</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="foto">Foto</TabsTrigger>
              </TabsList>
            </div>

            {/* pribadi start */}
            <TabsContent value="pribadi" className="space-y-4">
              <div className="grid gap-2">
                <FormField
                  control={formPegawai.control}
                  name="nama"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Nama
                      </FormLabel>
                      <Input {...field} type="text" placeholder="nama" />
                      <FormControl></FormControl>
                      <div className="h-2">
                        <FormMessage className="text-xs" />
                      </div>
                    </FormItem>
                  )}
                />

                {/* gender */}
                <FormField
                  control={formPegawai.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Gender
                      </FormLabel>
                      <Select
                        {...field}
                        options={genderOptions}
                        className="w-full rounded-md dark:text-black"
                        classNamePrefix="react-select"
                        placeholder="Select gender"
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
                          genderOptions.find(
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

                {/* agama */}
                <FormField
                  control={formPegawai.control}
                  name="agama"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Agama
                      </FormLabel>
                      <Select
                        {...field}
                        options={agamaOptions}
                        className="w-full rounded-md dark:text-black"
                        classNamePrefix="react-select"
                        placeholder="Select agama"
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
                          agamaOptions.find(
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

                {/* nik */}
                <FormField
                  control={formPegawai.control}
                  name="nik"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        NIK
                      </FormLabel>
                      <Input {...field} type="tel" placeholder="nik" />
                      <FormControl></FormControl>
                      <div className="flex h-2 space-x-1">
                        <FormMessage className="text-xs" />
                        {errorMessage?.nik && (
                          <p className="text-xs text-red-500">
                            , {errorMessage.nik}
                          </p>
                        )}
                      </div>
                    </FormItem>
                  )}
                />
                {/* nip */}
                <FormField
                  control={formPegawai.control}
                  name="nip"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        NIP
                      </FormLabel>
                      <Input {...field} type="tel" placeholder="nip" />
                      <FormControl></FormControl>
                      <div className="flex h-2 space-x-1">
                        <FormMessage className="text-xs" />
                        {errorMessage?.nip && (
                          <p className="text-xs text-red-500">
                            , {errorMessage.nip}
                          </p>
                        )}
                      </div>
                    </FormItem>
                  )}
                />
                {/* email */}
                <FormField
                  control={formPegawai.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Email
                      </FormLabel>
                      <Input
                        {...field}
                        type="email"
                        placeholder="email@gmail.com"
                      />
                      <FormControl></FormControl>
                      <div className="flex h-2 space-x-1">
                        <FormMessage className="text-xs" />
                        {errorMessage?.email && (
                          <p className="text-xs text-red-500">
                            , {errorMessage.email}
                          </p>
                        )}
                      </div>
                    </FormItem>
                  )}
                />
                {/* nomor hp */}
                <FormField
                  control={formPegawai.control}
                  name="nomor_hp"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Nomor HP
                      </FormLabel>
                      <Input {...field} type="tel" placeholder="nomor hp" />
                      <FormControl></FormControl>
                      <div className="flex h-2 space-x-1">
                        <FormMessage className="text-xs" />
                        {errorMessage?.nomor_hp && (
                          <p className="text-xs text-red-500">
                            , {errorMessage.nomor_hp}
                          </p>
                        )}
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={formPegawai.control}
                  name="nomor_rekening"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Nomor Rekening (BRI)
                      </FormLabel>
                      <Input
                        {...field}
                        type="tel"
                        placeholder="nomor rekening"
                      />
                      <FormControl></FormControl>
                      <div className="flex h-2 space-x-1">
                        <FormMessage className="text-xs" />
                        {errorMessage?.nomor_rekening && (
                          <p className="text-xs text-red-500">
                            , {errorMessage.nomor_hp}
                          </p>
                        )}
                      </div>
                    </FormItem>
                  )}
                />
                {/* tempat tanggal lahir */}
                <div className="flex w-full space-x-1">
                  <div className="w-1/2">
                    <FormField
                      control={formPegawai.control}
                      name="tempat_lahir"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-sm lg:text-base">
                            Tempat Lahir
                          </FormLabel>
                          <Input
                            {...field}
                            type="text"
                            placeholder="kota tempat lahir"
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
                      control={formPegawai.control}
                      name="tanggal_lahir"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-sm lg:text-base">
                            Tanggal Lahir
                          </FormLabel>
                          <Input
                            {...field}
                            type="date"
                            value={tanggalLahir}
                            onChange={(e) => {
                              setTanggalLahir(e.target.value);
                              handleTanggalPensiun(e.target.value);
                              formPegawai.setValue(
                                "tanggal_lahir",
                                e.target.value,
                              );
                            }}
                          />
                          <FormControl></FormControl>
                          <div className="h-2">
                            <FormMessage className="text-xs" />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* tanggal masuk pensiun */}
                <div className="flex w-full space-x-1">
                  <div className="w-1/2">
                    <FormField
                      control={formPegawai.control}
                      name="tanggal_masuk"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-sm lg:text-base">
                            Tanggal Masuk
                          </FormLabel>
                          <Input {...field} type="date" />
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
                      control={formPegawai.control}
                      name="tanggal_pensiun"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-sm lg:text-base">
                            Tanggal Pensiun
                          </FormLabel>
                          <Input
                            {...field}
                            type="date"
                            value={tanggalPensiun}
                            readOnly
                          />
                          <FormControl></FormControl>
                          <div className="h-2">
                            <FormMessage className="text-xs" />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* riwayat pendidikan */}
                <FormLabel className="text-sm lg:text-base">
                  Riwayat Pendidikan
                </FormLabel>
                {riwayatPendidikan.map((value, index) => (
                  <FormItem key={index}>
                    <FormLabel className="text-sm lg:text-base">
                      Riwayat Pendidikan {index + 1}
                    </FormLabel>
                    <Controller
                      control={formPegawai.control}
                      name={`riwayat_pendidikan.${index}`}
                      render={({ field }) => (
                        <div className="flex space-x-2">
                          <Input
                            {...field}
                            value={value || ""} // Ensure the input always has a value
                            onChange={(e) =>
                              handleInputChange(index, e.target.value)
                            }
                            type="text"
                            placeholder="Riwayat Pendidikan"
                            className="w:3/4 md:w-4/5"
                          />
                          <div className="md:1/4 flex w-1/5 space-x-2">
                            <Button
                              type="button"
                              variant="outline"
                              className="w-1/2 border-black"
                              onClick={() =>
                                handleRemoveRiwayatPendidikanField(index)
                              }
                            >
                              <span className="text-sm md:hidden">-</span>
                              <span className="hidden text-sm md:inline">
                                Hapus
                              </span>
                            </Button>
                            <Button
                              type="button"
                              onClick={handleRiwayatPendidikanField}
                              className="w-1/2"
                            >
                              <span className="text-sm md:hidden">+</span>
                              <span className="hidden text-sm md:inline">
                                Tambah
                              </span>
                            </Button>
                          </div>
                        </div>
                      )}
                    />
                    <FormControl />
                    <div className="h-2">
                      <FormMessage className="text-xs" />
                    </div>
                  </FormItem>
                ))}

                {/* status pernikahan */}
                <FormField
                  control={formPegawai.control}
                  name="status_pernikahan"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Status Pernikahan
                      </FormLabel>
                      <Select
                        {...field}
                        options={statusPernikahanOptions}
                        className="w-full rounded-md dark:text-black"
                        classNamePrefix="react-select"
                        placeholder="Select pernikahan"
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
                          statusPernikahanOptions.find(
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

                {/* istri */}
                <FormField
                  control={formPegawai.control}
                  name="jumlah_istri"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Istri
                      </FormLabel>
                      <Input
                        {...field}
                        type="number"
                        min={0}
                        placeholder="istri"
                      />
                      <FormControl></FormControl>
                      <div className="h-2">
                        <FormMessage className="text-xs" />
                      </div>
                    </FormItem>
                  )}
                />

                {/* anak */}
                <FormField
                  control={formPegawai.control}
                  name="jumlah_anak"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Anak
                      </FormLabel>
                      <Input
                        {...field}
                        type="number"
                        min={0}
                        placeholder="anak"
                      />
                      <FormControl></FormControl>
                      <div className="h-2">
                        <FormMessage className="text-xs" />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={formPegawai.control}
                  name="alamat"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Alamat
                      </FormLabel>
                      <Input {...field} type="text" placeholder="alamat" />
                      <FormControl></FormControl>
                      <div className="h-2">
                        <FormMessage className="text-xs" />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="mt-2 w-full" loading={isLoading}>
                Tambah Pegawai
              </Button>
            </TabsContent>
            {/* pribadi end */}

            {/* kepegawaian start */}
            <TabsContent value="kepegawaian" className="space-y-4">
              <div className="grid gap-2">
                {/* status tetap */}
                <FormField
                  control={formPegawai.control}
                  name="status_tetap"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Status Tetap
                      </FormLabel>
                      <Select
                        {...field}
                        options={statusTetapOptions}
                        className="w-full rounded-md dark:text-black"
                        classNamePrefix="react-select"
                        placeholder="Select status tetap"
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
                          statusTetapOptions.find(
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

                {/* status pegawai */}
                <FormField
                  control={formPegawai.control}
                  name="status_pegawai"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Status
                      </FormLabel>
                      <Select
                        {...field}
                        options={statusPegawaiOptions}
                        className="w-full rounded-md dark:text-black"
                        classNamePrefix="react-select"
                        placeholder="Select Status"
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
                          statusPegawaiOptions.find(
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
                {/* tenaga */}
                <FormField
                  control={formPegawai.control}
                  name="tenaga"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Tenaga
                      </FormLabel>
                      <Select
                        {...field}
                        options={tenagaRoleOptions}
                        className="w-full rounded-md dark:text-black"
                        classNamePrefix="react-select"
                        placeholder="Select tenaga"
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
                          tenagaRoleOptions.find(
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

                {/* status kepegawaian */}
                <FormField
                  control={formPegawai.control}
                  name="status_kepegawaian_id"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Status Kepegawaian
                      </FormLabel>
                      <Select
                        {...field}
                        options={statusKepegawaianOptions}
                        className="w-full rounded-md dark:text-black"
                        classNamePrefix="react-select"
                        placeholder="Select Status Kepegawaian"
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
                          statusKepegawaianOptions.find(
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

                {/* jabatan */}
                <FormField
                  control={formPegawai.control}
                  name="jabatan_id"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Jabatan
                      </FormLabel>
                      <Select
                        {...field}
                        options={jabatanOptions}
                        className="w-full rounded-md dark:text-black"
                        classNamePrefix="react-select"
                        placeholder="Select Jabatan"
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
                          jabatanOptions.find(
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

                {/* jabatan fungsional */}
                <FormField
                  control={formPegawai.control}
                  name="jabatan_fungsional_id"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Jabatan Fungsional
                      </FormLabel>
                      <Select
                        {...field}
                        isMulti
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        options={jabatanFungsionalOptions as any}
                        className="basic-multi-select w-full rounded-md dark:text-black"
                        classNamePrefix="select"
                        placeholder="Select jabatan fungsional"
                        value={jabatanFungsionalOptions.filter((option: any) =>
                          field?.value?.includes(option.value),
                        )}
                        onChange={(selectedOption) => {
                          field.onChange(
                            selectedOption
                              ? selectedOption.map(
                                  (option: any) => option.value,
                                )
                              : [],
                          );
                        }}
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
                      />
                      <FormControl></FormControl>
                      <div className="h-2">
                        <FormMessage className="text-xs" />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={formPegawai.control}
                  name="lokasi_id"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Lokasi Kerja
                      </FormLabel>
                      <Select
                        {...field}
                        options={lokasiOptions}
                        className="w-full rounded-md dark:text-black"
                        classNamePrefix="react-select"
                        placeholder="Select lokasi kerja"
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
                          lokasiOptions.find(
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
            </TabsContent>
            {/* kepegawaian end */}
            {/* account start */}
            <TabsContent value="account" className="space-y-4">
              <div className="grid gap-2">
                <FormField
                  control={formPegawai.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Role Pegawai
                      </FormLabel>
                      <Select
                        {...field}
                        options={userRoleOptions}
                        className="w-full rounded-md dark:text-black"
                        classNamePrefix="react-select"
                        placeholder="Select role pegawai"
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
                          userRoleOptions.find(
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
                  control={formPegawai.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Username
                      </FormLabel>
                      <Input {...field} type="text" placeholder="username" />
                      <FormControl></FormControl>
                      <div className="flex h-2 space-x-1">
                        <FormMessage className="text-xs" />
                        {errorMessage.username && (
                          <p className="text-xs text-red-500">
                            , {errorMessage.username}
                          </p>
                        )}
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={formPegawai.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Password
                      </FormLabel>
                      <Input {...field} type="password" />
                      <FormControl></FormControl>
                      <div className="h-2">
                        <FormMessage className="text-xs" />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>
            {/* account end */}

            {/* foto start */}
            <TabsContent value="foto" className="space-y-4">
              <div className="grid gap-2">
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Foto Pegawai
                  </FormLabel>
                  <Input
                    type="file"
                    className="w-full rounded-md border-black dark:text-white"
                    placeholder="foto pegawai"
                    accept="image/*"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      formPegawai.setValue("foto", e.target.files![0].name);
                      handleFileChange(e);
                    }}
                  />
                  <FormControl></FormControl>
                  <div className="h-2">
                    {errorMessage.foto && (
                      <p className="text-red-500">{errorMessage.foto}</p>
                    )}
                  </div>
                </FormItem>
                {preview && (
                  <div className="mt-2">
                    <Image
                      src={preview}
                      alt="Preview"
                      className="rounded-md"
                      width={300}
                      height={300}
                    />
                  </div>
                )}
              </div>
            </TabsContent>
            {/* foto end */}
          </Tabs>
        </form>
      </FormProvider>
    </>
  );
}
