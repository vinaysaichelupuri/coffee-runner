# Data Model: Coffee Collection System

## Entities

### `Coffee`
Represents a collectible coffee cup on the track.
- **`id`** (`string`): Unique identifier for the coffee cup.
- **`lane`** (`Lane`): The lane where the coffee cup is spawned (-1, 0, or 1).
- **`active`** (`boolean`): Whether the coffee cup is currently active on the screen and collectible.

## State Management (`useGameStore`)

The existing game store will be extended to handle coffee cups.

### New State Properties
- **`coffees`** (`Coffee[]`): Array of active coffee cups currently on screen.

### New Actions
- **`addCoffee(coffee: Coffee)`**: Spawns a new coffee cup.
- **`removeCoffee(id: string)`**: Despawns a coffee cup (either collected or moved off-screen).
- **`clearCoffees()`**: Removes all coffee cups (useful for reset or game over).
- **`collectCoffee(id: string)`**: Triggers the collection logic, which increments `score` by 10 and calls `removeCoffee`.
