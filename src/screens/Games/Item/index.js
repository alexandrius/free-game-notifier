import Image from 'components/Image';
import { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from 'styles/colors';

import Content from './content';

export const imageStyle = {
  borderRadius: 12,
  width: '100%',
  height: 210,
};

const styles = StyleSheet.create({
  touchable: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 16,
    backgroundColor: Colors.itemBackground,
    borderRadius: 12,
    marginBottom: 12,
    marginHorizontal: 20,
  },
});

export default function Item({ onPress, expanded, photo, ...game }) {
  const ref = useRef();

  return (
    <View ref={ref} style={{ opacity: expanded ? 0 : 1 }} collapsable={false}>
      <TouchableOpacity
        style={styles.touchable}
        activeOpacity={0.9}
        onPress={() => {
          ref.current.measure((x, y, width, height, pageX, pageY) => {
            onPress({ x, y, width, height, pageX, pageY });
          });
        }}>
        <Image style={imageStyle} source={{ uri: photo }} resizeMode='cover' />

        <Content {...game} />
      </TouchableOpacity>
    </View>
  );
}
