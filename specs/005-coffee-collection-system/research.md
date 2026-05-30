# Research & Technical Decisions: Coffee Collection System

## 1. Coffee & Obstacle Spawn Overlaps
- **Decision**: The `useCoffeeSpawner` will run independently of `useObstacleSpawner`. However, before spawning, it will check the `obstacles` array in `useGameStore` to ensure no obstacle was just spawned in the same lane (e.g., checking if there's an obstacle with `lane === targetLane` and we assume recent spawn). To keep it simple for MVP, we allow them to spawn independently, but visually they might overlap. A better approach: `useGameStore` tracks the "last spawned lane and time" or we just rely on the random distribution. For this phase, we will implement a simple collision check in the spawner: do not spawn coffee in the same lane as the most recently spawned obstacle if the time difference is small.
- **Rationale**: Keeps the game fair by ensuring players aren't forced to hit an obstacle to collect a coffee cup.
- **Alternatives considered**: Merging both spawners into a single `useEntitySpawner` (rejected to maintain separation of concerns).

## 2. Collision Detection Performance
- **Decision**: Use Reanimated's `useAnimatedReaction` inside the `Coffee` component to track its `translateY`. When it reaches the player's Y threshold, check if the player's current lane matches the coffee's lane. If true, trigger a `runOnJS` function to collect the coffee.
- **Rationale**: Keeps animations running at 60fps on the UI thread and only crosses the JS bridge when a collision event actually occurs.
- **Alternatives considered**: Polling positions in a `setInterval` on the JS thread (rejected due to performance and timing inaccuracies).

## 3. Score Increment Value
- **Decision**: Each coffee cup is worth 10 points.
- **Rationale**: Standard recognizable number that feels rewarding.
- **Alternatives considered**: 1 point (too low impact).
