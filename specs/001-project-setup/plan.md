# Implementation Plan: Project Setup

**Branch**: `001-game-foundation` | **Date**: 2026-05-30 | **Spec**: [spec.md](file:///Users/vinaysaichelupuri/Documents/projects/coffee-runner/specs/001-project-setup/spec.md)

**Input**: Feature specification from `/specs/001-project-setup/spec.md`

## Summary

This phase focuses on initializing the development environment, installing core runtime/development dependencies (Zustand, AsyncStorage, ESLint, Prettier), establishing the standardized folder structure, and verifying the application builds and compiles successfully on both iOS and Android platforms with zero type or lint errors.

## Technical Context

**Language/Version**: React Native 0.85.3 (Expo SDK ~56.0.7), React 19.2.3, TypeScript ~6.0.3, Node.js (v18+)

**Primary Dependencies**:
- `react-native-reanimated` 4.3.1 (already present)
- `react-native-gesture-handler` ~2.31.1 (already present)
- `zustand` ~5.0.14 (to be installed)
- `@react-native-async-storage/async-storage` ~2.2.0 (to be installed)
- `expo-router` ~56.2.8 (already present)
- `eslint` ^9.0.0 (installed during initialization)
- `eslint-config-expo` ~56.0.4 (installed during initialization)

**Storage**: AsyncStorage (`@react-native-async-storage/async-storage`) for high scores and user settings.

**Testing**: Jest + `jest-expo` + `@testing-library/react-native` (NEEDS CLARIFICATION: Verify if Jest and React Native Testing Library should be fully configured in Phase 0 or deferred to a later phase).

**Target Platform**: iOS 17+, Android API 34+ (via Expo Go / development builds).

**Project Type**: Mobile Application (Expo).

**Performance Goals**: 60 FPS gameplay, low UI-thread blockages, under 5 minutes developer onboarding and run time.

**Constraints**:
- Must compile and launch without native errors.
- TypeScript configurations must enable strict check options.
- No gaming engine (e.g. Unity, PixiJS); pure React Native layout components.

**Scale/Scope**: Single-player local 3-lane gameplay with local state/storage persistence.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **P1: Smooth Gameplay & Performance (60 FPS)**: Yes. Project setup configures React Native Reanimated and Gesture Handler which run on UI/native threads, minimizing bridge overhead.
- **P2: Decoupled Game Logic & UI**: Yes. The project folder structure establishes a dedicated `src/store/` (for Zustand) and `src/utils/` (for gameplay math / collision detection) to keep UI components presentational.
- **P3: Type-Safe, Reusable Components**: Yes. TypeScript ~6.0.3 is configured with strict checking, and we establish a `src/types/` directory to store interface definitions.
- **P4: Scalable & Extensible Architecture**: Yes. Modular layout components (lanes, player, obstacles) are structured in separate files and folders under `src/components/`.
- **P5: Comprehensive Testing Discipline**: Yes. We will resolve testing configuration during the research phase to ensure pure logic has unit test coverage from day one.

## Project Structure

### Documentation (this feature)

```text
specs/001-project-setup/
├── plan.md              # This file
├── research.md          # Phase 0 output (resolved clarifications)
├── data-model.md        # Phase 1 output (entities & configurations)
├── quickstart.md        # Phase 1 output (onboarding and run commands)
└── checklists/
    └── requirements.md  # Requirements verification checklist
```

### Source Code (repository root)

The folder layout complies with Section IV of the Coffee Runner Constitution:

```text
src/
├── app/                 # Expo Router file-based routing entrypoints (index, layout, etc.)
├── assets/              # Static game assets (images, fonts, audio)
├── components/          # Reusable UI/game components (Player, Obstacle, Lane, Road)
├── screens/             # Screen components (HomeScreen, GameScreen, GameOverScreen)
├── hooks/               # Custom hooks (e.g., swipe gesture hooks, loop timer hooks)
├── store/               # Zustand global state stores (gameStore)
├── utils/               # Pure functions (collision detection, random generators)
├── constants/           # Game configuration constants (lane widths, speeds, dimensions)
└── types/               # TypeScript type and interface declarations
```

**Structure Decision**: Selected Option 1 (Single Project) using the constitution folder structure, extending it to support `expo-router`'s `src/app/` folder.

## Complexity Tracking

*No violations of the Constitution identified.*
