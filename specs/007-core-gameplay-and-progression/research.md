# Research & Decisions: Core Gameplay & Progression

## 1. Game Loop Implementation

**Decision**: Use React Native Reanimated's `useFrameCallback` instead of `requestAnimationFrame`.

**Rationale**: `requestAnimationFrame` runs on the JavaScript thread, which can easily drop frames if the React Native bridge is busy or JS is executing heavy operations. `useFrameCallback` runs directly on the UI thread, providing a much more stable 60 FPS loop, critical for endless runners and accurate collision detection.

**Alternatives considered**: 
- `requestAnimationFrame`: Rejected due to JS thread blocking risks.
- React Native Game Engine library: Rejected per Constitution (No game engine).

## 2. Collision Detection Processing

**Decision**: Perform AABB (Axis-Aligned Bounding Box) collision checks inside the `useFrameCallback` loop using shared values.

**Rationale**: We can track the positions of the player and all obstacles/coffee cups using Reanimated Shared Values. The hitboxes will be simple rectangles. Checking intersections in the UI thread every frame ensures we don't miss collisions (tunneling) at high speeds, and keeps the JS thread unblocked.

**Alternatives considered**: 
- Sending positions to JS thread via `runOnJS` for collision checks: Rejected because the delay could cause missed collisions.

## 3. Difficulty Scaling

**Decision**: Use a combination of a time-based multiplier in the game loop and Zustand state to track global speed and spawn intervals.

**Rationale**: The base speed will be stored in Zustand, but Reanimated shared values will be used for the actual per-frame calculations to ensure smooth animation. As time progresses, a `useEffect` or `setInterval` will update the base speed and spawn rate in the Zustand store, which then pushes the updated shared values to the UI thread.

**Alternatives considered**: 
- Incrementing speed directly in the UI thread: Feasible, but makes it harder for the JS thread (UI like Score/Speed display) to read the exact current difficulty without frequent bridge callbacks.
