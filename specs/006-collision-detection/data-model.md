# Data Model: Collision System

## Entities

### `BoundingBox` (Interface)
Defines the spatial properties of any collidable entity in the game.
- `lane`: `number` (The exact lane the entity occupies. For the player, this may be fractional during mid-transition)
- `y`: `number` (The vertical position)
- `height`: `number` (The vertical size of the entity bounds)

*Note*: Width is implicitly managed by the lane bounds. Collisions occur if the player's current lane (including fractional transition values) is within a certain threshold of an obstacle's integer lane (e.g., `Math.abs(player.lane - obstacle.lane) < 0.5`) AND there is vertical overlap.

## State Transitions

### `detectCollisions(player, obstacles, coffees)`
- Iterates over all active obstacles and coffees.
- Evaluates overlap with the player's bounding box.
- Returns an array of collision events.

### Game Store Actions
- `handleCollisions()`: 
  - If obstacle hit -> sets `status` to `'gameOver'`.
  - If coffee hit -> increments `score`, removes coffee id from active items.
