import Image from 'components/Image';
import Text from 'components/Text';
import dayjs from 'dayjs';
import { useMemo, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from 'styles/colors';

const styles = StyleSheet.create({
  touchable: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 16,
    backgroundColor: Colors.itemBackground,
    borderRadius: 12,
    marginBottom: 12,
  },
  image: {
    borderRadius: 12,
    width: '100%',
    height: 210,
  },
  content: {
    marginHorizontal: 6,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

export default function Item({
  id,
  title,
  photo,
  original_price,
  until_date,
  insideList,
  expanded,
  onPress,
}) {
  const ref = useRef();

  const daysLeft = useMemo(() => dayjs(until_date).diff(dayjs(), 'd'), [until_date]);

  return (
    <View ref={ref} style={{ opacity: expanded ? 0 : 1 }}>
      <TouchableOpacity
        style={[styles.touchable, { marginHorizontal: insideList ? 20 : 0 }]}
        activeOpacity={0.9}
        disabled={!insideList}
        onPress={() => {
          ref.current.measure((x, y, width, height, pageX, pageY) => {
            onPress({ x, y, width, height, pageX, pageY });
          });
        }}>
        <Image style={styles.image} source={{ uri: photo }} resizeMode='cover' />

        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.price}>${original_price.toFixed(2)}</Text>
            <View style={styles.line} />
          </View>
        </View>

        <View style={styles.content}>
          <View style={[styles.rowContainer, { marginBottom: 12 }]}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.rowContainer}>
            <View>{/* Add store here */}</View>
            <Text style={{ color: daysLeft > 3 ? Colors.safe : Colors.unsafe }}>
              {daysLeft} days left
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
