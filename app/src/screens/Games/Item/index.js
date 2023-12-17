import { useRef } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import Colors from 'styles/colors';

import Content from './content';
import Price from './price';

export const rootStyle = {
  paddingBottom: 16,
  backgroundColor: Colors.itemBackground,
  borderRadius: 12,
  marginBottom: 12,
  marginHorizontal: 20,
  overflow: 'hidden',
};
export const imageStyle = {
  width: '100%',
  height: 210,
};

export default function Item({ onPress, expanded, photo, original_price, ...game }) {
  const ref = useRef();

  return (
    <View ref={ref} style={{ opacity: expanded ? 0 : 1 }} collapsable={false}>
      <TouchableOpacity
        style={rootStyle}
        activeOpacity={0.9}
        onPress={() => {
          ref.current.measure((x, y, width, height, pageX, pageY) => {
            onPress({ x, y, width, height, pageX, pageY });
          });
        }}>
        <Image style={imageStyle} source={{ uri: photo }} contentFit='cover' />
        <Price price={original_price} />
        <Content {...game} />
      </TouchableOpacity>
    </View>
  );
}
