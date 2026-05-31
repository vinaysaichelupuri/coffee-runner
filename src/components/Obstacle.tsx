import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing, runOnJS } from 'react-native-reanimated';
import { Obstacle as ObstacleType } from '../types/game';
import { LANES, OBSTACLE_SPEED } from '../constants/gameConstants';
import { useGameStore } from '../store/useGameStore';
import { useGameLoop } from '../hooks/useGameLoop';

const { width, height } = Dimensions.get('window');
const LANE_WIDTH = width / 3;

interface Props {
  obstacle: ObstacleType;
}

export const Obstacle: React.FC<Props> = ({ obstacle }) => {
  const translateY = useSharedValue(-100);
  const isActive = useSharedValue(true);
  const removeObstacle = useGameStore((state) => state.removeObstacle);
  const handleObstacleCollision = useGameStore((state) => state.handleObstacleCollision);

  useGameLoop(
    obstacle.lane,
    translateY,
    50, // obstacle height
    isActive,
    handleObstacleCollision,
    obstacle.id
  );

  useEffect(() => {
    // Animate downward
    translateY.value = withTiming(
      height + 100, 
      { duration: OBSTACLE_SPEED, easing: Easing.linear },
      (finished) => {
        if (finished) {
          runOnJS(removeObstacle)(obstacle.id);
        }
      }
    );
  }, [translateY, obstacle.id, removeObstacle]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
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
