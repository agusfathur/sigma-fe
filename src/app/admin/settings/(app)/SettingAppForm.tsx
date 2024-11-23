/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/custom/button";
import Image from "next/image";
import { useSettingAppStore } from "@/store/settingApp/settingAppStore";
import {
  SettingAppUpdateSchema,
  TypeSettingAppUpdate,
} from "./SettingAppSchema";
import { SettingApp } from "@/store/settingApp/settingApp.types";

interface SettingAppFormProps {
  onSuccess: () => void;
  settingApp: SettingApp;
}

export default function SettingAppForm({
  onSuccess,
  settingApp,
}: SettingAppFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const updateSetingApp = useSettingAppStore((state) => state.updateSettingApp);

  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Form data state
  const [data, setData] = useState<TypeSettingAppUpdate>({
    id_app_setting: settingApp.id_app_setting || "",
    nama_sistem: settingApp.nama_sistem || "",
    singkatan_sistem: settingApp.singkatan_sistem || "",
    deskripsi_sistem: settingApp.deskripsi_sistem || "",
    developer: settingApp.developer || "",
    author: settingApp.author || "",
  });

  // Update data state when settingApp prop changes
  useEffect(() => {
    setData({
      id_app_setting: settingApp.id_app_setting || "",
      nama_sistem: settingApp.nama_sistem || "",
      singkatan_sistem: settingApp.singkatan_sistem || "",
      deskripsi_sistem: settingApp.deskripsi_sistem || "",
      developer: settingApp.developer || "",
      author: settingApp.author || "",
    });
  }, [settingApp]); // Only re-run when settingApp changes

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
        await updateSetingApp({
          id_app_setting: data.id_app_setting || "",
          nama_sistem: data.nama_sistem || "",
          singkatan_sistem: data.singkatan_sistem || "",
          deskripsi_sistem: data.deskripsi_sistem || "",
          developer: data.developer || "",
          author: data.author || "",
          logo_sistem: selectedFile,
        });
      } else {
        await updateSetingApp({
          id_app_setting: data.id_app_setting || "",
          nama_sistem: data.nama_sistem || "",
          singkatan_sistem: data.singkatan_sistem || "",
          deskripsi_sistem: data.deskripsi_sistem || "",
          developer: data.developer || "",
          author: data.author || "",
        });
      }
      onSuccess();
    } catch (error: Error | any) {
      console.error("Error Insert User Create:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} method="post" encType="multipart/form-data">
        <div className="space-y-2">
          {" "}
          {/* Nama Sistem */}
          <div className="flex flex-col items-start md:flex-row md:items-center md:space-x-4">
            <label
              htmlFor="nama_sistem"
              className="mb-1 w-full text-sm font-medium text-gray-700 dark:text-gray-100 md:mb-0 md:w-1/3"
            >
              Nama Sistem
            </label>
            <input
              id="nama_sistem"
              type="text"
              value={data.nama_sistem}
              onChange={(e) =>
                setData({ ...data, nama_sistem: e.target.value })
              }
              placeholder="Nama Sistem"
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-gray-800 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500 md:w-2/3 md:text-sm"
            />
          </div>
          {/* Singkatan */}
          <div className="flex flex-col items-start md:flex-row md:items-center md:space-x-4">
            <label
              htmlFor="singkatan_sistem"
              className="mb-1 w-full text-sm font-medium text-gray-700 dark:text-gray-100 md:mb-0 md:w-1/3"
            >
              Singkatan
            </label>
            <input
              id="singkatan_sistem"
              type="text"
              value={data.singkatan_sistem}
              onChange={(e) =>
                setData({ ...data, singkatan_sistem: e.target.value })
              }
              placeholder="Singkatan"
              className="focus:ring-graborder-gray-800 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500 md:w-2/3 md:text-sm"
            />
          </div>
          {/* Deskripsi */}
          <div className="flex flex-col items-start md:flex-row md:items-center md:space-x-4">
            <label
              htmlFor="deskripsi_sistem"
              className="mb-1 w-full text-sm font-medium text-gray-700 dark:text-gray-100 md:mb-0 md:w-1/3"
            >
              Deskripsi Sistem
            </label>
            <textarea
              id="deskripsi_sistem"
              value={data.deskripsi_sistem}
              onChange={(e) =>
                setData({ ...data, deskripsi_sistem: e.target.value })
              }
              placeholder="Deskripsi"
              className="focus:ring-graborder-gray-800 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500 md:w-2/3 md:text-sm"
            />
          </div>
          {/* Developer */}
          <div className="flex flex-col items-start md:flex-row md:items-center md:space-x-4">
            <label
              htmlFor="developer"
              className="mb-1 w-full text-sm font-medium text-gray-700 dark:text-gray-100 md:mb-0 md:w-1/3"
            >
              Developer
            </label>
            <input
              id="developer"
              type="text"
              value={data.developer}
              onChange={(e) => setData({ ...data, developer: e.target.value })}
              placeholder="Developer"
              className="focus:ring-graborder-gray-800 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500 md:w-2/3 md:text-sm"
            />
          </div>
          {/* Author */}
          <div className="flex flex-col items-start md:flex-row md:items-center md:space-x-4">
            <label
              htmlFor="author"
              className="mb-1 w-full text-sm font-medium text-gray-700 dark:text-gray-100 md:mb-0 md:w-1/3"
            >
              Author
            </label>
            <input
              id="author"
              type="text"
              value={data.author}
              onChange={(e) => setData({ ...data, author: e.target.value })}
              placeholder="Author"
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
                width={400}
                height={400}
                className="h-40 w-40 rounded-md object-cover"
              />
            </div>
          ) : (
            settingApp?.logo_sistem && (
              <div className="mt-2">
                <Image
                  src={settingApp.logo_sistem}
                  alt="Logo Sistem"
                  width={400}
                  height={400}
                  className="h-40 w-40 rounded-md object-cover"
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
