import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from 'styles/colors';

export default function Price({ price }) {
  return (
    <View style={styles.root}>
      <View>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
        <View style={styles.line} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    right: 0,
    top: 36,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: Colors.background,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  price: {
    fontSize: 18,
    lineHeight: 28,
    color: Colors.accent,
    fontWeight: '600',
  },
  line: {
    height: 2,
    backgroundColor: Colors.accent,
    position: 'absolute',
    width: '100%',
    top: '49%',
  },
});
