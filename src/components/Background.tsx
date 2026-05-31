import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, SharedValue } from 'react-native-reanimated';

interface BackgroundProps {
  globalDistance: SharedValue<number>;
}

const { height, width } = Dimensions.get('window');

// We simulate a repeating road/background tile.
// The tile is essentially 2x the height of the screen to allow seamless looping.
const TILE_HEIGHT = height;

export const Background = ({ globalDistance }: BackgroundProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    // Scroll downwards by adding globalDistance to translateY.
    // Use modulo to wrap around seamlessly.
    const translateY = globalDistance.value % TILE_HEIGHT;
    
    return {
      transform: [{ translateY }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.tileContainer, animatedStyle]}>
        {/* Draw two tiles stacked to enable the seamless loop */}
        <View style={[styles.tile, { top: -TILE_HEIGHT }]} />
        <View style={[styles.tile, { top: 0 }]} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#2b2b2b',
    zIndex: -1,
    overflow: 'hidden',
  },
  tileContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  tile: {
    position: 'absolute',
    width: width,
    height: TILE_HEIGHT,
    // Draw some simple "road" lines as the background texture
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderColor: '#444',
    borderStyle: 'dashed',
    left: 20, // Offset a bit to look like road borders
    right: 20,
  }
});
