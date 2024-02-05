import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { Fragment } from "react";

const styles = StyleSheet.create({
  theader: {
    fontSize: 10,
    fontStyle: "bold",
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1,
    height: 20,
    backgroundColor: "#DEDEDE",
    borderColor: "whitesmoke",
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  theader2: {
    flex: 10,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    textAlign: "center",
  },
  tbody: {
    fontSize: 9,
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1,
    borderColor: "whitesmoke",
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  tbody2: { flex: 10, borderRightWidth: 1 },
});

function SummaryTable({ data }) {
  return (
    <>
      <TableHead />
      <TableBody data={data} />
    </>
  );
}

function TableHead() {
  return (
    <>
      <View>
        <Text style={{ fontSize: 14, marginTop: 20 }}>Rangkuman</Text>
      </View>
      <View style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
        <View style={styles.theader}>
          <Text>No.</Text>
        </View>
        <View style={[styles.theader, styles.theader2]}>
          <Text>Deskripsi</Text>
        </View>
        <View style={[styles.theader, styles.theader2]}>
          <Text>Hasil</Text>
        </View>
      </View>
    </>
  );
}

function TableBody({ data }) {
  return (
    <>
      {data.map((transaction) => (
        <Fragment key={transaction.id}>
          <View style={{ width: "100%", flexDirection: "row" }}>
            <View style={styles.tbody}>
              <Text>{transaction.no}.</Text>
            </View>
            <View style={[styles.tbody, styles.tbody2]}>
              <Text>{transaction.desc}</Text>
            </View>
            <View style={[styles.tbody, styles.tbody2]}>
              <Text>{transaction.value}</Text>
            </View>
          </View>
        </Fragment>
      ))}
    </>
  );
}

export default SummaryTable;
