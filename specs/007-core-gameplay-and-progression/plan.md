# Implementation Plan: Core Gameplay & Progression

**Branch**: `007-core-gameplay-and-progression` | **Date**: 2026-05-31 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/007-core-gameplay-and-progression/spec.md`

## Summary

Build the complete gameplay engine that powers the endless runner experience, including a stable 60 FPS game loop, dynamic spawning, real-time collision detection, and difficulty progression scaling. 

## Technical Context

**Language/Version**: TypeScript

**Primary Dependencies**: React Native, React Native Reanimated, Zustand

**Storage**: AsyncStorage (N/A for core loop, but used for high score persistence)

**Testing**: Jest

**Target Platform**: iOS and Android

**Project Type**: Mobile Game

**Performance Goals**: 60 fps, jitter < 16ms

**Constraints**: Must not block the JS thread; animations and game loop should run on the UI thread where possible using Reanimated.

**Scale/Scope**: Real-time object tracking (up to ~20 objects active on screen at once).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **P1: Smooth Gameplay & Performance (60 FPS)**: Yes, the game loop will utilize Reanimated's `useFrameCallback` to run on the UI thread and ensure 60 FPS.
- **P2: Decoupled Game Logic & UI**: Yes, the collision detection and spawning logic will be decoupled from pure rendering components.
- **P3: Type-Safe, Reusable Components**: Yes, written in TypeScript.
- **P4: Scalable & Extensible Architecture**: Yes, difficulty progression and spawn rates are configured generically to allow future tweaking.
- **P5: Comprehensive Testing Discipline**: Yes, collision and difficulty scaling math will be heavily unit tested.

## Project Structure

### Documentation (this feature)

```text
specs/007-core-gameplay-and-progression/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (generated later)
```

### Source Code (repository root)

```text
src/
├── hooks/
│   ├── useGameLoop.ts
│   └── useDifficulty.ts
├── store/
│   └── useGameStore.ts
├── utils/
│   ├── collision.ts
│   └── spawner.ts
└── components/
    ├── Player.tsx
    ├── Obstacle.tsx
    └── Coffee.tsx
```

**Structure Decision**: Using the standard React Native single project layout defined in the Constitution, grouping by React concepts (hooks, store, components) and placing pure logic in `utils/`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

*No violations.*
