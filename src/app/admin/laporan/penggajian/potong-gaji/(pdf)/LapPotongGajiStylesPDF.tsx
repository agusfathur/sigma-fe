import { StyleSheet } from "@react-pdf/renderer";

const stylesPDF = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#ffffff",
    fontFamily: "Roboto",
  },
  // kop start
  headerContainer: {
    flexDirection: "row",
    marginBottom: 5,
    borderBottom: "1 solid #000000",
    paddingBottom: 5,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  logoWrapper: {
    width: "20%", // Fixed width container for logo
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    width: 70,
    height: 70,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  schoolInfoContainer: {
    width: "80%", // Fixed width for text container
    justifyContent: "center",
    paddingLeft: 15,
  },
  schoolName: {
    fontSize: 14,
    color: "#000000",
    marginBottom: 4,
    fontWeight: "ultrabold",
    textTransform: "uppercase",
  },
  schoolDetails: {
    fontSize: 9,
    color: "#000000",
    marginBottom: 2,
    lineHeight: 1.4,
  },
  // kop end
  table: {
    display: "flex",
    width: "auto",
    marginTop: 10,
    borderRadius: 4,
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    minHeight: 26,
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
    color: "#000",
    fontWeight: "normal",
    paddingLeft: 8,
    paddingRight: 8,
  },
  tableCellHeader: {
    padding: 6,
    fontSize: 9,
    color: "#000000",
    fontWeight: "bold",
    textAlign: "left",
    paddingLeft: 8,
    paddingRight: 8,
  },
  tableFooter: {
    borderTop: "1px solid black",
    paddingTop: 4,
    marginTop: 4,
  },

  colId: {
    width: "5%",
  },
  colNama: {
    width: "20%",
  },
  colJabatan: {
    width: "20%",
  },
  colText: {
    width: "20%",
    textAlign: "left",
    textTransform: "capitalize",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: "center",
    color: "#94a3b8",
    fontSize: 8,
    borderTop: "1 solid #000000",
    paddingTop: 10,
  },

  titleContainer: {
    marginBottom: 2,
    marginTop: 2,
  },
  titleMain: {
    fontSize: 12,
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
  },
  titleSub: {
    fontSize: 10,
    textAlign: "center",
    color: "#000",
    fontWeight: "extrabold",
  },
});

export default stylesPDF;
