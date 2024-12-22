import { StyleSheet } from "@react-pdf/renderer";

const stylesPDF = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#ffffff",
    fontFamily: "Roboto",
  },
  headerContainer: {
    flexDirection: "row",
    marginBottom: 12,
    borderBottom: "2 solid #000000",
    paddingBottom: 12,
    alignItems: "center",
  },
  logoContainer: {
    width: 70,
    height: 70,
    marginRight: 25,
  },
  logo: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  schoolInfoContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 10,
  },
  schoolName: {
    fontSize: 16,
    color: "#1e3a8a",
    marginBottom: 4,
    fontWeight: "bold",
  },
  schoolDetails: {
    fontSize: 9,
    color: "#64748b",
    marginBottom: 2,
    lineHeight: 1.4,
    paddingLeft: 2,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 25,
    color: "#1e3a8a",
    fontWeight: "bold",
    textTransform: "uppercase",
    paddingTop: 8,
  },
  table: {
    display: "flex",
    width: "auto",
    marginTop: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    minHeight: 28,
    alignItems: "center",
  },
  tableHeader: {
    backgroundColor: "#86efac",
    borderBottomWidth: 0,
  },
  tableCell: {
    padding: 6,
    fontSize: 8,
    textAlign: "left",
    color: "#334155",
    paddingLeft: 12,
  },
  tableCellHeader: {
    padding: 6,
    fontSize: 9,
    color: "#000000",
    fontWeight: "bold",
    textAlign: "left",
    paddingLeft: 12,
  },
  // Specific column widths
  colId: {
    flex: 0.5, // narrower for ID
  },
  colNama: {
    flex: 2, // wider for names
  },
  colJabatan: {
    flex: 1.5, // medium width for position
  },
  colAngka: {
    flex: 0.8, // smaller for numeric columns
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    color: "#94a3b8",
    fontSize: 8,
    borderTop: "1 solid #000000",
    paddingTop: 10,
  },
  watermark: {
    position: "absolute",
    bottom: 200,
    right: 100,
    transform: "rotate(-45deg)",
    fontSize: 60,
    color: "#f1f5f9",
    opacity: 0.3,
  },
});

export default stylesPDF;
