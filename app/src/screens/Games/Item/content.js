import dayjs from 'dayjs';
import { useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from 'styles/colors';

import Title from './title';

export const titleStyle = {
  marginTop: 15,
  marginBottom: 12,
};

export const contentStyle = {
  marginHorizontal: 20,
};

export default function Content({ title, until_date }) {
  const daysLeft = useMemo(() => dayjs(until_date).diff(dayjs(), 'd'), [until_date]);
  return (
    <View style={contentStyle}>
      <Title style={titleStyle}>{title}</Title>
      <View style={styles.rowContainer}>
        <View>{/* Add store here */}</View>
        <Text style={{ color: daysLeft > 3 ? Colors.safe : Colors.unsafe }}>
          {daysLeft} days left
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
