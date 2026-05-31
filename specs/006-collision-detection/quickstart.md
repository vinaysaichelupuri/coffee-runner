# Quickstart: Collision Detection

## Overview

This feature adds the spatial overlap checks that make the game interactive, turning the running animation into a proper game with win/loss conditions.

## Development

1. Review the AABB logic in `src/utils/collision.ts`.
2. See `src/store/gameStore.ts` for how collisions trigger game over and score updates.
3. Hook these utility calls into our existing game loop.

## Testing

```bash
# Run unit tests for the collision logic
npm test src/utils/collision.test.ts
```
