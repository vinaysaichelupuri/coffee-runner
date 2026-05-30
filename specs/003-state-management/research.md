# Research: State Management

## Setup & Technologies

- **Decision**: Use Zustand for state management.
- **Rationale**: Zustand is extremely lightweight, fast, and removes the boilerplate associated with Redux or Context API. It perfectly aligns with the constitution's requirement for 60FPS performance and decoupled logic. It allows components to selectively subscribe to state slices, preventing unnecessary re-renders.
- **Alternatives considered**: 
  - *React Context*: Slower, causes widespread re-renders when state changes, which is detrimental to a 60FPS game loop.
  - *Redux*: Too heavy and boilerplate-heavy for a simple runner game.

## State Structure

- **Decision**: A single global store for core game loop state.
- **Rationale**: The data (score, speed, lane, status) is tightly coupled to the game loop. Having it in one store simplifies updates (e.g., updating score and speed together).
- **Alternatives considered**: Multiple separate stores. Rejected because it complicates cross-state logic (e.g., increasing speed based on score).
