import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import SummaryTable from "./SummaryTable";
import LateTable from "./LateTable";

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 40,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  spaceBetween: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#3E3E3E",
  },
  reportTitle: { fontSize: 16, textAlign: "center" },
  titleContainer: { flexDirection: "row", marginTop: 24 },
  date: { fontWeight: 400, fontSize: 10 },
});

function ReactPdf({
  transactions = [],
  currYear,
  lastMonth,
  late,
  popularBook,
}) {
  const summary = [
    { id: 0, no: 1, desc: "Total peminjaman TA 2023-2024", value: currYear },
    {
      id: 1,
      no: 2,
      desc: "Buku yang terlambat dan belum dikembalikan",
      value: late,
    },
    {
      id: 2,
      no: 3,
      desc: "Jumlah transaksi dalam 30 hari terakhir",
      value: lastMonth,
    },
    {
      id: 3,
      no: 4,
      desc: "Buku yang paling banyak dipinjam",
      value: popularBook.title,
    },
  ];

  return (
    <Document title="Transaksi Peminjaman TA 2023-2024">
      <Page
        size="A4"
        style={{
          fontSize: 11,
          paddingTop: 20,
          paddingLeft: 40,
          paddingRight: 40,
          paddingBottom: 20,
          lineHeight: 1.5,
          flexDirection: "column",
        }}
      >
        <Title />
        <PdfDate />
        <SummaryTable data={summary} />
        <LateTable transactions={transactions} />
      </Page>
    </Document>
  );
}

function Title() {
  return (
    <View style={styles.titleContainer}>
      <View>
        <Text style={styles.reportTitle}>
          Transaksi Peminjaman Buku Tahun Ajaran 2023-2024
        </Text>
      </View>
    </View>
  );
}

function PdfDate() {
  const date = new Date().toLocaleDateString("id-ID", options);
  return (
    <View style={styles.titleContainer}>
      <View>
        <Text style={styles.date}>Dicetak pada: {date}</Text>
      </View>
    </View>
  );
}

export default ReactPdf;
