import Text from 'components/Text';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Touchable } from 'react-native-better-touchable';
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
  priceContainer: {
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

export default function Game({ title, photo, original_price }) {
  return (
    <Touchable
      style={styles.container}
      rippleColor={Colors.accent}
      onPress={() => {
        // alert('Pressed');
      }}>
      <Image style={styles.image} source={{ uri: photo }} resizeMode='cover' />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.priceContainer}>
        <View>
          <Text style={styles.price}>${original_price.toFixed(2)}</Text>
          <View style={styles.line} />
        </View>
      </View>
    </Touchable>
  );
}
