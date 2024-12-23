import {
  Document,
  Page,
  Text,
  View,
  Image as ImagePDF,
  Font,
} from "@react-pdf/renderer";
import stylesPDF from "./LapRekapGajiStylesPDF";
import { DataSekolah } from "@/store/dataSekolah/dataSekolah.types";
import { RekapGaji } from "../(table)/LapRekapGajiTable";

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

interface LapRekapGajiPDFProps {
  rekapGaji: RekapGaji[];
  dataSekolah: DataSekolah;
  filter: string;
}

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

export const LapRekapGajiPDF: React.FC<LapRekapGajiPDFProps> = ({
  rekapGaji,
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
        <Text style={stylesPDF.titleMain}>Laporan Rekap Gaji</Text>
        <Text style={stylesPDF.titleSub}>{filter}</Text>
      </View>

      {/* Table */}
      <View style={stylesPDF.table}>
        {/* Table Header */}
        <View style={[stylesPDF.tableRow, stylesPDF.tableHeader]}>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colId]}>No</Text>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colJabatan]}>
            Bulan
          </Text>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colText]}>
            Total Gaji Pokok
          </Text>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colText]}>
            Total Tunjangan
          </Text>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colText]}>
            Total Potongan
          </Text>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colText]}>
            Total Pengeluaran
          </Text>
        </View>

        {/* Table Body */}
        {rekapGaji.length > 0 &&
          rekapGaji.map((gaji, index) => (
            <View key={index} style={stylesPDF.tableRow}>
              <Text style={[stylesPDF.tableCell, stylesPDF.colId]}>
                {index + 1}
              </Text>
              <Text style={[stylesPDF.tableCell, stylesPDF.colJabatan]}>
                {monthNames[gaji.bulan - 1]} {gaji.tahun}
              </Text>
              <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
                Rp.{" "}
                {new Intl.NumberFormat("id-ID").format(
                  gaji.totalGajiPokok || 0,
                )}
              </Text>
              <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
                Rp.{" "}
                {new Intl.NumberFormat("id-ID").format(
                  gaji.totalTunjangan || 0,
                )}
              </Text>
              <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
                Rp.{" "}
                {new Intl.NumberFormat("id-ID").format(gaji.totalPotongan || 0)}
              </Text>
              <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
                Rp.{" "}
                {new Intl.NumberFormat("id-ID").format(
                  gaji.totalPengeluaran || 0,
                )}
              </Text>
            </View>
          ))}
      </View>

      {/* Table Footer - Totals */}
      {rekapGaji.length > 0 && (
        <View style={[stylesPDF.tableRow, stylesPDF.tableFooter]}>
          <Text style={[stylesPDF.tableCell, stylesPDF.colId]}></Text>
          <Text style={[stylesPDF.tableCell, stylesPDF.colJabatan]}>Total</Text>
          <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
            Rp.{" "}
            {new Intl.NumberFormat("id-ID").format(
              rekapGaji.reduce(
                (acc, curr) => acc + (curr.totalGajiPokok || 0),
                0,
              ),
            )}
          </Text>
          <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
            Rp.{" "}
            {new Intl.NumberFormat("id-ID").format(
              rekapGaji.reduce(
                (acc, curr) => acc + (curr.totalTunjangan || 0),
                0,
              ),
            )}
          </Text>
          <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
            Rp.{" "}
            {new Intl.NumberFormat("id-ID").format(
              rekapGaji.reduce(
                (acc, curr) => acc + (curr.totalPotongan || 0),
                0,
              ),
            )}
          </Text>
          <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
            Rp.{" "}
            {new Intl.NumberFormat("id-ID").format(
              rekapGaji.reduce(
                (acc, curr) => acc + (curr.totalPengeluaran || 0),
                0,
              ),
            )}
          </Text>
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
