import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  SharedValue
} from 'react-native-reanimated';
import { Coffee as CoffeeType } from '../types/game';
import { OBSTACLE_SPEED } from '../constants/gameConstants';

const { width, height } = Dimensions.get('window');
// Assume LANE_WIDTH is defined in constants or derived here.
const ACTUAL_LANE_WIDTH = width / 3;

interface Props {
  coffee: CoffeeType;
  globalDistance: SharedValue<number>;
}

export const Coffee: React.FC<Props> = ({ coffee, globalDistance }) => {
  // Offscreen cleanup is handled centrally by useGameLoop.

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: globalDistance.value - coffee.spawnDistance },
        { translateX: coffee.lane * ACTUAL_LANE_WIDTH },
      ],
      // Optional: shrink or fade out when collected
      opacity: coffee.active ? 1 : 0,
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.cupBody} />
      <View style={styles.cupLid} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: width / 2 - 20, // Center based on 40px width
    top: 0,
    width: 40,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9, // Slightly below obstacles
  },
  cupBody: {
    width: 30,
    height: 40,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  cupLid: {
    position: 'absolute',
    top: 5,
    width: 34,
    height: 10,
    backgroundColor: '#8B4513',
    borderRadius: 5,
  }
});
