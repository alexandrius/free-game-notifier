import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default function Title({ style, children }) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}
const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
