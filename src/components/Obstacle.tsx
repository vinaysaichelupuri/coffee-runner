import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, useAnimatedReaction, SharedValue, runOnJS } from 'react-native-reanimated';
import { Obstacle as ObstacleType } from '../types/game';
import { LANES, OBSTACLE_SPEED } from '../constants/gameConstants';
import { useGameStore } from '../store/useGameStore';

const { width, height } = Dimensions.get('window');
const LANE_WIDTH = width / 3;

interface Props {
  obstacle: ObstacleType;
  globalDistance: SharedValue<number>;
}

export const Obstacle: React.FC<Props> = ({ obstacle, globalDistance }) => {
  const removeObstacle = useGameStore((state) => state.removeObstacle);

  // We don't need a local translateY, we compute it directly in animated style
  // But we need to detect when it goes off screen to remove it.
  useAnimatedReaction(
    () => globalDistance.value - obstacle.spawnDistance,
    (translateY) => {
      if (translateY > height + 100 && obstacle.active) {
        runOnJS(removeObstacle)(obstacle.id);
      }
    }
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: globalDistance.value - obstacle.spawnDistance },
        // Simple lane mapping: LEFT is -1, CENTER is 0, RIGHT is 1
        // Base X could be 0 (center of screen)
        { translateX: obstacle.lane * LANE_WIDTH },
      ],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={[styles.obstacleBody, obstacle.type === 'cone' ? styles.cone : styles.barrier]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: width / 2 - 25,
    top: 0,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  obstacleBody: {
    width: '100%',
    height: '100%',
  },
  cone: {
    borderBottomWidth: 50,
    borderBottomColor: 'orange',
    borderLeftWidth: 25,
    borderLeftColor: 'transparent',
    borderRightWidth: 25,
    borderRightColor: 'transparent',
    backgroundColor: 'transparent',
  },
  barrier: {
    backgroundColor: '#8B4513',
    borderRadius: 5,
  }
});
