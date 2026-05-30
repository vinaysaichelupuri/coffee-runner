# Quickstart: Coffee Collection System

## Overview
This document explains how to manually test the Coffee Collection System once it is implemented.

## Prerequisites
- The game must be running locally via Expo.
- You should be able to view the `GameScreen`.

## Testing Steps

1. **Start the Game**:
   - Run `npm run android` or `npm run ios`.
   - The game will automatically start in `playing` status due to the `GameScreen` mount effect.

2. **Observe Spawning**:
   - Wait for a few seconds. You should see "Coffee" objects (distinct visually from obstacles, e.g., a different color or shape) spawning and moving down the screen.
   - Verify they spawn in random lanes.

3. **Test Collection**:
   - Swipe left or right to move the player to the lane where a coffee cup is falling.
   - When the coffee cup reaches the player, it should disappear instantly.
   - The score at the top of the screen should increase by 10 points.

4. **Test Off-screen Cleanup**:
   - Move away from a falling coffee cup and let it pass by.
   - It should move past the bottom of the screen and disappear.

5. **Test Collision Priority** *(If applicable)*:
   - If an obstacle and coffee cup are close to each other, colliding with the obstacle should still trigger Game Over (to be verified in the collision phase).
