import {
  Document,
  Page,
  Text,
  View,
  Image as ImagePDF,
  Font,
} from "@react-pdf/renderer";
import stylesPDF from "./LapPotongGajiStylesPDF";
import { DataSekolah } from "@/store/dataSekolah/dataSekolah.types";
import { PotongGaji } from "@/store/potongGaji/potongGaji.types";

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

interface LapPinjamanPDFProps {
  potongGajis: PotongGaji[];
  dataSekolah: DataSekolah;
  filter: string;
}

export const LapPotongGajiPDF: React.FC<LapPinjamanPDFProps> = ({
  potongGajis,
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
        <Text style={stylesPDF.titleMain}>Laporan Potong Gaji</Text>
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
            Total Pinjaman
          </Text>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colText]}>
            Keterangan
          </Text>
        </View>

        {/* Table Body */}
        {potongGajis.length > 0 &&
          potongGajis.map((pinjaman, index) => (
            <View key={index} style={stylesPDF.tableRow}>
              <Text style={[stylesPDF.tableCell, stylesPDF.colId]}>
                {index + 1}
              </Text>
              <Text style={[stylesPDF.tableCell, stylesPDF.colNama]}>
                {pinjaman.pegawai.nama}
              </Text>
              <Text style={[stylesPDF.tableCell, stylesPDF.colJabatan]}>
                {pinjaman.pegawai.jabatan.nama}
              </Text>
              <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
                {new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(
                  new Date(pinjaman.tanggal || ""),
                )}
              </Text>
              <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
                Rp.{" "}
                {new Intl.NumberFormat("id-ID").format(pinjaman.nominal || 0)}
              </Text>
              <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
                {pinjaman.keterangan}
              </Text>
            </View>
          ))}
      </View>
      {/* Table Footer - Totals */}
      {potongGajis.length > 0 && (
        <View style={[stylesPDF.tableRow, stylesPDF.tableFooter]}>
          <Text style={[stylesPDF.tableCell, stylesPDF.colId]}></Text>
          <Text style={[stylesPDF.tableCell, stylesPDF.colNama]}></Text>
          <Text style={[stylesPDF.tableCell, stylesPDF.colJabatan]}>Total</Text>
          <Text style={[stylesPDF.tableCell, stylesPDF.colNama]}></Text>
          <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
            Rp.{" "}
            {new Intl.NumberFormat("id-ID").format(
              potongGajis.reduce((acc, curr) => acc + (curr.nominal || 0), 0),
            )}
          </Text>
          <Text style={[stylesPDF.tableCell, stylesPDF.colText]}></Text>
        </View>
      )}

      {/* Footer */}
      <Text style={stylesPDF.footer}>
        This document was generated on {new Date().toLocaleDateString()} - All
        rights reserved © {new Date().getFullYear()}
      </Text>
    </Page>
  </Document>
);
