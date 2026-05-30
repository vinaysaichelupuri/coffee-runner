import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming, 
  Easing, 
  runOnJS,
  useAnimatedReaction
} from 'react-native-reanimated';
import { Coffee as CoffeeType } from '../types/game';
import { OBSTACLE_SPEED } from '../constants/gameConstants';
import { useGameStore } from '../store/useGameStore';
import { usePlayerStore } from '../store/usePlayerStore';

const { width, height } = Dimensions.get('window');
// Assume LANE_WIDTH is defined in constants or derived here.
const ACTUAL_LANE_WIDTH = width / 3;

interface Props {
  coffee: CoffeeType;
}

export const Coffee: React.FC<Props> = ({ coffee }) => {
  const translateY = useSharedValue(-100);
  const hasCollected = useSharedValue(false);
  const removeCoffee = useGameStore((state) => state.removeCoffee);
  const collectCoffee = useGameStore((state) => state.collectCoffee);
  
  const currentLane = usePlayerStore((state) => state.currentLane);
  const playerLaneSV = useSharedValue(currentLane);

  useEffect(() => {
    playerLaneSV.value = currentLane;
  }, [currentLane, playerLaneSV]);

  useEffect(() => {
    // Animate downward
    translateY.value = withTiming(
      height + 100, 
      { duration: OBSTACLE_SPEED, easing: Easing.linear },
      (finished) => {
        if (finished && !hasCollected.value) {
          runOnJS(removeCoffee)(coffee.id);
        }
      }
    );
  }, [translateY, coffee.id, removeCoffee]);

  // Collision detection
  useAnimatedReaction(
    () => translateY.value,
    (currentY) => {
      // Player is near the bottom: container has paddingBottom 50, player is 50x50.
      // So player top is around height - 100. Let's use a threshold.
      if (currentY > height - 120 && currentY < height - 50 && !hasCollected.value) {
        if (coffee.lane === playerLaneSV.value) {
          hasCollected.value = true;
          runOnJS(collectCoffee)(coffee.id);
        }
      }
    }
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { translateX: coffee.lane * ACTUAL_LANE_WIDTH },
      ],
      // Optional: shrink or fade out when collected
      opacity: hasCollected.value ? 0 : 1,
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
