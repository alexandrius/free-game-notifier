import Text from 'components/Text';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Animated, {
  interpolate,
  measure,
  runOnJS,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { getStatusBarHeight } from 'rn-iphone-helper';
import Colors from 'styles/colors';
import useEffectAfter from 'utils/hooks/useEffectAfter';

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  touchableContainer: {
    width: '100%',
  },
  touchable: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 16,
    backgroundColor: Colors.itemBackground,
    borderRadius: 12,
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
  close: {
    height: 40,
    width: 40,
    position: 'absolute',
    top: 20,
    backgroundColor: 'red',
  },
  backgroundNode: {
    backgroundColor: Colors.itemBackground,
    position: 'absolute',
    height,
    width,
  },
  additionalInfo: {
    marginHorizontal: 24,
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
  expanded: expandedProp,
}) {
  const [expanded, setExpanded] = useState(expandedProp);

  const itemRef = useAnimatedRef();
  const collapsedHeight = useSharedValue(0);
  const reqTranslateY = useSharedValue(0);
  const anim = useSharedValue(0);

  function expand(expand) {
    'worklet';
    if (expand) {
      const { pageY } = measure(itemRef);
      reqTranslateY.value = -1 * pageY;
      anim.value = withTiming(1);
    } else {
      anim.value = withTiming(0, {}, (ended) => {
        if (ended) {
          runOnJS(setExpanded)(false);
        }
      });
    }
  }

  const rootAnimatedStyle = useAnimatedStyle(() => ({
    marginHorizontal: interpolate(anim.value, [0, 1], [20, 0]),
  }));

  const touchableContainerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(anim.value, [0, 1], [0, reqTranslateY.value]) }],
  }));

  const headerPlaceholderStyle = useAnimatedStyle(() => ({
    height: interpolate(anim.value, [0, 1], [0, statusBarHeight]),
  }));

  const opacityAnimationStyle = useAnimatedStyle(() => ({ opacity: anim.value }));

  useEffectAfter(() => {
    if (expandedProp) setExpanded(true);
    runOnUI(expand)(expandedProp);
  }, [expandedProp]);

  const daysLeft = useMemo(() => dayjs(until_date).diff(dayjs(), 'd'), [until_date]);

  return (
    <>
      {expanded && (
        <Animated.View
          style={[styles.backgroundNode, { zIndex: expanded ? 2 : 1 }, opacityAnimationStyle]}
        />
      )}
      <Animated.View
        ref={itemRef}
        style={[styles.container, { zIndex: expanded ? 2 : 1 }, rootAnimatedStyle]}
        onLayout={({
          nativeEvent: {
            layout: { height },
          },
        }) => {
          if (!collapsedHeight.value && height) {
            collapsedHeight.value = height;
          }
        }}>
        {expanded && <View style={{ height: collapsedHeight.value }} />}

        <Animated.View
          style={[
            styles.touchableContainer,
            { position: expanded ? 'absolute' : 'relative' },
            touchableContainerAnimatedStyle,
          ]}>
          <Animated.View style={headerPlaceholderStyle} />
          <TouchableOpacity
            style={styles.touchable}
            activeOpacity={0.9}
            disabled={expanded}
            onPress={() => {
              if (collapsedHeight.value) onPress();
            }}>
            <Image style={styles.image} source={{ uri: photo }} resizeMode='cover' />

            <View style={styles.priceContainer}>
              <View>
                <Text style={styles.price}>${original_price.toFixed(2)}</Text>
                <View style={styles.line} />
              </View>
            </View>

            {expanded && (
              <TouchableOpacity style={styles.close} onPress={onPress}></TouchableOpacity>
            )}

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

          {/* Everything below will be hidden */}
          {expanded && (
            <Animated.View style={[styles.additionalInfo, opacityAnimationStyle]}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>{description}</Text>
              <Text style={styles.sectionTitle}>Additional Info</Text>
              <InfoItem label='Release Date' value={release_date} />
              <InfoItem label='Developer' value={developer} />
              <InfoItem label='Platforms' value='Windows' />
            </Animated.View>
          )}
        </Animated.View>
      </Animated.View>
    </>
  );
}
