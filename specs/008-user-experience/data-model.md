# Data Model: User Experience

## Entities

### `SoundAsset` (Type Alias)
Represents a preloaded audio clip in the `useAudio` hook.
- **Attributes:**
  - `sound`: `Audio.Sound` (Reference to the expo-av Sound object)
  - `isLoaded`: `boolean`

## State Changes

### `GameState` (Zustand Store Additions)
The current Zustand `useGameStore` already tracks `status: 'idle' | 'playing' | 'game_over'`.
The screens will react to this state:
- `idle` -> Render Home Screen
- `playing` -> Render Game Screen
- `game_over` -> Render Game Over Screen

No new global state variables are required for this phase. The UI completely relies on the existing state machine.
