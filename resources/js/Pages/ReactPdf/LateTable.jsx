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
  theader3: {
    flex: 3,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    textAlign: "center",
  },
  theader4: {
    flex: 6,
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
  tbody3: { flex: 3, borderRightWidth: 1 },
  tbody4: { flex: 6, borderRightWidth: 1 },
});

function LateTable({ transactions }) {
  return (
    <>
      <TableHead />
      <TableBody data={transactions} />
    </>
  );
}

function TableHead() {
  return (
    <>
      <View>
        <Text style={{ fontSize: 14, marginTop: 40 }}>
          Siswa yang terlambat dan belum mengembalikan
        </Text>
      </View>
      <View style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
        <View style={styles.theader}>
          <Text>No.</Text>
        </View>
        <View style={[styles.theader, styles.theader4]}>
          <Text>Nama</Text>
        </View>
        <View style={[styles.theader, styles.theader3]}>
          <Text>Kelas</Text>
        </View>
        <View style={[styles.theader, styles.theader2]}>
          <Text>Judul Buku</Text>
        </View>
      </View>
    </>
  );
}

function TableBody({ data }) {
  return (
    <>
      {data.map((transaction, key) => (
        <Fragment key={transaction.id}>
          <View style={{ width: "100%", flexDirection: "row" }}>
            <View style={styles.tbody}>
              <Text>{key + 1}.</Text>
            </View>
            <View style={[styles.tbody, styles.tbody4]}>
              <Text>{transaction.name}</Text>
            </View>
            <View style={[styles.tbody, styles.tbody3]}>
              <Text>{transaction.school_class.name}</Text>
            </View>
            <View style={[styles.tbody, styles.tbody2]}>
              {transaction.transactions.map((trans, key) => (
                <Text key={trans.id}>
                  {key + 1}. {trans.book.title}
                </Text>
              ))}
            </View>
          </View>
        </Fragment>
      ))}
    </>
  );
}

export default LateTable;
