# Research: player-movement-system

## Swipe Detection

- **Decision**: Use `react-native-gesture-handler` `Gesture.Pan()`.
- **Rationale**: It provides native-driven gesture detection that works seamlessly with Reanimated, preventing JS thread bottlenecks during rapid swipes.
- **Alternatives considered**: `PanResponder` from React Native core (rejected due to JS thread reliance and poorer performance).

## Animation Strategy

- **Decision**: Use `react-native-reanimated` `useSharedValue` and `withTiming` / `withSpring`.
- **Rationale**: Allows animating the player's X position on the UI thread for smooth 60 FPS transitions.
- **Alternatives considered**: React Native `Animated` API (rejected as Reanimated is the project standard per constitution).

## Lane State Management

- **Decision**: Track logical lane (e.g., -1, 0, 1 for Left, Center, Right) in Zustand store.
- **Rationale**: Separates game logic (which lane the player is mathematically in) from presentation (pixel coordinates), aligning with the constitution's decoupling principle.
- **Alternatives considered**: Storing lane state in local component state (rejected due to violation of global game state management).
