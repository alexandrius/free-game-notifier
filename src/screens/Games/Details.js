import Text from 'components/Text';
import { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { getStatusBarHeight } from 'rn-iphone-helper';
import Colors from 'styles/colors';

import Item from './Item';

const styles = StyleSheet.create({
  touchableContainer: {
    width: '100%',
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
  additionalInfo: {
    marginHorizontal: 24,
  },
  close: {
    height: 40,
    width: 40,
    position: 'absolute',
    top: 20 + getStatusBarHeight(),
    backgroundColor: 'red',
  },
  backgroundNode: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Colors.itemBackground,
  },
});

const statusBarHeight = getStatusBarHeight() + 10;

function InfoItem({ label, value, renderValue }) {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>{label}</Text>
      {renderValue?.() || <Text style={styles.infoValue}>{value}</Text>}
    </View>
  );
}

export default function Details({ onClose, pageYRef, game }) {
  const { release_date, description, developer } = game;

  const reqTranslateY = useSharedValue(pageYRef.current);
  const anim = useSharedValue(0);

  function expand(expand) {
    if (expand) {
      anim.value = withTiming(1);
    } else {
      anim.value = withTiming(0, {}, (ended) => {
        if (ended) {
          runOnJS(onClose)();
        }
      });
    }
  }

  useEffect(() => {
    expand(true);
  }, []);

  const rootAnimatedStyle = useAnimatedStyle(() => ({
    marginHorizontal: interpolate(anim.value, [0, 1], [20, 0]),
  }));

  const touchableContainerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(anim.value, [0, 1], [reqTranslateY.value, 0]) }],
  }));

  const headerPlaceholderStyle = useAnimatedStyle(() => ({
    height: interpolate(anim.value, [0, 1], [0, statusBarHeight]),
  }));

  const opacityAnimationStyle = useAnimatedStyle(() => ({ opacity: anim.value }));

  return (
    <Animated.View style={[StyleSheet.absoluteFill, rootAnimatedStyle]}>
      <Animated.View style={[styles.backgroundNode, opacityAnimationStyle]} />
      <Animated.View style={[styles.touchableContainer, touchableContainerAnimatedStyle]}>
        <Animated.View style={headerPlaceholderStyle} />
        <Item {...game} />

        <Animated.View style={[styles.additionalInfo, opacityAnimationStyle]}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.sectionTitle}>Additional Info</Text>
          <InfoItem label='Release Date' value={release_date} />
          <InfoItem label='Developer' value={developer} />
          <InfoItem label='Platforms' value='Windows' />
        </Animated.View>
      </Animated.View>

      <TouchableOpacity style={styles.close} onPress={() => expand(false)}></TouchableOpacity>
    </Animated.View>
  );
}
