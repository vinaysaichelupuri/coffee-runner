# Research: Collision Detection

## Collision Algorithm

- **Decision**: Axis-Aligned Bounding Box (AABB) intersection checking with lane awareness.
- **Rationale**: The game is fundamentally a 3-lane runner. Instead of full 2D collision detection which is computationally heavier, we can first check if two entities are in the same lane. If they are, we check if their Y-coordinate bounds overlap. This is extremely fast and ensures we can meet our <1ms per frame execution target easily.
- **Alternatives considered**: 
  - Perfect 2D pixel collision (too slow, overkill for this visual style).
  - Circle-based intersection (not suitable as our lanes and objects are roughly rectangular bounds).

## React Native Performance

- **Decision**: Perform checks in pure TypeScript functions invoked from the game loop, decoupled from React state or rendering until a collision actually occurs.
- **Rationale**: Triggering a React re-render 60 times a second just to evaluate positions would cause severe stuttering. We keep the running positions in our existing game loop/store and check mathematically. React only updates state when a collision triggers a Game Over or Score Update.
- **Alternatives considered**: Using `onLayout` or checking DOM node references (unreliable and slow in React Native).
