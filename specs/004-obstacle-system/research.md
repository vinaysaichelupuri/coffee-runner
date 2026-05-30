# Research: Obstacle System

## Decision: Object Movement
- **Decision**: Use React Native Reanimated `withTiming` or a continuously updating shared value based on game speed to animate obstacles downward.
- **Rationale**: Keeps animation on the native UI thread, guaranteeing 60fps and avoiding JS thread bottlenecks.
- **Alternatives considered**: `setInterval` state updates (rejected due to JS thread performance).

## Decision: Spawning and Cleanup
- **Decision**: Use a custom hook `useObstacleSpawner` that interacts with Zustand to manage a list of active obstacles. Cleanup occurs via a check on the obstacle's Y position or a timeout matching its movement duration.
- **Rationale**: Keeps spawning logic decoupled from the UI component. Zustand manages the data model, React handles rendering, and Reanimated handles the movement.
- **Alternatives considered**: Object pooling (rejected as premature optimization for <10 objects on screen; can introduce if garbage collection causes stutter).

## Decision: Lane Assignment
- **Decision**: Randomly select from predefined lane constants (`LEFT`, `CENTER`, `RIGHT`).
- **Rationale**: Simple and aligns with the existing 3-lane structure.
