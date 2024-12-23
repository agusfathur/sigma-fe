import {
  Document,
  Page,
  Text,
  View,
  Image as ImagePDF,
  Font,
} from "@react-pdf/renderer";
import stylesPDF from "./LapIzinCutiStylesPDF";
import { DataSekolah } from "@/store/dataSekolah/dataSekolah.types";
import { PermohonanIzin } from "@/store/permohonanIzin/permohonanIzin.types";

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

interface RekapAbsensiPDFProps {
  izinCuti: PermohonanIzin[];
  dataSekolah: DataSekolah;
  filter: string;
}

export const LapIzinCutiPDF: React.FC<RekapAbsensiPDFProps> = ({
  izinCuti,
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
        <Text style={stylesPDF.titleMain}>Laporan Izin & Cuti</Text>
        <Text style={stylesPDF.titleSub}>{filter}</Text>
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
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colText]}>
            Jenis Izin
          </Text>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colText]}>
            Mulai
          </Text>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colText]}>
            Selesai
          </Text>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colText]}>
            Total Hari
          </Text>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colText]}>
            Keterangan
          </Text>
        </View>

        {/* Table Body */}
        {izinCuti.map((izinCuti, index) => (
          <View key={index} style={stylesPDF.tableRow}>
            <Text style={[stylesPDF.tableCell, stylesPDF.colId]}>
              {index + 1}
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colNama]}>
              {izinCuti.pegawai.nama}
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colJabatan]}>
              {izinCuti.pegawai.jabatan.nama}
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
              {izinCuti.jenis_mohon_izin} - {izinCuti.jenis_izin.nama}
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
              {izinCuti.tanggal_dari.split("T")[0]
                ? izinCuti.tanggal_dari.split("T")[0]
                : "-"}
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
              {izinCuti.tanggal_sampai.split("T")[0]
                ? izinCuti.tanggal_sampai.split("T")[0]
                : "-"}
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
              {izinCuti.total_hari} Hari
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
              {izinCuti.keterangan}
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
