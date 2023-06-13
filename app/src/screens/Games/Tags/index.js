import Text from 'components/Text';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';
import Colors from 'styles/colors';

export default function Tags({ tags }) {
  return (
    <View style={styles.root}>
      {tags.map((tag, i) => (
        <Animated.View key={tag} style={styles.tag} entering={ZoomIn.springify().delay(i * 100)}>
          <Text style={styles.tagText}>{tag}</Text>
        </Animated.View>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: Colors.tag,
    borderRadius: 24,
    paddingVertical: 4,
    paddingHorizontal: 14,
  },
  tagText: {
    color: 'white',
    fontWeight: 500,
  },
});
