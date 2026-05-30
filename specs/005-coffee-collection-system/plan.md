# Implementation Plan: Coffee Collection System

**Branch**: `005-coffee-collection-system` | **Date**: 2026-05-31 | **Spec**: [specs/005-coffee-collection-system/spec.md](file:///Users/vinaysaichelupuri/Documents/projects/coffee-runner/specs/005-coffee-collection-system/spec.md)

**Input**: Feature specification from `specs/005-coffee-collection-system/spec.md`

## Summary

Implement the Coffee Collection System where coffee cups randomly spawn and move downward on the screen. The feature utilizes React Native Reanimated to move the cups efficiently. Collision detection is optimized by tracking coordinates via `useAnimatedReaction` on the UI thread and updating the JS state only upon collection, which increments the player's score by 10 points.

## Technical Context

**Language/Version**: TypeScript

**Primary Dependencies**: React Native, Zustand, React Native Reanimated

**Storage**: Zustand (in-memory game state)

**Testing**: `@testing-library/react-native`, Jest

**Target Platform**: iOS, Android

**Project Type**: Mobile Application (Game)

**Performance Goals**: 60 FPS for obstacle and coffee cup animations, preventing JS thread blocks.

**Constraints**: Memory should remain stable without leaks during continuous coffee spawning and despawning.

**Scale/Scope**: End-to-end implementation of coffee cups (data model, store management, spawning logic, rendering, collision detection).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **P1: Smooth Gameplay & Performance (60 FPS)**: Yes, `Coffee` components will rely exclusively on Reanimated for their movement and use `useAnimatedReaction` to track collision overlap in a non-blocking manner.
- **P2: Decoupled Game Logic & UI**: Yes, coffee spawn and collect decisions reside in `useGameStore` and `useCoffeeSpawner`.
- **P3: Type-Safe, Reusable Components**: Yes, `Coffee` is a reusable, strongly-typed component based on the `Coffee` interface.
- **P4: Scalable & Extensible Architecture**: Yes, reusing the same entity/store design pattern previously introduced for obstacles.
- **P5: Comprehensive Testing Discipline**: Yes, game logic for the spawner and collection will be covered by strict unit tests.

## Project Structure

### Documentation (this feature)

```text
specs/005-coffee-collection-system/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── components/
│   └── Coffee.tsx
├── hooks/
│   └── useCoffeeSpawner.ts
├── store/
│   └── useGameStore.ts (update)
└── types/
    └── game.ts (update)
```

**Structure Decision**: Utilizing the existing single project structure, mapping new files naturally into the established layers (`components`, `hooks`, `store`, `types`).
