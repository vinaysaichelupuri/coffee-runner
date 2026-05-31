# Contracts: Game Engine

This document defines the internal contracts for the Core Gameplay Engine.

## `useGameLoop` Hook
```typescript
interface GameLoopConfig {
  onCollision: (entity: SpawnableEntity) => void;
  onUpdateScore: (points: number) => void;
}

function useGameLoop(config: GameLoopConfig): void;
```

## `useSpawner` Hook
```typescript
interface SpawnerConfig {
  spawnIntervalMs: number;
}

function useSpawner(config: SpawnerConfig): {
  entities: SharedValue<SpawnableEntity[]>;
}
```
