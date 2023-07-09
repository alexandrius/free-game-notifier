import React from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";

export default function GenericJsonTable({ data }) {
  console.log("data", data);
  return (
    <View style={styles.root}>
      <View style={styles.divider} />
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.item}>
              {Object.keys(item).map((key) => (
                <View style={styles.cell} key={key}>
                  <Text>{item[key]}</Text>
                </View>
              ))}
            </View>
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  item: {
    flexDirection: "row",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "black",
  },
  cell: {
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: "black",
  },
});
