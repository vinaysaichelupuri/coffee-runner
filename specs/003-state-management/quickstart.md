# Quickstart: State Management

This guide shows how to interact with the global game state using the Zustand store.

## Reading State

To avoid unnecessary re-renders, always select only the specific state slice your component needs:

```typescript
import { useGameStore } from '../store/useGameStore';

// In a component that only needs the score:
const ScoreDisplay = () => {
  const score = useGameStore((state) => state.score);
  
  return <Text>Score: {score}</Text>;
};
```

## Updating State

Access actions directly from the store:

```typescript
import { useGameStore } from '../store/useGameStore';

const GameController = () => {
  const setScore = useGameStore((state) => state.setScore);
  const setActiveLane = useGameStore((state) => state.setActiveLane);

  const handleCoffeeCollected = () => {
    // Current state can be read directly via getState if needed outside components,
    // or by subscribing to the state in the component.
    setScore(useGameStore.getState().score + 10);
  };

  const moveLeft = () => {
    const currentLane = useGameStore.getState().activeLane;
    if (currentLane > 0) setActiveLane(currentLane - 1);
  };
}
```

## Accessing State Outside React Components

You can read or update the store outside of React components (e.g., in the game loop) using `getState()` and `setState()`:

```typescript
import { useGameStore } from '../store/useGameStore';

export const gameTick = () => {
  const state = useGameStore.getState();
  
  if (state.status === 'playing') {
    // ... update logic
  }
};
```
