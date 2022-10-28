import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Touchable } from 'react-native-better-touchable';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import Colors from 'styles/colors';

export default function FloatingSwitcher({ selected = 0, options }) {
  return (
    <View style={styles.container}>
      <Touchable rippleColor={Colors.item} style={styles.touchable}>
        <Text style={styles.label}>{options[selected].title}</Text>
        <Entypo name='chevron-thin-down' color='white' size={16} />
      </Touchable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: getBottomSpace() + 15,
  },
  touchable: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: Colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    marginRight: 17,
    lineHeight: 24,
  },
});
