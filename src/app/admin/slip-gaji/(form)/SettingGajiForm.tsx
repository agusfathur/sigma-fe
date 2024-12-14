/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/custom/button";
import {
  SettingGajiUpdateSchema,
  TypeSettingGajiUpdate,
} from "./SettingGajiSchema";
import { useSettingGajiStore } from "@/store/settingGaji/settingGajiStore";
import { usePajakStore } from "@/store/pajak/pajakStore";
import { Checkbox } from "@/components/ui/checkbox";
import { useTunjanganKehadiranStore } from "@/store/tunjanganKehadiran/tunjanganKehadiranStore";
import { useToastStore } from "@/store/toastStore";

interface SettingGajiCreateFormProps {
  onSuccess: () => void;
}

interface Option {
  value: string;
  label: string;
}

export default function SettingGajiCreateForm({
  onSuccess,
}: SettingGajiCreateFormProps) {
  const {
    isOpen: toastOpen,
    message,
    type: toastType,
    setToast,
  } = useToastStore();
  const [isLoading, setIsLoading] = useState(false);
  const animatedComponents = makeAnimated();

  const fetchSettingGaji = useSettingGajiStore(
    (state) => state.fetchSettingGaji,
  );
  const settingGaji = useSettingGajiStore((state) => state.settingGaji);
  const updateSettingGaji = useSettingGajiStore(
    (state) => state.updateSettingGaji,
  );
  const pajaks = usePajakStore((state) => state.pajak);
  const fetchPajak = usePajakStore((state) => state.fetchPajak);

  const tunjanganKehadiran = useTunjanganKehadiranStore(
    (state) => state.tunjanganKehadiran,
  );
  const fetchTunjanganKehadiran = useTunjanganKehadiranStore(
    (state) => state.fetchTunjanganKehadiran,
  );

  const pajakOptions: Option[] = pajaks.map((pajak) => ({
    value: pajak.id_pajak,
    label: pajak.nama,
  }));

  const tunjanganKehadiranOptions: Option[] = tunjanganKehadiran.map(
    (tunjangan) => ({
      value: tunjangan.id_tunjangan_kehadiran,
      label: `Rp. ${new Intl.NumberFormat("id-ID").format(tunjangan.nominal)} | ${tunjangan.tahun}`,
    }),
  );

  const formSettingGaji = useForm<TypeSettingGajiUpdate>({
    resolver: zodResolver(SettingGajiUpdateSchema),
    defaultValues: {
      id_setting_gaji: settingGaji.id_setting_gaji,
      gaji_pokok: settingGaji.gaji_pokok,
      tunjangan_tetap: settingGaji.tunjangan_tetap,
      tunjangan_fungsional: settingGaji.tunjangan_fungsional,
      tunjangan_bonus: settingGaji.tunjangan_bonus,
      tunjangan_lembur: settingGaji.tunjangan_lembur,
      pinjaman: settingGaji.pinjaman,
      potong_gaji: settingGaji.potong_gaji,
      tunjangan_kehadiran_id: settingGaji.tunjangan_kehadiran_id,
      pajak_id: settingGaji.pajak_id,
    },
  });

  const onSubmit = async (data: TypeSettingGajiUpdate) => {
    setIsLoading(true);
    try {
      await updateSettingGaji(data);
      onSuccess();
      setToast({
        isOpen: true,
        message: "Setting Gaji Berhasil Diupdate",
        type: "success",
      });
    } catch (error) {
      setToast({
        isOpen: true,
        message: "Setting Gaji Gagal Diupdate",
        type: "error",
      });
      console.error("Error Update Setting Gaji:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettingGaji();
    fetchPajak();
    fetchTunjanganKehadiran();
  }, [fetchPajak, fetchSettingGaji, fetchTunjanganKehadiran]);

  return (
    <>
      <FormProvider {...formSettingGaji}>
        <form onSubmit={formSettingGaji.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            {/* GAji Pokok */}
            <FormField
              control={formSettingGaji.control}
              name="gaji_pokok"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <div className="mt-1 w-2/3 items-center">
                    <FormLabel className="text-sm lg:text-base">
                      Gaji Pokok
                    </FormLabel>
                  </div>
                  <div className="flex w-1/3 items-center space-x-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(isChecked) => {
                        field.onChange(isChecked);
                      }}
                    />
                    <span className="mr-2 text-xs"> (Centang = Ya)</span>
                  </div>
                  <FormControl></FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />
            {/* Tunjangan Tetap */}
            <FormField
              control={formSettingGaji.control}
              name="tunjangan_tetap"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <div className="mt-1 w-2/3 items-center">
                    <FormLabel className="text-sm lg:text-base">
                      Tunjangan Tetap
                    </FormLabel>
                  </div>
                  <div className="flex w-1/3 items-center space-x-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(isChecked) => {
                        field.onChange(isChecked);
                      }}
                    />
                    <span className="mr-2 text-xs"> (Centang = Ya)</span>
                  </div>
                  <FormControl></FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />

            {/* GAji Pokok */}
            <FormField
              control={formSettingGaji.control}
              name="tunjangan_fungsional"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <div className="mt-1 w-2/3 items-center">
                    <FormLabel className="text-sm lg:text-base">
                      Tunjangan Jabatan Fungsional
                    </FormLabel>
                  </div>
                  <div className="flex w-1/3 items-center space-x-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(isChecked) => {
                        field.onChange(isChecked);
                      }}
                    />
                    <span className="mr-2 text-xs"> (Centang = Ya)</span>
                  </div>
                  <FormControl></FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />

            {/* Tunjangan Bonus */}
            <FormField
              control={formSettingGaji.control}
              name="tunjangan_bonus"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <div className="mt-1 w-2/3 items-center">
                    <FormLabel className="text-sm lg:text-base">
                      Tunjangan Bonus
                    </FormLabel>
                  </div>
                  <div className="flex w-1/3 items-center space-x-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(isChecked) => {
                        field.onChange(isChecked);
                      }}
                    />
                    <span className="mr-2 text-xs"> (Centang = Ya)</span>
                  </div>
                  <FormControl></FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />

            {/* Tunjangan Lembur */}
            <FormField
              control={formSettingGaji.control}
              name="tunjangan_lembur"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <div className="mt-1 w-2/3 items-center">
                    <FormLabel className="text-sm lg:text-base">
                      Tunjangan Lembur
                    </FormLabel>
                  </div>
                  <div className="flex w-1/3 items-center space-x-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(isChecked) => {
                        field.onChange(isChecked);
                      }}
                    />
                    <span className="mr-2 text-xs"> (Centang = Ya)</span>
                  </div>
                  <FormControl></FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />

            {/* Pinjaman */}
            <FormField
              control={formSettingGaji.control}
              name="pinjaman"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <div className="mt-1 w-2/3 items-center">
                    <FormLabel className="text-sm lg:text-base">
                      Pinjaman
                    </FormLabel>
                  </div>
                  <div className="flex w-1/3 items-center space-x-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(isChecked) => {
                        field.onChange(isChecked);
                      }}
                    />
                    <span className="mr-2 text-xs"> (Centang = Ya)</span>
                  </div>
                  <FormControl></FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />

            {/* Porong Gaji */}
            <FormField
              control={formSettingGaji.control}
              name="potong_gaji"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <div className="mt-1 w-2/3 items-center">
                    <FormLabel className="text-sm lg:text-base">
                      Potong Gaji
                    </FormLabel>
                  </div>
                  <div className="flex w-1/3 items-center space-x-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(isChecked) => {
                        field.onChange(isChecked);
                      }}
                    />
                    <span className="mr-2 text-xs"> (Centang = Ya)</span>
                  </div>
                  <FormControl></FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />

            {/* kehadiran */}
            <FormField
              control={formSettingGaji.control}
              name="tunjangan_kehadiran_id"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Tunjangan Kehadiran
                  </FormLabel>
                  <Select
                    {...field}
                    options={tunjanganKehadiranOptions}
                    className="w-full rounded-md dark:text-black"
                    classNamePrefix="react-select"
                    placeholder="Tunjangan Kehadiran"
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
                      tunjanganKehadiranOptions.find(
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
              control={formSettingGaji.control}
              name="pajak_id"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">Pajak</FormLabel>
                  <Select
                    {...field}
                    isMulti
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    options={pajakOptions as any}
                    className="basic-multi-select w-full rounded-md dark:text-black"
                    classNamePrefix="select"
                    placeholder="Select pajak"
                    value={pajakOptions.filter((option: any) =>
                      field?.value?.includes(option.value),
                    )}
                    onChange={(selectedOption) => {
                      field.onChange(
                        selectedOption
                          ? selectedOption.map((option: any) => option.value)
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

            <Button type="submit" className="mt-2" loading={isLoading}>
              Update Setting Gaji
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
