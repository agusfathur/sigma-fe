import {
  Document,
  Page,
  Text,
  View,
  Image as ImagePDF,
  Font,
} from "@react-pdf/renderer";
import { RekapAbsensiTypes } from "../(table)/RekapAbsensiColumns";
import stylesPDF from "./stylesPDF";
import { DataSekolah } from "@/store/dataSekolah/dataSekolah.types";

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

interface RekapAbsensiPDFProps {
  rekapAbsensi: RekapAbsensiTypes[];
  dataSekolah: DataSekolah;
}

export const RekapAbsensiPDF: React.FC<RekapAbsensiPDFProps> = ({
  rekapAbsensi,
  dataSekolah,
}) => (
  <Document>
    <Page size="A4" style={stylesPDF.page}>
      {/* Header */}
      <View style={stylesPDF.headerContainer}>
        <View style={stylesPDF.logoWrapper}>
          <View style={stylesPDF.logoContainer}>
            <ImagePDF
              src={
                dataSekolah.logo ? dataSekolah.logo : "/images/logo_kemenag.png"
              }
              style={stylesPDF.logo}
            />
          </View>
        </View>
        <View style={stylesPDF.schoolInfoContainer}>
          <Text style={stylesPDF.schoolName}>
            {dataSekolah.nama_sekolah || ""}
          </Text>
          <Text style={stylesPDF.schoolDetails}>
            Status Akreditasi : {dataSekolah.akreditasi || ""}, Kode POS :{" "}
            {dataSekolah.kode_pos}
          </Text>
          <Text style={stylesPDF.schoolDetails}>
            Alamat : {dataSekolah.alamat || ""}
          </Text>
          <Text style={stylesPDF.schoolDetails}></Text>
          <Text style={stylesPDF.schoolDetails}>
            Telepon: {dataSekolah.no_telp}, Email : {dataSekolah.email}
          </Text>
        </View>
      </View>

      {/* Title */}
      <View style={stylesPDF.titleContainer}>
        <Text style={stylesPDF.titleMain}>REKAP ABSENSI</Text>
        <Text style={stylesPDF.titleSub}>BULAN : DESEMBER 2024</Text>
      </View>

      {/* Table */}
      <View style={stylesPDF.table}>
        {/* Table Header */}
        <View style={[stylesPDF.tableRow, stylesPDF.tableHeader]}>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colId]}>No</Text>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colNama]}>
            Nama
          </Text>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colJabatan]}>
            Jabatan
          </Text>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colAngka]}>
            Total Jadwal
          </Text>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colAngka]}>
            Hadir
          </Text>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colAngka]}>
            Terlambat
          </Text>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colAngka]}>
            Izin
          </Text>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colAngka]}>
            Cuti
          </Text>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colAngka]}>
            Tidak Hadir
          </Text>
        </View>

        {/* Table Body */}
        {rekapAbsensi.map((rekap, index) => (
          <View key={index} style={stylesPDF.tableRow}>
            <Text style={[stylesPDF.tableCell, stylesPDF.colId]}>
              {index + 1}
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colNama]}>
              {rekap.pegawai.nama}
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colJabatan]}>
              {rekap.pegawai.jabatan.nama}
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colAngka]}>
              {rekap.countJadwal}
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colAngka]}>
              {rekap.countHadir}
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colAngka]}>
              {rekap.countTerlambat}
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colAngka]}>
              {rekap.countIzin}
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colAngka]}>
              {rekap.countCuti}
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colAngka]}>
              {rekap.countTidakHadir}
            </Text>
          </View>
        ))}
      </View>

      {/* Footer */}
      <Text style={stylesPDF.footer}>
        This document was generated on {new Date().toLocaleDateString()} - All
        rights reserved © {new Date().getFullYear()}
      </Text>
    </Page>
  </Document>
);
