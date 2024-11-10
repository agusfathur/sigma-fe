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
import { useLokasiStore } from "@/store/lokasi/lokasiStore";
import { LokasiCreateSchema, TypeLokasiCreate } from "./LokasiSchema";

interface LokasiCreateFormProps {
  onSuccess: () => void;
}

export default function LokasiCreateForm({ onSuccess }: LokasiCreateFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const insertLokasi = useLokasiStore((state) => state.insertLokasi);

  const formLokasi = useForm<TypeLokasiCreate>({
    resolver: zodResolver(LokasiCreateSchema),
    defaultValues: {
      nama: "",
      alamat: "",
      luas_lokasi: 0,
      koordinat: {
        latitude: 0,
        longitude: 0,
      },
    },
  });

  const [lokasi, setLokasi] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [mapKey, setMapKey] = useState(0);
  const handleUpdateLokasi = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLokasi({ latitude, longitude });
      setMapKey(mapKey + 1);
      console.log(latitude, longitude);
    });
  };

  const onSubmit = async (data: TypeLokasiCreate) => {
    setIsLoading(true);
    try {
      const koordinat = `${lokasi.latitude},${lokasi.longitude}`;
      const createData = {
        nama: data.nama,
        alamat: data.alamat,
        luas_lokasi: data.luas_lokasi,
        koordinat: koordinat,
      };
      const res = await insertLokasi(createData);
      formLokasi.reset();
      onSuccess();
    } catch (error) {
      console.error("Error Insert Lokasi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormProvider {...formLokasi}>
        <form onSubmit={formLokasi.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormLabel className="text-sm lg:text-base">
              Koordinat Lokasi
            </FormLabel>

            {lokasi.latitude !== 0 && lokasi.longitude !== 0 ? (
              <div className="flex justify-center">
                <iframe
                  key={mapKey}
                  id="googleMap"
                  src={`https://maps.google.com/maps?q=${lokasi.latitude},${lokasi.longitude}&z=15&output=embed&layer=t`}
                  className="h-72 w-[400px] rounded-md md:w-[600px]"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            ) : (
              <p>Maps Loading...</p>
            )}
            <div className="flex w-full justify-between space-x-1">
              <div className="w-1/2">
                <FormField
                  control={formLokasi.control}
                  name="koordinat.latitude"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Latitude
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="latitude"
                          value={lokasi.latitude}
                          type="string"
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>,
                          ) => {
                            const value = e.target.value;
                            const valueFloat = parseFloat(value);
                            setLokasi({
                              ...lokasi,
                              latitude: isNaN(valueFloat) ? 0 : valueFloat,
                            });
                            field.onChange(
                              isNaN(valueFloat) ? "" : Number(value),
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
              <div className="w-1/2">
                <FormField
                  control={formLokasi.control}
                  name="koordinat.longitude"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Longitude
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="longitude"
                          value={lokasi.longitude}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>,
                          ) => {
                            setLokasi({
                              ...lokasi,
                              longitude: isNaN(Number(e.target.value))
                                ? 0
                                : Number(e.target.value),
                            });
                            field.onChange(
                              isNaN(Number(e.target.value))
                                ? ""
                                : Number(e.target.value),
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
            <Button
              className="w-full border border-black"
              type="button"
              variant={"secondary"}
              onClick={handleUpdateLokasi}
            >
              Lokasi Saya
            </Button>
            <div className="grid gap-2">
              <FormField
                control={formLokasi.control}
                name="nama"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-sm lg:text-base">
                      Nama Lokasi
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="nama Lokasi" {...field} />
                    </FormControl>
                    <div className="h-2">
                      <FormMessage className="text-xs" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={formLokasi.control}
                name="luas_lokasi"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-sm lg:text-base">
                      Luas Lokasi (Meter)
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
              <FormField
                control={formLokasi.control}
                name="alamat"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-sm lg:text-base">
                      Alamat
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="alamat" {...field} />
                    </FormControl>
                    <div className="h-2">
                      <FormMessage className="text-xs" />
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-2" loading={isLoading}>
                Tambah Lokasi
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
