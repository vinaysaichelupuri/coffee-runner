# Data Model: Core Gameplay & Progression

## GameState (Zustand Store)

Tracks the global state of the game loop and progression.

```typescript
interface GameState {
  // Core State
  status: 'idle' | 'playing' | 'game_over';
  score: number;
  highScore: number;
  
  // Progression
  speed: number;
  baseSpeed: number;
  spawnInterval: number;
  
  // Entities
  activeLane: number;
  
  // Actions
  startGame: () => void;
  endGame: () => void;
  increaseScore: (amount: number) => void;
  setSpeed: (newSpeed: number) => void;
  setSpawnInterval: (newInterval: number) => void;
}
```

## Entity Physics

Used in Reanimated Shared Values for smooth rendering and collisions.

```typescript
interface Hitbox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface SpawnableEntity {
  id: string;
  lane: number;
  type: 'obstacle' | 'coffee';
  // Y position is tracked in a SharedValue separately
}
```

## Difficulty Config

Static configuration for progression scaling.

```typescript
interface DifficultyConfig {
  INITIAL_SPEED: number;
  MAX_SPEED: number;
  SPEED_INCREMENT: number;
  SPEED_INCREMENT_INTERVAL_MS: number;
  
  INITIAL_SPAWN_INTERVAL_MS: number;
  MIN_SPAWN_INTERVAL_MS: number;
}
```
