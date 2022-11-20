import dayjs from 'dayjs';
import { useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from 'styles/colors';

import Title from './title';

export default function Content({ title, original_price, until_date }) {
  const daysLeft = useMemo(() => dayjs(until_date).diff(dayjs(), 'd'), [until_date]);
  return (
    <>
      <View style={styles.priceContainer}>
        <View>
          <Text style={styles.price}>${original_price.toFixed(2)}</Text>
          <View style={styles.line} />
        </View>
      </View>

      <View style={styles.content}>
        <Title style={styles.title}>{title}</Title>
        <View style={styles.rowContainer}>
          <View>{/* Add store here */}</View>
          <Text style={{ color: daysLeft > 3 ? Colors.safe : Colors.unsafe }}>
            {daysLeft} days left
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 6,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    marginTop: 15,
    marginBottom: 12,
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
