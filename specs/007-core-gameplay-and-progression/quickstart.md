# Quickstart: Core Gameplay & Progression

This guide covers how to test and run the new gameplay loop and difficulty progression.

## Setup

1. Ensure the development server is running: `npm run start`
2. Run on Android/iOS: `npm run android` or `npm run ios`

## Manual Testing

### 1. Loop and Spawning
- Open the Game Screen.
- Tap Play.
- Verify that obstacles and coffee cups spawn at regular intervals and move downwards smoothly at 60 FPS.

### 2. Collision Detection
- Swipe the player into an obstacle lane.
- Verify the game immediately triggers the Game Over state.
- Swipe the player into a coffee lane.
- Verify the score increments by 10 and the coffee cup disappears.

### 3. Difficulty Scaling
- Play the game continuously for >30 seconds.
- Verify that the speed of objects moving downwards increases.
- Verify that objects spawn more frequently as the speed increases.
