import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Colors from 'styles/colors';

export default function Details({ route, navigation }) {
  const { game } = route.params;

  return (
    <View style={styles.root}>
      <Image style={styles.image} source={{ uri: game.photo }} resizeMode='cover' />

      <TouchableOpacity
        activeOpacity={1}
        style={{
          top: 50,
          right: 20,
          width: 50,
          height: 50,
          position: 'absolute',
          backgroundColor: 'red',
        }}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  image: {
    width: '100%',
    height: 400,
  },
});
