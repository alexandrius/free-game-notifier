import { AntDesign } from '@expo/vector-icons';
import Text from 'components/Text';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
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
  withDecay,
} from 'react-native-reanimated';
import { getTopInset } from 'rn-iphone-helper';
import Colors from 'styles/colors';
import { fill } from 'styles/common';

import { imageStyle, rootStyle } from './Item';
import Content, { contentStyle, titleStyle } from './Item/content';
import Price from './Item/price';
import Title from './Item/title';

const { height } = Dimensions.get('screen');
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
    position: 'absolute',
    top: getTopInset(true),
    right: 20,
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
  const translateAnim = useSharedValue(0);
  const listContentOffsetY = useSharedValue(0);
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

  const translateOpcaityStyle = useAnimatedStyle(() => ({ opacity: translateAnim.value }));

  const opacityAnimatedStyle = useAnimatedStyle(() => ({ opacity: anim.value }));
  const reverseOpacityAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(anim.value, [0, 1], [1, 0]),
  }));

  const onScroll = useAnimatedGestureHandler(({ contentOffset: { y } }) => {
    listContentOffsetY.value = y;
  });

  const panGesture = Gesture.Pan()
    .onChange(({ velocityY, translationY }) => {
      'worklet';
      if (collapseTriggered.value) return;
      if (velocityY >= 0) {
        translateAnim.value = interpolate(translationY, [0, 400], [1, 0]);
      }
      collapseTriggered.value = translateAnim.value < 0.5;
      if (collapseTriggered.value) expand(!collapseTriggered.value);
    })
    .onEnd(() => {
      'worklet';
      if (!collapseTriggered.value) expand(true);
    });

  return (
    <View style={StyleSheet.absoluteFill}>
      <StatusBar hidden animated />
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

              <Animated.View style={[styles.close, translateOpcaityStyle]}>
                <TouchableOpacity style={fill} onPress={() => runOnUI(expand)(false)}>
                  <AntDesign name='closecircle' size={24} color={Colors.tag} />
                </TouchableOpacity>
              </Animated.View>
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
        </Animated.View>
      </GestureDetector>
    </View>
  );
}
