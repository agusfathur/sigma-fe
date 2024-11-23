/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/custom/button";
import Image from "next/image";
import { useDataSekolahStore } from "@/store/dataSekolah/dataSekolahStore";
import { usePegawaiStore } from "@/store/pegawai/pegawaiStore";
import { TypeSekolahUpdate } from "./SekolahSchema";
import { DataSekolah } from "@/store/dataSekolah/dataSekolah.types";

interface SekolahUpdateFormProps {
  onSuccess: () => void;
  dataSekolah: DataSekolah;
}

export default function SekolahForm({
  onSuccess,
  dataSekolah,
}: SekolahUpdateFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const updateDataSekolah = useDataSekolahStore(
    (state) => state.updateDataSekolah,
  );

  const pegawai = usePegawaiStore((state) => state.pegawai);
  const fetchPegawai = usePegawaiStore((state) => state.fetchPegawai);

  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const pegawaiOptions = pegawai.map((pegawai) => ({
    value: pegawai.id_pegawai,
    label: `${pegawai.nama} - ${pegawai.jabatan.nama}`,
  }));

  // Form data state
  const [data, setData] = useState<TypeSekolahUpdate>({
    id_identitas_sekolah: "",
    nama_sekolah: "",
    kementrian: "",
    nsm: "",
    npsn: "",
    status: "",
    akreditasi: "",
    kota: "",
    provinsi: "",
    email: "",
    no_telp: "",
    kode_pos: "",
    fax: "",
    tanggal_berdiri: "",
    website: "",
    alamat: "",
    kepala_sekolah: "",
  });

  // Update data state when settingApp prop changes
  useEffect(() => {
    fetchPegawai();
    setData({
      id_identitas_sekolah: dataSekolah?.id_identitas_sekolah || "",
      nama_sekolah: dataSekolah?.nama_sekolah || "",
      kementrian: dataSekolah?.kementrian || "",
      nsm: dataSekolah?.nsm || "",
      npsn: dataSekolah?.npsn || "",
      status: dataSekolah?.status || "",
      akreditasi: dataSekolah?.akreditasi || "",
      kota: dataSekolah?.kota || "",
      provinsi: dataSekolah?.provinsi || "",
      email: dataSekolah?.email || "",
      no_telp: dataSekolah?.no_telp || "",
      kode_pos: dataSekolah?.kode_pos || "",
      fax: dataSekolah?.fax || "",
      tanggal_berdiri: dataSekolah?.tanggal_berdiri
        ? dataSekolah?.tanggal_berdiri.split("T")[0]
        : "",
      website: dataSekolah?.website || "",
      alamat: dataSekolah?.alamat || "",
      kepala_sekolah: dataSekolah?.kepala_sekolah || "",
    });
  }, [dataSekolah, fetchPegawai]); // Only re-run when settingApp changes

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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form default submission
    setIsLoading(true);
    try {
      if (selectedFile) {
        await updateDataSekolah({
          id_identitas_sekolah: data.id_identitas_sekolah || "",
          nama_sekolah: data.nama_sekolah || "",
          kementrian: data.kementrian || "",
          nsm: data.nsm || "",
          npsn: data.npsn || "",
          status: "aktif",
          akreditasi: data.akreditasi || "",
          kota: data.kota || "",
          provinsi: data.provinsi || "",
          email: data.email || "",
          no_telp: data.no_telp || "",
          kode_pos: data.kode_pos || "",
          fax: data.fax || "",
          tanggal_berdiri: data.tanggal_berdiri + "T00:00:00.000Z" || "",
          website: data.website || "",
          alamat: data.alamat || "",
          kepala_sekolah: data.kepala_sekolah || "",
          logo: selectedFile,
        });
      } else {
        await updateDataSekolah({
          id_identitas_sekolah: data.id_identitas_sekolah || "",
          nama_sekolah: data.nama_sekolah || "",
          kementrian: data.kementrian || "",
          nsm: data.nsm || "",
          npsn: data.npsn || "",
          status: "aktif",
          akreditasi: data.akreditasi || "",
          kota: data.kota || "",
          provinsi: data.provinsi || "",
          email: data.email || "",
          no_telp: data.no_telp || "",
          kode_pos: data.kode_pos || "",
          fax: data.fax || "",
          tanggal_berdiri: data.tanggal_berdiri + "T00:00:00.000Z" || "",
          website: data.website || "",
          alamat: data.alamat || "",
          kepala_sekolah: data.kepala_sekolah || "",
        });
      }
      onSuccess();
    } catch (error: Error | any) {
      console.error("Error Update Sekolah:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} method="post" encType="multipart/form-data">
        <div className="space-y-2">
          {" "}
          {/* Nama sekolah */}
          <div className="flex flex-col items-start md:flex-row md:items-center md:space-x-4">
            <label
              htmlFor="nama_sekolah"
              className="mb-1 w-full text-sm font-medium text-gray-700 dark:text-gray-100 md:mb-0 md:w-1/3"
            >
              Nama Sekolah
            </label>
            <input
              id="nama_sekolah"
              type="text"
              value={data.nama_sekolah}
              onChange={(e) =>
                setData({ ...data, nama_sekolah: e.target.value })
              }
              placeholder="Nama Sekolah"
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-gray-800 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500 md:w-2/3 md:text-sm"
            />
          </div>
          {/* kepala Sekolah
           */}
          <div className="flex flex-col items-start md:flex-row md:items-center md:space-x-4">
            <label
              htmlFor="nama_sekolah"
              className="mb-1 w-full text-sm font-medium text-gray-700 dark:text-gray-100 md:mb-0 md:w-1/3"
            >
              Kepala Sekolah
            </label>
            <Select
              options={pegawaiOptions}
              className="w-full rounded-md dark:text-black md:w-2/3"
              classNamePrefix="react-select"
              placeholder="Pilih status lembur"
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: "black", // Warna border saat di-focus
                  primary25: "#e5e7eb", // Warna abu-abu terang saat di-hover
                  primary50: "#d1d5db", // Warna abu-abu saat di-click
                  neutral20: "#d1d5db", // Border default
                  neutral80: "black", // Warna teks
                },
              })}
              onChange={(selectedOption: { value: string } | null) => {
                setData({
                  ...data,
                  kepala_sekolah: selectedOption
                    ? String(selectedOption.value)
                    : "",
                });
              }}
              value={
                pegawaiOptions.find(
                  (option) =>
                    String(option.value) === String(data.kepala_sekolah),
                ) || null
              }
            />
          </div>
          {/* kementrian */}
          <div className="flex flex-col items-start md:flex-row md:items-center md:space-x-4">
            <label
              htmlFor="kementrian"
              className="mb-1 w-full text-sm font-medium text-gray-700 dark:text-gray-100 md:mb-0 md:w-1/3"
            >
              Kementrian
            </label>
            <input
              id="kementrian"
              type="text"
              value={data.kementrian}
              onChange={(e) => setData({ ...data, kementrian: e.target.value })}
              placeholder="kementrian"
              className="focus:ring-graborder-gray-800 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500 md:w-2/3 md:text-sm"
            />
          </div>
          {/* Deskripsi */}
          <div className="flex flex-col items-start md:flex-row md:items-center md:space-x-4">
            <label
              htmlFor="npsn"
              className="mb-1 w-full text-sm font-medium text-gray-700 dark:text-gray-100 md:mb-0 md:w-1/3"
            >
              Nomor Pokok Sekolah Nasional (NPSN)
            </label>
            <input
              id="npsn"
              type="text"
              value={data.nsm}
              onChange={(e) => setData({ ...data, npsn: e.target.value })}
              placeholder="Deskripsi"
              className="focus:ring-graborder-gray-800 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500 md:w-2/3 md:text-sm"
            />
          </div>
          {/* nsm */}
          <div className="flex flex-col items-start md:flex-row md:items-center md:space-x-4">
            <label
              htmlFor="nsm"
              className="mb-1 w-full text-sm font-medium text-gray-700 dark:text-gray-100 md:mb-0 md:w-1/3"
            >
              Nomor Statistik Madrasah (NSM)
            </label>
            <input
              id="nsm"
              type="text"
              value={data.nsm}
              onChange={(e) => setData({ ...data, nsm: e.target.value })}
              placeholder="nsm"
              className="focus:ring-graborder-gray-800 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500 md:w-2/3 md:text-sm"
            />
          </div>
          {/* akreditasi */}
          <div className="flex flex-col items-start md:flex-row md:items-center md:space-x-4">
            <label
              htmlFor="akreditasi"
              className="mb-1 w-full text-sm font-medium text-gray-700 dark:text-gray-100 md:mb-0 md:w-1/3"
            >
              Akreditasi
            </label>
            <input
              id="akreditasi"
              type="text"
              value={data.akreditasi}
              onChange={(e) => setData({ ...data, akreditasi: e.target.value })}
              placeholder="akreditasi"
              className="focus:ring-graborder-gray-800 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500 md:w-2/3 md:text-sm"
            />
          </div>
          <div className="flex flex-col items-start md:flex-row md:items-center md:space-x-4">
            <label
              htmlFor="tanggal_berdiri"
              className="mb-1 w-full text-sm font-medium text-gray-700 dark:text-gray-100 md:mb-0 md:w-1/3"
            >
              Tanggal Berdiri
            </label>
            <input
              id="tanggal_berdiri"
              type="date"
              value={data.tanggal_berdiri}
              onChange={(e) =>
                setData({ ...data, tanggal_berdiri: e.target.value })
              }
              placeholder="tanggal_berdiri"
              className="focus:ring-graborder-gray-800 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500 md:w-2/3 md:text-sm"
            />
          </div>
          <div className="flex flex-col items-start md:flex-row md:items-center md:space-x-4">
            <label
              htmlFor="email"
              className="mb-1 w-full text-sm font-medium text-gray-700 dark:text-gray-100 md:mb-0 md:w-1/3"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="email"
              className="focus:ring-graborder-gray-800 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500 md:w-2/3 md:text-sm"
            />
          </div>
          <div className="flex flex-col items-start md:flex-row md:items-center md:space-x-4">
            <label
              htmlFor="nomor_telepon"
              className="mb-1 w-full text-sm font-medium text-gray-700 dark:text-gray-100 md:mb-0 md:w-1/3"
            >
              Nomor Telepon
            </label>
            <input
              id="nomor_telepon"
              type="tel"
              value={data.no_telp}
              onChange={(e) => setData({ ...data, no_telp: e.target.value })}
              placeholder="nomor telepon"
              className="focus:ring-graborder-gray-800 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500 md:w-2/3 md:text-sm"
            />
          </div>
          <div className="flex flex-col items-start md:flex-row md:items-center md:space-x-4">
            <label
              htmlFor="fax"
              className="mb-1 w-full text-sm font-medium text-gray-700 dark:text-gray-100 md:mb-0 md:w-1/3"
            >
              Fax
            </label>
            <input
              id="fax"
              type="tel"
              value={data.fax}
              onChange={(e) => setData({ ...data, fax: e.target.value })}
              placeholder="fax"
              className="focus:ring-graborder-gray-800 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500 md:w-2/3 md:text-sm"
            />
          </div>
          <div className="flex flex-col items-start md:flex-row md:items-center md:space-x-4">
            <label
              htmlFor="website"
              className="mb-1 w-full text-sm font-medium text-gray-700 dark:text-gray-100 md:mb-0 md:w-1/3"
            >
              Website
            </label>
            <input
              id="website"
              type="text"
              value={data.website}
              onChange={(e) => setData({ ...data, website: e.target.value })}
              placeholder="website"
              className="focus:ring-graborder-gray-800 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500 md:w-2/3 md:text-sm"
            />
          </div>
          <div className="flex flex-col items-start md:flex-row md:items-center md:space-x-4">
            <label
              htmlFor="kode_pos"
              className="mb-1 w-full text-sm font-medium text-gray-700 dark:text-gray-100 md:mb-0 md:w-1/3"
            >
              Kode POS
            </label>
            <input
              id="kode_pos"
              type="tel"
              max={5}
              value={data.kode_pos}
              onChange={(e) => setData({ ...data, kode_pos: e.target.value })}
              placeholder="kode pos"
              className="focus:ring-graborder-gray-800 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500 md:w-2/3 md:text-sm"
            />
          </div>
          <div className="flex flex-col items-start md:flex-row md:items-center md:space-x-4">
            <label
              htmlFor="provinsi"
              className="mb-1 w-full text-sm font-medium text-gray-700 dark:text-gray-100 md:mb-0 md:w-1/3"
            >
              Provinsi
            </label>
            <input
              id="provinsi"
              type="text"
              value={data.provinsi}
              onChange={(e) => setData({ ...data, provinsi: e.target.value })}
              placeholder="provinsi"
              className="focus:ring-graborder-gray-800 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500 md:w-2/3 md:text-sm"
            />
          </div>
          <div className="flex flex-col items-start md:flex-row md:items-center md:space-x-4">
            <label
              htmlFor="kota"
              className="mb-1 w-full text-sm font-medium text-gray-700 dark:text-gray-100 md:mb-0 md:w-1/3"
            >
              Kota
            </label>
            <input
              id="kota"
              type="text"
              value={data.kota}
              onChange={(e) => setData({ ...data, kota: e.target.value })}
              placeholder="kota"
              className="focus:ring-graborder-gray-800 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500 md:w-2/3 md:text-sm"
            />
          </div>
          <div className="flex flex-col items-start md:flex-row md:items-center md:space-x-4">
            <label
              htmlFor="alamat"
              className="mb-1 w-full text-sm font-medium text-gray-700 dark:text-gray-100 md:mb-0 md:w-1/3"
            >
              Alamat
            </label>
            <textarea
              id="alamat"
              value={data.alamat}
              onChange={(e) => setData({ ...data, alamat: e.target.value })}
              placeholder="alamat"
              className="focus:ring-graborder-gray-800 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500 md:w-2/3 md:text-sm"
            />
          </div>
          {/* File Upload */}
          <div className="flex flex-col items-start md:flex-row md:items-center md:space-x-4">
            <label
              htmlFor="logo_sistem"
              className="mb-1 w-full text-sm font-medium text-gray-700 dark:text-gray-100 md:mb-0 md:w-1/3"
            >
              Foto
            </label>
            <div className="w-full md:w-2/3">
              <Input
                id="logo_sistem"
                type="file"
                accept="image/*"
                className="border-gray-300"
                onChange={handleFileChange}
              />
            </div>
          </div>
          {/* Preview Image */}
          {preview ? (
            <div className="mt-2">
              <Image
                src={preview}
                alt="Preview"
                width={200}
                height={200}
                className="rounded-md object-cover"
              />
            </div>
          ) : (
            dataSekolah?.logo && (
              <div className="mt-2">
                <Image
                  src={dataSekolah.logo}
                  alt="Logo Sistem"
                  width={200}
                  height={200}
                  className="rounded-md object-cover"
                />
              </div>
            )
          )}
          {/* Submit Button */}
          <div>
            <Button type="submit" className="mt-4 w-full" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Setting"}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
