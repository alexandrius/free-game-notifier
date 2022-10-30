import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import Colors from 'styles/colors';

export default function Details({ route, navigation }) {
  const { game } = route.params;

  return (
    <View style={styles.root}>
      <SharedElement id={`${game.id}.photo`}>
        <Image
          style={styles.image}
          source={{ uri: game.photo }}
          onLoad={() => {
            console.log('onLoad');
          }}
        />
      </SharedElement>

      <TouchableOpacity
        style={{
          width: 100,
          height: 100,
          position: 'absolute',
          backgroundColor: 'red',
          zIndex: 100,
        }}
        onPress={() => navigation.goBack()}></TouchableOpacity>
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
