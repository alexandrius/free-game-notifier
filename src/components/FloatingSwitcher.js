import { Entypo } from '@expo/vector-icons';
import { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeIn, Layout } from 'react-native-reanimated';
import { getBottomSpace } from 'rn-iphone-helper';
import Colors from 'styles/colors';

function Option({ title, onPress, chevronVisible, selected }) {
  return (
    <Animated.View entering={FadeIn}>
      <TouchableOpacity activeOpacity={0.8} style={styles.touchable} onPress={onPress}>
        <Text style={styles.label}>{title}</Text>

        {/*TODO: UPDATE ICONS*/}
        {chevronVisible && (
          <Entypo name='chevron-thin-down' color='white' size={16} style={styles.icon} />
        )}
        {selected && <Entypo name='check' color='white' size={16} style={styles.icon} />}
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function FloatingSwitcher({ selected = 0, options, onSelect }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {expanded && <View style={styles.outsideTouch} onTouchStart={() => setExpanded(false)} />}
      <Animated.View style={styles.container} layout={Layout.duration(200)}>
        <>
          {expanded ? (
            options.map((option, index) => (
              <Option
                key={option.title}
                title={option.title}
                onPress={() => {
                  onSelect?.(index);
                  setExpanded(false);
                }}
                selected={selected === index && expanded}
              />
            ))
          ) : (
            <Option
              title={options[selected].title}
              onPress={() => setExpanded(true)}
              chevronVisible
            />
          )}
        </>
      </Animated.View>
    </>
  );
}
const styles = StyleSheet.create({
  outsideTouch: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'transparent',
  },
  container: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: getBottomSpace() + 15,
    backgroundColor: Colors.accent,
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'stretch',
  },
  touchable: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    lineHeight: 24,
  },
  icon: {
    marginLeft: 17,
  },
});
