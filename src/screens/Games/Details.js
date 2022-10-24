import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function Details() {
  return (
    <View style={styles.root}>
      <Text>Details</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
