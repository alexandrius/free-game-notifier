import { Link } from "expo-router";
import { useGet } from "fetch-yo-mama";
import React from "react";
import { View, StyleSheet } from "react-native";

import GenericJsonTable from "@/components/GenericJsonTable";

export default function Root() {
  const [requestState] = useGet("/api/games");

  return (
    <View style={styles.root}>
      <Link href="/admin/addgame">Add Game</Link>
      <GenericJsonTable data={requestState.response} />
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
