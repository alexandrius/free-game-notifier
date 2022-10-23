import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function Root() {
  return (
    <View style={styles.root}>
      <Text>Root</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
