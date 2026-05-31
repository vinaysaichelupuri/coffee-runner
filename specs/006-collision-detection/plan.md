# Implementation Plan: collision-detection

**Branch**: `006-collision-detection` | **Date**: 2026-05-31 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/006-collision-detection/spec.md`

## Summary

Implement reliable, decoupled collision detection between the player and obstacles/coffee cups, triggering game over on obstacle collision and score increase on coffee collection. Axis-Aligned Bounding Box (AABB) intersection check will be used for efficient 60 FPS performance.

## Technical Context

**Language/Version**: TypeScript / React Native
**Primary Dependencies**: React Native, Zustand
**Storage**: N/A
**Testing**: Jest
**Target Platform**: iOS / Android
**Project Type**: Mobile Game App
**Performance Goals**: Collision logic executes in < 1ms per frame (60 FPS)
**Constraints**: Pure logic functions, decoupled from UI rendering
**Scale/Scope**: Local game state, 3 entity types

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **P1: Smooth Gameplay & Performance (60 FPS)**: YES. Uses lightweight AABB collision logic.
- **P2: Decoupled Game Logic & UI**: YES. Handled via pure functions and Zustand.
- **P3: Type-Safe, Reusable Components**: YES. Strict types for bounding boxes.
- **P4: Scalable & Extensible Architecture**: YES. Can easily add new entities.
- **P5: Comprehensive Testing Discipline**: YES. Tests will be added for AABB intersection.

## Project Structure

### Documentation (this feature)

```text
specs/006-collision-detection/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── utils/
│   └── collision.ts       # Collision logic (AABB intersection)
├── store/
│   └── gameStore.ts       # Zustand store updates
└── hooks/
    └── useGameLoop.ts     # Loop calling collision checks
```

**Structure Decision**: Decoupled utilities format, isolating logic in pure functions inside the `utils` directory.

## Complexity Tracking

No violations found.
