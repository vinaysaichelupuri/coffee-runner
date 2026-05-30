# Data Model: Obstacle System

## Entities

### Obstacle
Represents a single hazard in the game.
- `id`: `string` (unique identifier)
- `lane`: `Lane` (Left, Center, Right)
- `type`: `ObstacleType` (e.g., 'barrier', 'cone' - currently defaults to generic)
- `active`: `boolean`

## State Updates (Zustand `useGameStore`)
- `obstacles`: `Obstacle[]`
- `addObstacle(obstacle: Obstacle)`
- `removeObstacle(id: string)`
- `clearObstacles()`

## Configuration Constants
- `OBSTACLE_SPAWN_INTERVAL`: `number` (ms)
- `OBSTACLE_SPEED`: `number` (dependent on game speed)
