import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function Root() {
  return (
    <View style={styles.root}>
      <Text>ADMIN WILL BE HERE</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
