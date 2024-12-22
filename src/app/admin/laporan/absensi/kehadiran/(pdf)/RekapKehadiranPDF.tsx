import {
  Document,
  Page,
  Text,
  View,
  Image as ImagePDF,
  Font,
} from "@react-pdf/renderer";
import stylesPDF from "./stylesKehadiranPDF";
import { DataSekolah } from "@/store/dataSekolah/dataSekolah.types";
import { RekapKehadiranTypes } from "../(table)/RekapKehadiranColumns";

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

interface RekapAbsensiPDFProps {
  absensi: RekapKehadiranTypes[];
  dataSekolah: DataSekolah;
  filter: string;
}

export const RekapAbsensiPDF: React.FC<RekapAbsensiPDFProps> = ({
  absensi,
  dataSekolah,
  filter,
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
        <Text style={stylesPDF.titleMain}>Laporan Kehadiran Harian</Text>
        <Text style={stylesPDF.titleSub}>
          {new Intl.DateTimeFormat("id-ID", { dateStyle: "full" }).format(
            new Date(filter),
          )}
        </Text>
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
            Tanggal
          </Text>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colAngka]}>
            Jam Masuk
          </Text>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colAngka]}>
            Jam Pulang
          </Text>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colAngka]}>
            Keterangan
          </Text>
        </View>

        {/* Table Body */}
        {absensi.map((abs, index) => (
          <View key={index} style={stylesPDF.tableRow}>
            <Text style={[stylesPDF.tableCell, stylesPDF.colId]}>
              {index + 1}
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colNama]}>
              {abs.pegawai.nama}
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colJabatan]}>
              {abs.pegawai.jabatan.nama}
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colAngka]}>
              {abs.absensi.tanggal_absen
                ? abs.absensi.tanggal_absen.split("T")[0]
                : "-"}
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colAngka]}>
              {abs.absensi.waktu_masuk ?? "-"}
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colAngka]}>
              {abs.absensi.waktu_pulang ?? "-"}
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colAngka]}>
              {abs.absensi.status_absen ?? "Tidak Hadir"}
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
