import {
  Document,
  Page,
  Text,
  View,
  Image as ImagePDF,
  Font,
} from "@react-pdf/renderer";
import stylesPDF from "./LapTunjanganStylesPDF";
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
        <Text style={stylesPDF.titleMain}>Laporan Tunjangan Pegawai</Text>
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
            Tetap
          </Text>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colText]}>
            Fungsional
          </Text>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colText]}>
            Kehadiran
          </Text>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colText]}>
            Lembur
          </Text>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colText]}>
            Bonus
          </Text>
          <Text style={[stylesPDF.tableCellHeader, stylesPDF.colText]}>
            Total
          </Text>
        </View>

        {/* Table Body */}
        {gaji.length > 0 &&
          gaji.map((gaji, index) => (
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
                Rp.{" "}
                {new Intl.NumberFormat("id-ID").format(
                  gaji.tunjangan_tetap || 0,
                )}
              </Text>
              <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
                Rp.{" "}
                {new Intl.NumberFormat("id-ID").format(
                  gaji.tunjangan_fungsional || 0,
                )}
              </Text>
              <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
                Rp.{" "}
                {new Intl.NumberFormat("id-ID").format(
                  gaji.tunjangan_kehadiran || 0,
                )}
              </Text>
              <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
                Rp.{" "}
                {new Intl.NumberFormat("id-ID").format(
                  gaji.tunjangan_lembur || 0,
                )}
              </Text>
              <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
                Rp.{" "}
                {new Intl.NumberFormat("id-ID").format(
                  gaji.tunjangan_bonus || 0,
                )}
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
            </View>
          ))}
      </View>

      {/* Table Footer - Totals */}
      {gaji.length > 0 && (
        <View style={[stylesPDF.tableRow, stylesPDF.tableFooter]}>
          <Text style={[stylesPDF.tableCell, stylesPDF.colId]}></Text>
          <Text style={[stylesPDF.tableCell, stylesPDF.colNama]}>Total</Text>
          <Text style={[stylesPDF.tableCell, stylesPDF.colJabatan]}></Text>
          <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
            {" "}
            Rp.{" "}
            {new Intl.NumberFormat("id-ID").format(
              gaji.reduce((acc, curr) => acc + (curr.tunjangan_tetap || 0), 0),
            )}
          </Text>
          <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
            Rp.{" "}
            {new Intl.NumberFormat("id-ID").format(
              gaji.reduce(
                (acc, curr) => acc + (curr.tunjangan_fungsional || 0),
                0,
              ),
            )}
          </Text>
          <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
            Rp.{" "}
            {new Intl.NumberFormat("id-ID").format(
              gaji.reduce(
                (acc, curr) => acc + (curr.tunjangan_kehadiran || 0),
                0,
              ),
            )}
          </Text>
          <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
            Rp.{" "}
            {new Intl.NumberFormat("id-ID").format(
              gaji.reduce((acc, curr) => acc + (curr.tunjangan_lembur || 0), 0),
            )}
          </Text>
          <Text style={[stylesPDF.tableCell, stylesPDF.colText]}>
            Rp.{" "}
            {new Intl.NumberFormat("id-ID").format(
              gaji.reduce((acc, curr) => acc + (curr.tunjangan_bonus || 0), 0),
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
