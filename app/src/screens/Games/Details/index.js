import { AntDesign } from '@expo/vector-icons';
import Text from 'components/Text';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { runOnUI } from 'react-native-reanimated';
import { getTopInset } from 'rn-iphone-helper';
import Colors from 'styles/colors';
import { fill } from 'styles/common';

import { rootStyle } from '../Item';
import Content, { contentStyle, titleStyle } from '../Item/content';
import Price from '../Item/price';
import Title from '../Item/title';
import Tags from '../Tags';
import useExpand from './useExpand';

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

function InfoItem({ label, value, renderValue }) {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>{label}</Text>
      {renderValue?.() || <Text style={styles.infoValue}>{value}</Text>}
    </View>
  );
}

export default function Details({ onClose, pageYRef, game }) {
  const { release_date, description, developer, tags } = game;

  const {
    touchableContainerAnimatedStyle,
    itemContainerStyle,
    imageAnimatedStyle,
    translateOpacityStyle,
    opacityAnimatedStyle,
    reverseOpacityAnimatedStyle,
    onScroll,
    panGesture,
    scrollRef,
    expand,
  } = useExpand({ onClose, pageYRef });

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
                contentFit='cover'
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

              <Animated.View style={[styles.close, translateOpacityStyle]}>
                <TouchableOpacity style={fill} onPress={() => runOnUI(expand)(false)}>
                  <AntDesign name='closecircle' size={24} color={Colors.tag} />
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>

            <Animated.View style={[styles.additionalInfo, opacityAnimatedStyle]}>
              <Tags tags={tags} />
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
