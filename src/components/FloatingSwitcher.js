import { Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import Colors from 'styles/colors';

import { Touchable } from './Touchable';

export default function FloatingSwitcher({ selected = 0, options }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {expanded && <View style={styles.outsideTouch} onTouchStart={() => setExpanded(false)} />}
      <View style={styles.container}>
        {options.map((option) => (
          <Touchable
            key={option.title}
            rippleColor={Colors.item}
            style={styles.touchable}
            onPress={() => {
              if (expanded) {
                //TODO: select here
              }
              setExpanded(!expanded);
            }}>
            <Text style={styles.label}>{option.title}</Text>
            <Entypo name='chevron-thin-down' color='white' size={16} />
          </Touchable>
        ))}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  outsideTouch: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'transparent',
  },
  container: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: getBottomSpace() + 15,
    backgroundColor: Colors.accent,
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'stretch',
  },
  touchable: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    marginRight: 17,
    lineHeight: 24,
  },
});
