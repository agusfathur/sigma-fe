import {
  Document,
  Page,
  Text,
  View,
  Image as ImagePDF,
  Font,
} from "@react-pdf/renderer";
import stylesPDF from "./LemburAbsensiStylesPDF";
import { DataSekolah } from "@/store/dataSekolah/dataSekolah.types";
import { Lembur } from "@/store/lembur/lembur.types";

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

interface LapLemburPDFPDFProps {
  lembur: Lembur[];
  dataSekolah: DataSekolah;
  filter: string;
}

export const LapLemburPDF: React.FC<LapLemburPDFPDFProps> = ({
  lembur,
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
        <Text style={stylesPDF.titleMain}>Laporan Lembur</Text>
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
            Tanggal
          </Text>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colText]}>
            Jam Masuk
          </Text>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colText]}>
            Jam Pulang
          </Text>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colText]}>
            Total Jam
          </Text>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colText]}>
            Total Upah
          </Text>
        </View>

        {/* Table Body */}
        {lembur.map((izinCuti, index) => (
          <View key={index} style={stylesPDF.tableRow}>
            <Text style={[stylesPDF.tableCell, stylesPDF.colId]}>
              {index + 1}
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colNama]}>
              {izinCuti.absensi.pegawai.nama}
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colJabatan]}>
              {izinCuti.absensi.pegawai.jabatan.nama}
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
              {izinCuti.tanggal
                ? new Intl.DateTimeFormat("id-ID", {
                    dateStyle: "long",
                  }).format(new Date(izinCuti.tanggal))
                : "-"}
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
              {izinCuti.absensi.waktu_masuk
                ? izinCuti.absensi.waktu_masuk
                : "-"}
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
              {izinCuti.absensi.waktu_pulang
                ? izinCuti.absensi.waktu_pulang
                : "-"}
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
              {izinCuti.total_jam} Jam
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
              Rp. {new Intl.NumberFormat("id-Id").format(izinCuti.total_upah)}
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