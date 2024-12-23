/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Document,
  Page,
  Text,
  View,
  Image as ImagePDF,
} from "@react-pdf/renderer";
import stylesPDF from "./LapSlipGajiPegawaiStyles"; // Import custom styles
import { DataSekolah } from "@/store/dataSekolah/dataSekolah.types";

const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

interface SlipGaji {
  pegawai: {
    nama: string;
    jabatan: { nama: string };
  };
  bulan: number;
  tahun: number;
  gaji_pokok: number;
  tunjangan_tetap: number;
  tunjangan_kehadiran: number;
  tunjangan_lembur: number;
  tunjangan_fungsional: number;
  tunjangan_bonus: number;
  pinjaman: number;
  potong_gaji: number;
  pajak: number;
  total_gaji_bersih: number;
}

interface SlipGajiPDFProps {
  gaji: SlipGaji;
  dataSekolah: DataSekolah;
}

export const LapSlipGajiPegawaiPDF: React.FC<SlipGajiPDFProps> = ({
  gaji,
  dataSekolah,
}) => {
  return (
    <Document>
      <Page size="A4" style={stylesPDF.page}>
        {/* Header */}
        <View style={stylesPDF.headerContainer}>
          {/* Logo */}
          <View style={stylesPDF.logoWrapper}>
            <View style={stylesPDF.logoContainer}>
              <ImagePDF
                src={dataSekolah.logo || "/images/default_logo.png"}
                style={stylesPDF.logo}
              />
            </View>
          </View>
          {/* Informasi Sekolah */}
          <View style={stylesPDF.schoolInfoContainer}>
            <Text style={stylesPDF.schoolName}>
              {dataSekolah.nama_sekolah.toUpperCase() || "Nama Sekolah"}
            </Text>
            <Text style={stylesPDF.schoolDetails}>
              {dataSekolah.alamat || "Alamat Sekolah"}
            </Text>
            <Text style={stylesPDF.schoolDetails}>
              Telepon: {dataSekolah.no_telp || "-"}, Email:{" "}
              {dataSekolah.email || "-"}
            </Text>
          </View>
        </View>

        {/* Title */}
        <View style={stylesPDF.titleContainer}>
          <Text style={stylesPDF.titleMain}>SLIP GAJI PEGAWAI</Text>
          <Text style={stylesPDF.titleSub}>
            Periode: {monthNames[gaji.bulan - 1]} {gaji.tahun}
          </Text>
        </View>

        {/* Informasi Pegawai */}
        <View style={stylesPDF.table}>
          <View style={stylesPDF.tableRow}>
            <Text style={[stylesPDF.tableCell, stylesPDF.colNama]}>Nama</Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
              {gaji.pegawai.nama || "-"}
            </Text>
          </View>
          <View style={stylesPDF.tableRow}>
            <Text style={[stylesPDF.tableCell, stylesPDF.colNama]}>
              Jabatan
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
              {gaji.pegawai.jabatan.nama || "-"}
            </Text>
          </View>
        </View>

        {/* Pendapatan */}
        <Text style={stylesPDF.sectionHeader}>Pendapatan</Text>
        <View style={stylesPDF.table}>
          <View style={stylesPDF.tableRow}>
            <Text style={[stylesPDF.tableCell, stylesPDF.colNama]}>
              Gaji Pokok
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
              {formatCurrency(gaji.gaji_pokok)}
            </Text>
          </View>
          <View style={stylesPDF.tableRow}>
            <Text style={[stylesPDF.tableCell, stylesPDF.colNama]}>
              Tunjangan Tetap
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
              {formatCurrency(gaji.tunjangan_tetap)}
            </Text>
          </View>
          {/* Tambahkan tunjangan lainnya sesuai kebutuhan */}
          <View style={stylesPDF.tableRow}>
            <Text style={[stylesPDF.tableCell, stylesPDF.colNama]}>
              Total Pendapatan
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
              {formatCurrency(
                gaji.gaji_pokok +
                  gaji.tunjangan_tetap +
                  gaji.tunjangan_kehadiran +
                  gaji.tunjangan_lembur +
                  gaji.tunjangan_fungsional +
                  gaji.tunjangan_bonus,
              )}
            </Text>
          </View>
        </View>

        {/* Potongan */}
        <Text style={stylesPDF.sectionHeader}>Potongan</Text>
        <View style={stylesPDF.table}>
          <View style={stylesPDF.tableRow}>
            <Text style={[stylesPDF.tableCell, stylesPDF.colNama]}>Pajak</Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
              {formatCurrency(gaji.pajak)}
            </Text>
          </View>
          <View style={stylesPDF.tableRow}>
            <Text style={[stylesPDF.tableCell, stylesPDF.colNama]}>
              Pinjaman
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
              {formatCurrency(gaji.pinjaman)}
            </Text>
          </View>
        </View>

        {/* Total Gaji */}
        <Text style={stylesPDF.sectionHeader}>Gaji Bersih</Text>
        <View style={stylesPDF.table}>
          <View style={[stylesPDF.tableRow, stylesPDF.totalRow]}>
            <Text style={[stylesPDF.tableCell, stylesPDF.colNama]}>
              Total Gaji Bersih
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
              {formatCurrency(gaji.total_gaji_bersih)}
            </Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={stylesPDF.footer}>
          This document was generated on {new Date().toLocaleDateString()} - All
          rights reserved © {new Date().getFullYear()}
        </Text>
      </Page>
    </Document>
  );
};
