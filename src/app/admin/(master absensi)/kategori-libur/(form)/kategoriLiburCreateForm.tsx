/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
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
import {
  KategoriLiburCreateSchema,
  TypeKategoriLiburCreate,
} from "./kategoriLiburSchema";
import { useKategoriLiburStore } from "@/store/kategoriLibur/kategoriLiburStore";
import { useToastStore } from "@/store/toastStore";

interface KategoriLiburCreateFormProps {
  onSuccess: () => void;
}

export default function KategoriLiburCreateForm({
  onSuccess,
}: KategoriLiburCreateFormProps) {
  const {
    isOpen: toastOpen,
    message,
    type: toastType,
    setToast,
  } = useToastStore();
  const [isLoading, setIsLoading] = useState(false);

  const insertKategoriLibur = useKategoriLiburStore(
    (state) => state.insertKategoriLibur,
  );

  const formKategoriLibur = useForm<TypeKategoriLiburCreate>({
    resolver: zodResolver(KategoriLiburCreateSchema),
    defaultValues: {
      jenis: "",
    },
  });

  const onSubmit = async (data: TypeKategoriLiburCreate) => {
    setIsLoading(true);
    try {
      const res = await insertKategoriLibur(data);
      if (!res.status === false) {
        formKategoriLibur.reset();
        setToast({
          isOpen: true,
          message: "Data Kategori Libur Berhasil Ditambahkan",
          type: "success",
        });
        onSuccess();
      }
    } catch (error) {
      setToast({
        isOpen: true,
        message: "Data Kategori Libur Gagal Ditambahkan",
        type: "error",
      });
      console.error("Error Insert Jabatan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormProvider {...formKategoriLibur}>
        <form onSubmit={formKategoriLibur.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={formKategoriLibur.control}
              name="jenis"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Nama Kategori Libur
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="nama kategori libur" {...field} />
                  </FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-2" loading={isLoading}>
              Tambah Kategori Libur
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
