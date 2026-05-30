import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, runOnJS } from 'react-native-reanimated';
import { usePlayerStore } from '../store/usePlayerStore';
import { useSwipeGesture } from '../hooks/useSwipeGesture';

export const Player = () => {
  const { currentLane, moveLeft, moveRight, setIsMoving } = usePlayerStore();
  
  const panGesture = useSwipeGesture(moveLeft, moveRight);

  // Assuming 100px per lane, 0 is center
  const targetPosition = currentLane * 100;
  
  const translateX = useSharedValue(targetPosition);

  useEffect(() => {
    setIsMoving(true);
    translateX.value = withSpring(targetPosition, {
      damping: 15,
      stiffness: 150,
      mass: 0.5,
    }, (finished) => {
      if (finished) {
        runOnJS(setIsMoving)(false);
      }
    });
  }, [currentLane, translateX, setIsMoving, targetPosition]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.container}>
        <Animated.View style={[styles.player, animatedStyle]} />
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
  },
  player: {
    width: 50,
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
});
