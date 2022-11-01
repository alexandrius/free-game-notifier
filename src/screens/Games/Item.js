import Text from 'components/Text';
import { Touchable } from 'components/Touchable';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Colors from 'styles/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.itemBackground,
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 16,
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
  sectionTitle: {
    marginTop: 20,
    marginBottom: 8,
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
  },
  description: {
    color: Colors.text_description,
    lineHeight: 20,
  },
  infoItem: {
    marginBottom: 20,
  },
  infoLabel: {
    color: Colors.infoTitle,
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 4,
  },
  infoValue: {
    lineHeight: 20,
    color: Colors.infoValue,
  },
});

function InfoItem({ label, value, renderValue }) {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>{label}</Text>
      {renderValue?.() || <Text style={styles.infoValue}>{value}</Text>}
    </View>
  );
}

export default function Game({
  id,
  title,
  photo,
  original_price,
  until_date,
  release_date,
  description,
  developer,
  onPress,
  expanded,
}) {
  const daysLeft = useMemo(() => dayjs(until_date).diff(dayjs(), 'd'), [until_date]);

  return (
    <Touchable style={styles.container} rippleColor={Colors.accent} onPress={onPress}>
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

        {/* Everything below will be hidden */}
        {expanded && (
          <>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.sectionTitle}>Additional Info</Text>
            <InfoItem label='Release Date' value={release_date} />
            <InfoItem label='Developer' value={developer} />
            <InfoItem label='Platforms' value='Windows' />
          </>
        )}
      </View>
    </Touchable>
  );
}
