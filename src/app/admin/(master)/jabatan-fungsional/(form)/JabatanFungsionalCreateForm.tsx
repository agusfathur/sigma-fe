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
import {
  JabatanFungsionalCreateSchema,
  TypeJabatanFungsionalCreate,
} from "./JabatanFungsionalSchema";
import { useJabatanFungsionalStore } from "@/store/jabatanFungsional/jabatanFungsionalStore";

interface JabatanFungsionalCreateFormProps {
  onSuccess: () => void;
}

export default function JabatanFungsionalCreateForm({
  onSuccess,
}: JabatanFungsionalCreateFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const insertJabatanFunsional = useJabatanFungsionalStore(
    (state) => state.insertJabatanFungsional,
  );

  const formJabatan = useForm<TypeJabatanFungsionalCreate>({
    resolver: zodResolver(JabatanFungsionalCreateSchema),
    defaultValues: {
      nama: "",
      tunjangan: 0,
    },
  });

  const onSubmit = async (data: TypeJabatanFungsionalCreate) => {
    setIsLoading(true);
    try {
      const res = await insertJabatanFunsional(data);
      formJabatan.reset();
      onSuccess();
    } catch (error) {
      console.error("Error Insert Jabatan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormProvider {...formJabatan}>
        <form onSubmit={formJabatan.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={formJabatan.control}
              name="nama"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Nama Jabatan Fungsional
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="nama jabatan" {...field} />
                  </FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={formJabatan.control}
              name="tunjangan"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Tunjangan Jabatan
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="gaji pokok"
                      {...field}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = Number(e.target.value);
                        field.onChange(value);
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
              Tambah Jabatan Fungsional
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
