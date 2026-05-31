import { useAnimatedReaction, runOnJS } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import { isColliding, BoundingBox } from '../utils/collision';
import { playerFractionalLane } from '../utils/globalShared';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

// Player sits at bottom of screen with 50 padding, height 50
const PLAYER_Y = height - 100; 
const PLAYER_HEIGHT = 50;

/**
 * Hook to integrate collision detection into the main loop using Reanimated.
 * Evaluates collisions entirely on the native UI thread and only triggers JS on a hit.
 */
export const useGameLoop = (
  entityLane: number,
  entityY: SharedValue<number>,
  entityHeight: number,
  isActive: SharedValue<boolean>,
  onCollide: (id: string) => void,
  entityId: string
) => {
  useAnimatedReaction(
    () => entityY.value,
    (currentY) => {
      // Don't check if already collided or collected
      if (!isActive.value) return;

      // Only check when entity is near the player to save cycles
      if (currentY > PLAYER_Y - entityHeight && currentY < PLAYER_Y + PLAYER_HEIGHT) {
        const entityBox: BoundingBox = { lane: entityLane, y: currentY, height: entityHeight };
        const playerBox: BoundingBox = { lane: playerFractionalLane.value, y: PLAYER_Y, height: PLAYER_HEIGHT };
        
        // Threshold of 0.6 to give the player a slight generous hitbox (typical for runners)
        if (isColliding(playerBox, entityBox, 0.6)) {
          isActive.value = false; // Mark as inactive instantly on UI thread
          runOnJS(onCollide)(entityId);
        }
      }
    }
  );
};
