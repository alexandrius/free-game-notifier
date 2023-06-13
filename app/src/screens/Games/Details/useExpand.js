import { useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  Easing,
  withTiming,
  withDecay,
  useAnimatedProps,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { getTopInset } from 'rn-iphone-helper';

import { imageStyle } from '../Item';

const { height } = Dimensions.get('screen');

const statusBarHeight = getTopInset();
Animated.addWhitelistedNativeProps({ bounces: true });

export default function useExpand({ pageYRef, onClose }) {
  const scrollRef = useRef();
  const reqTranslateY = useSharedValue(pageYRef.current);
  const anim = useSharedValue(0);
  const translateAnim = useSharedValue(0);
  const listContentOffsetY = useSharedValue(0);
  const contentHeight = useSharedValue(0);
  const collapseTriggered = useSharedValue(false);

  function expand(expand, velocity) {
    'worklet';
    const duration = reqTranslateY.value > height / 3 ? 700 : 500;

    if (velocity) {
      anim.value = withDecay({ velocity });
      return;
    }

    if (expand) {
      const config = { duration, easing: Easing.elastic(0.8) };
      translateAnim.value = withTiming(1, config);
      anim.value = withTiming(1, config);
    } else {
      const config = { duration, easing: Easing.elastic(0.8) };
      translateAnim.value = withTiming(0, config);
      anim.value = withTiming(0, config, (ended) => {
        if (ended) {
          runOnJS(onClose)();
        }
      });
    }
  }

  useEffect(() => {
    runOnUI(expand)(true);
  }, []);

  const touchableContainerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(translateAnim.value, [0, 1], [reqTranslateY.value, 0]) }],
    borderRadius: interpolate(anim.value, [0, 1], [12, 0]),
  }));

  const itemContainerStyle = useAnimatedStyle(() => ({
    marginHorizontal: interpolate(anim.value, [0, 1], [20, 0]),
  }));

  const imageAnimatedStyle = useAnimatedStyle(() => ({
    height: interpolate(
      anim.value,
      [0, 1],
      [imageStyle.height, imageStyle.height + statusBarHeight + 150]
    ),
  }));

  const translateOpacityStyle = useAnimatedStyle(() => ({ opacity: translateAnim.value }));

  const opacityAnimatedStyle = useAnimatedStyle(() => ({ opacity: anim.value }));
  const reverseOpacityAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(anim.value, [0, 1], [1, 0]),
  }));

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y } }) => {
      if (y > 100) {
        listContentOffsetY.value = y;
      }
    },
    onMomentumEnd: ({ contentOffset: { y } }) => {
      listContentOffsetY.value = y;
    },
  });

  const scrollAnimatedProps = useAnimatedProps(() => ({
    bounces: listContentOffsetY.value > 0,
  }));

  const panGesture = Gesture.Pan()
    .onChange(({ velocityY, translationY }) => {
      if (collapseTriggered.value) return;
      if (velocityY >= 0) {
        translateAnim.value = interpolate(translationY, [0, 400], [1, 0]);
      }
      collapseTriggered.value = translateAnim.value < 0.5;
      if (collapseTriggered.value) expand(!collapseTriggered.value);
    })
    .onEnd(() => {
      if (!collapseTriggered.value) expand(true);
    });

  return {
    touchableContainerAnimatedStyle,
    reverseOpacityAnimatedStyle,
    translateOpacityStyle,
    opacityAnimatedStyle,
    scrollAnimatedProps,
    itemContainerStyle,
    imageAnimatedStyle,
    contentHeight,
    panGesture,
    scrollRef,
    onScroll,
    expand,
  };
}
