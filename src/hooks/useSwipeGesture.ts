import { Gesture } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

export const useSwipeGesture = (onSwipeLeft: () => void, onSwipeRight: () => void) => {
  const panGesture = Gesture.Pan()
    .onEnd((e) => {
      if (e.translationX < -50) {
        runOnJS(onSwipeLeft)();
      } else if (e.translationX > 50) {
        runOnJS(onSwipeRight)();
      }
    });

  return panGesture;
};
