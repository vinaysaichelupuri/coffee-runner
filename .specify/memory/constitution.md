<!--
Sync Impact Report:
- Version change: 0.0.0 -> 1.0.0 (Initial Ratification)
- List of modified principles:
  - [PRINCIPLE_1_NAME] -> I. Smooth Gameplay & Performance (60 FPS)
  - [PRINCIPLE_2_NAME] -> II. Decoupled Game Logic & UI (State Machine)
  - [PRINCIPLE_3_NAME] -> III. Type-Safe, Reusable Components
  - [PRINCIPLE_4_NAME] -> IV. Scalable & Extensible Architecture
  - [PRINCIPLE_5_NAME] -> V. Comprehensive Testing Discipline
- Added sections:
  - Technical & Performance Standards (replacing SECTION_2)
  - Development & Testing Workflow (replacing SECTION_3)
- Templates requiring updates:
  - Plan Template (.specify/templates/plan-template.md): ✅ updated
  - Tasks Template (.specify/templates/tasks-template.md): ✅ updated
  - Spec Template (.specify/templates/spec-template.md): ✅ updated
- Follow-up TODOs: None (all placeholders filled)
-->

# Coffee Runner Constitution

## Core Principles

### I. Smooth Gameplay & Performance (60 FPS)
The game MUST run at a consistent 60 FPS on modern mobile devices. Frame budgets are critical; developers MUST minimize JS thread usage by offloading animations and gestures to the native thread using React Native Reanimated and React Native Gesture Handler. Avoid deep component hierarchies and frequent React state re-renders in the core game loop. Assets (images, audio) MUST be preloaded and optimized.

### II. Decoupled Game Logic & UI (State Machine)
The game loop, physics/collision detection, and state machine MUST be completely decoupled from the rendering/UI components. The core game logic MUST be implemented as pure, platform-independent functions and state transitions, allowing it to be run, tested, and validated in isolation without mounting React components or depending on device UI loops.

### III. Type-Safe, Reusable Components
All game elements (Player, Obstacle, Lane, Cup, Scoreboard) MUST be written in strict TypeScript with explicit, strongly typed interfaces. Game elements MUST be implemented as highly reusable components, avoiding ad-hoc styling and direct inline logic. A clear hierarchy of components MUST be maintained.

### IV. Scalable & Extensible Architecture
The architecture MUST support future expansion (e.g., power-ups, character skins, new obstacle patterns, multiple themes) without modifying the core runner engine. Use a modular plugin or system-based pattern for game entities and state managers, enabling new gameplay features to be registered dynamically.

### V. Comprehensive Testing Discipline
Uncompromising test coverage is required. Pure logic, collision detection, and score calculations MUST have 100% unit test coverage. Critical user flows (e.g., swiping lanes, hit detection, game over states) MUST be covered by integration or component tests. Tests for new features MUST be defined and agreed upon in specifications before execution.

## Technical & Performance Standards
1. **Animation & Physics**: Use declarative React Native Reanimated animations where possible to keep interactions smooth on the UI thread. Use React Native Gesture Handler for swipe detection.
2. **Asset Management**: Compress all image/audio assets. Load critical game assets during a boot/loading sequence before starting the gameplay.
3. **Memory Management**: Avoid memory leaks in the game loop; clean up all active listeners, intervals, and animation frames on component unmount or when returning to main menus.

## Development & Testing Workflow
1. **Component Design**: Build UI components using the predefined design system (vibrant colors, clean HSL styling, and micro-animations). Use vanilla React Native StyleSheet for performance.
2. **PR Requirements**: Every pull request that introduces or modifies core logic must include tests that cover all edge cases (e.g., rapid consecutive swipes, simultaneous obstacle collisions, boundary lane transitions).
3. **Performance Auditing**: Profile app performance regularly. Any regression in average frame rate below 58 FPS on standard test configurations is a blocking issue.

## Governance
1. **Constitution Authority**: This constitution defines the core invariants for Coffee Runner. All feature specifications, design docs, and implementation tasks must comply.
2. **Amendments**: Amendments require a MINOR or MAJOR version bump. Proposed amendments must specify a clear migration plan for existing components.
3. **Compliance Reviews**: At each design gate (e.g. Plan Phase, Tasks Phase), the team must execute a 'Constitution Check' to verify alignment. Use [AGENTS.md](file:///Users/vinaysaichelupuri/Documents/projects/coffee-runner/AGENTS.md) to keep instructions and version requirements aligned for all developers.

**Version**: 1.0.0 | **Ratified**: 2026-05-29 | **Last Amended**: 2026-05-29
