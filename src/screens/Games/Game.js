import Text from 'components/Text';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Colors from 'styles/colors';

export const ITEM_HEIGHT = 300;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.item,
    height: ITEM_HEIGHT,
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  image: {
    borderRadius: 12,
    width: '100%',
    height: ITEM_HEIGHT - 100,
  },
  content: {
    marginHorizontal: 6,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
  },
});

export default function Game({ title, photo }) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: photo }} resizeMode='cover' />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}
