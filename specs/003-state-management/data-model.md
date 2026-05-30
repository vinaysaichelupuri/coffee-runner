# Data Model: State Management

## GameState

The core interface defining the game's state and available actions in the Zustand store.

### Properties

| Field | Type | Description |
|-------|------|-------------|
| `score` | `number` | Current run score (starts at 0) |
| `highScore` | `number` | Highest score achieved |
| `speed` | `number` | Current game speed multiplier |
| `activeLane` | `number` | Current player lane (0 = Left, 1 = Center, 2 = Right) |
| `status` | `'idle' \| 'playing' \| 'game_over'` | Current game lifecycle state |

### Actions

| Action | Parameters | Description |
|--------|------------|-------------|
| `setScore` | `score: number` | Updates current score |
| `setHighScore` | `score: number` | Updates high score |
| `setSpeed` | `speed: number` | Updates game speed |
| `setActiveLane` | `lane: number` | Updates player lane (must be 0, 1, or 2) |
| `setStatus` | `status: GameStatus` | Updates game status |
| `resetGame` | `none` | Resets score, speed, active lane, and sets status to 'idle' |

## Validation Rules

- `activeLane` must always be restricted to `0, 1, or 2`.
- `score` and `highScore` must be non-negative integers.
- `speed` must be a positive number greater than 0.
