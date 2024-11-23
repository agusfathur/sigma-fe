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
import { useUserStore } from "@/store/user/userStore";
import { TypeUserCreate, UserCreateSchema } from "./UserSchema";
import Image from "next/image";

interface UserCreateFormProps {
  onSuccess: () => void;
}

export default function UserCreateForm({ onSuccess }: UserCreateFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const insertUser = useUserStore((state) => state.insertUser);

  const roleOptions = [
    {
      value: "admin",
      label: "Admin",
    },
    {
      value: "super_admin",
      label: "Super Admin",
    },
  ];

  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [errorMessage, setErrorMessage] = useState({
    image: "",
    username: "",
    email: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file); // Store the selected file
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      if (selectedFile) {
        setErrorMessage({ ...errorMessage, image: "" });
      }
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      setSelectedFile(null);
    }
  };

  const formUser = useForm<TypeUserCreate>({
    resolver: zodResolver(UserCreateSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
      email: "",
      role: "",
    },
  });

  const onSubmit = async (data: TypeUserCreate) => {
    if (!selectedFile) {
      setErrorMessage({ ...errorMessage, image: "Foto tidak boleh kosong" });
      return;
    }
    setIsLoading(true);
    try {
      const res = await insertUser({ ...data, image: selectedFile });
      formUser.reset();
      onSuccess();
    } catch (error: Error | any) {
      console.error("Error Insert User Create:", error);
      const errMsg = error.response.data.message;
      if (errMsg) {
        setErrorMessage({
          image: errMsg.image ? errMsg.image.join(", ") : "",
          email: errMsg.email ? errMsg.email.join(", ") : "",
          username: errMsg.username ? errMsg.username.join(", ") : "",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormProvider {...formUser}>
        <form onSubmit={formUser.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            {/* pegawai */}

            <FormField
              control={formUser.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Pegawai
                  </FormLabel>
                  <Select
                    {...field}
                    options={roleOptions}
                    className="w-full rounded-md dark:text-black"
                    classNamePrefix="react-select"
                    placeholder="Select role user"
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
                      roleOptions.find(
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

            {/* name */}
            <FormField
              control={formUser.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">Nama</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="nama" />
                  </FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />

            {/* username */}
            <FormField
              control={formUser.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="username" />
                  </FormControl>
                  <div className="flex h-2 space-x-1">
                    <FormMessage className="text-xs" />
                    {errorMessage?.username && (
                      <p className="text-xs text-red-500">
                        , {errorMessage?.username}
                      </p>
                    )}
                  </div>
                </FormItem>
              )}
            />

            {/* email */}
            <FormField
              control={formUser.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="email@example.com"
                    />
                  </FormControl>
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

            {/* password */}
            <FormField
              control={formUser.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />

            <div>
              <FormItem className="space-y-1">
                <FormLabel className="text-sm lg:text-base">Foto</FormLabel>
                <Input
                  type="file"
                  className="w-full rounded-md border-black dark:text-white"
                  placeholder="foto pegawai"
                  accept="image/*"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleFileChange(e);
                  }}
                />
                <FormControl></FormControl>
                <div className="h-2">
                  {errorMessage.image && (
                    <p className="text-red-500">{errorMessage.image}</p>
                  )}
                </div>
              </FormItem>
              {preview && (
                <div className="mt-4">
                  <Image
                    src={preview}
                    alt="Preview"
                    className="rounded-md"
                    width={200}
                    height={200}
                  />
                </div>
              )}
            </div>

            <Button type="submit" className="mt-2" loading={isLoading}>
              Tambah User
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
