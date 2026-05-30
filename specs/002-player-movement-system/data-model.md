# Data Model: player-movement-system

## Entities

### Player State (Zustand Store)
- `currentLane`: number (-1, 0, 1 or 0, 1, 2)
- `isMoving`: boolean (tracks if an animation is currently in progress)

### Actions
- `moveLeft()`: transitions to the lane on the left if not at boundary.
- `moveRight()`: transitions to the lane on the right if not at boundary.

## Validation Rules
- Cannot move left if `currentLane` is the leftmost lane.
- Cannot move right if `currentLane` is the rightmost lane.
