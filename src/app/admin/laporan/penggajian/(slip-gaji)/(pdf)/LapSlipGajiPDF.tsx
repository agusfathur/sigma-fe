import {
  Document,
  Page,
  Text,
  View,
  Image as ImagePDF,
  Font,
} from "@react-pdf/renderer";
import stylesPDF from "./LapSlipGajiStylesPDF";
import { DataSekolah } from "@/store/dataSekolah/dataSekolah.types";
import { SlipGaji } from "@/store/slipGaji/slipGaji.types";

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

interface LapSlipGajiPDFProps {
  gaji: SlipGaji[];
  dataSekolah: DataSekolah;
  filter: string;
}

export const LapSlipGajiPDF: React.FC<LapSlipGajiPDFProps> = ({
  gaji,
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
        <Text style={stylesPDF.titleMain}>Laporan Slip Gaji</Text>
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
            Bulan
          </Text>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colText]}>
            Gaji Pokok
          </Text>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colText]}>
            Tunjangan
          </Text>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colText]}>
            Potongan
          </Text>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colText]}>
            Total Gaji
          </Text>
        </View>

        {/* Table Body */}
        {gaji.map((gaji, index) => (
          <View key={index} style={stylesPDF.tableRow}>
            <Text style={[stylesPDF.tableCell, stylesPDF.colId]}>
              {index + 1}
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colNama]}>
              {gaji.pegawai.nama}
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colJabatan]}>
              {gaji.pegawai.jabatan.nama}
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
              {gaji.bulan} - {gaji.tahun}
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
              Rp. {new Intl.NumberFormat("id-ID").format(gaji.gaji_pokok || 0)}
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
              Rp.{" "}
              {new Intl.NumberFormat("id-ID").format(
                gaji.tunjangan_kehadiran +
                  gaji.tunjangan_lembur +
                  gaji.tunjangan_tetap +
                  gaji.tunjangan_bonus +
                  gaji.tunjangan_fungsional || 0,
              )}
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
              Rp.{" "}
              {new Intl.NumberFormat("id-ID").format(
                gaji.pinjaman + gaji.potong_gaji + gaji.pajak || 0,
              )}
            </Text>
            <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
              Rp.{" "}
              {new Intl.NumberFormat("id-ID").format(
                gaji.total_gaji_bersih || 0,
              )}
            </Text>
          </View>
        ))}
      </View>

      {/* Table Footer - Totals */}
      <View style={[stylesPDF.tableRow, stylesPDF.tableFooter]}>
        <Text style={[stylesPDF.tableCell, stylesPDF.colId]}></Text>
        <Text style={[stylesPDF.tableCell, stylesPDF.colNama]}></Text>
        <Text style={[stylesPDF.tableCell, stylesPDF.colJabatan]}>Total</Text>
        <Text style={[stylesPDF.tableCell, stylesPDF.colText]}></Text>
        <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
          Rp.{" "}
          {new Intl.NumberFormat("id-ID").format(
            gaji.reduce((acc, curr) => acc + (curr.gaji_pokok || 0), 0),
          )}
        </Text>
        <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
          Rp.{" "}
          {new Intl.NumberFormat("id-ID").format(
            gaji.reduce(
              (acc, curr) =>
                acc +
                (curr.tunjangan_kehadiran +
                  curr.tunjangan_lembur +
                  curr.tunjangan_tetap +
                  curr.tunjangan_bonus +
                  curr.tunjangan_fungsional || 0),
              0,
            ),
          )}
        </Text>
        <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
          Rp.{" "}
          {new Intl.NumberFormat("id-ID").format(
            gaji.reduce(
              (acc, curr) =>
                acc + (curr.pinjaman + curr.potong_gaji + curr.pajak || 0),
              0,
            ),
          )}
        </Text>
        <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
          Rp.{" "}
          {new Intl.NumberFormat("id-ID").format(
            gaji.reduce((acc, curr) => acc + (curr.total_gaji_bersih || 0), 0),
          )}
        </Text>
      </View>

      {/* Footer */}
      <Text style={stylesPDF.footer}>
        This document was generated on {new Date().toLocaleDateString()} - All
        rights reserved © {new Date().getFullYear()}
      </Text>
    </Page>
  </Document>
);
