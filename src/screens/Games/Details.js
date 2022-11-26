import Image from 'components/Image';
import Text from 'components/Text';
import { useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  runOnUI,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  Easing,
  withTiming,
} from 'react-native-reanimated';
import { getTopInset } from 'rn-iphone-helper';
import Colors from 'styles/colors';
import { fill } from 'styles/common';

import { imageStyle, rootStyle } from './Item';
import Content, { contentStyle, titleStyle } from './Item/content';
import Price from './Item/price';
import Title from './Item/title';

const AnimatedImage = Animated.createAnimatedComponent(Image);

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
  itemContainer: {
    backgroundColor: Colors.itemBackground,
    borderRadius: rootStyle.borderRadius,
    paddingBottom: rootStyle.paddingBottom,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
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
    top: 20 + getTopInset(),
    left: 20,
    backgroundColor: 'red',
  },
  backgroundNode: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Colors.itemBackground,
  },
  titleContainer: {
    position: 'absolute',
    top: titleStyle.marginTop,
    left: contentStyle.marginHorizontal,
  },
});

const statusBarHeight = getTopInset();

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

  const scrollRef = useRef();
  const reqTranslateY = useSharedValue(pageYRef.current);
  const anim = useSharedValue(0);
  const listContentOffsetY = useSharedValue(0);

  function expand(expand) {
    'worklet';
    if (expand) {
      anim.value = withTiming(1, { duration: 500, easing: Easing.elastic(1) });
    } else {
      anim.value = withTiming(0, { duration: 500, easing: Easing.elastic(1) }, (ended) => {
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
    transform: [{ translateY: interpolate(anim.value, [0, 1], [reqTranslateY.value, 0]) }],
    borderRadius: interpolate(anim.value, [0, 1], [12, 0]),
  }));

  const itemContainerStyle = useAnimatedStyle(() => ({
    marginHorizontal: interpolate(anim.value, [0, 1], [20, 0]),
  }));

  const imageAnimatedStyle = useAnimatedStyle(() => ({
    height: interpolate(
      anim.value,
      [0, 1],
      [imageStyle.height, imageStyle.height + statusBarHeight]
    ),
  }));

  const opacityAnimatedStyle = useAnimatedStyle(() => ({ opacity: anim.value }));
  const reverseOpacityAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(anim.value, [0, 1], [1, 0]),
  }));

  const onScroll = useAnimatedGestureHandler(({ contentOffset: { y } }) => {
    listContentOffsetY.value = y;
  });

  const panGesture = Gesture.Pan()
    .onChange((event) => {
      'worklet';
      if (listContentOffsetY.value <= 0 && event.velocityY >= 0) {
        anim.value = interpolate(event.translationY, [0, 400], [1, 0]);
      }
    })
    .onEnd((event) => {
      'worklet';
      if (event.velocityY > 100) {
        expand(false);
        return;
      }
      expand(anim.value > 0.5);
    });

  return (
    <View style={StyleSheet.absoluteFill}>
      <Animated.View style={[styles.backgroundNode, opacityAnimatedStyle]} />
      <GestureDetector gesture={Gesture.Simultaneous(panGesture, Gesture.Native())}>
        <Animated.View onScroll={onScroll} ref={scrollRef}>
          <Animated.View style={[styles.touchableContainer, touchableContainerAnimatedStyle]}>
            <Animated.View style={[styles.itemContainer, itemContainerStyle]}>
              <AnimatedImage
                style={[styles.image, imageAnimatedStyle]}
                source={{ uri: game.photo }}
                resizeMode='cover'
              />
              <Animated.View
                style={[StyleSheet.absoluteFill, reverseOpacityAnimatedStyle]}
                pointerEvents='none'>
                <Price price={game.original_price} />
              </Animated.View>

              <View>
                <Animated.View style={reverseOpacityAnimatedStyle}>
                  <Content {...game} />
                </Animated.View>
                <Animated.View style={[styles.titleContainer, opacityAnimatedStyle]}>
                  <Title>{game.title}</Title>
                </Animated.View>
              </View>
            </Animated.View>

            <Animated.View style={[styles.additionalInfo, opacityAnimatedStyle]}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>{description}</Text>
              <Text style={styles.sectionTitle}>Additional Info</Text>
              <InfoItem label='Release Date' value={release_date} />
              <InfoItem label='Developer' value={developer} />
              <InfoItem label='Platforms' value='Windows' />
            </Animated.View>
          </Animated.View>
          <Animated.View style={[styles.close, opacityAnimatedStyle]}>
            <TouchableOpacity
              style={fill}
              onPress={() => runOnUI(expand)(false)}></TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}
