# Tasks: Core Gameplay & Progression

**Input**: Design documents from `specs/007-core-gameplay-and-progression/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/engine.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Exact file paths are included in descriptions.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Verify standard hooks and utils directories exist in `src/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Update `src/store/useGameStore.ts` with progression states (speed, baseSpeed, spawnInterval) and actions (setSpeed, setSpawnInterval)
- [x] T003 Create `src/constants/game.ts` to hold `DifficultyConfig` and game constants

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Continuous Gameplay Loop (Priority: P1) 🎯 MVP

**Goal**: Establish a stable 60 FPS update cycle running on the UI thread without freezing.

**Independent Test**: Verify that the game screen renders and updates without crashes when the loop is running.

### Implementation for User Story 1

- [x] T004 [US1] Create `src/hooks/useGameLoop.ts` using Reanimated `useFrameCallback` to manage a stable loop
- [x] T005 [US1] Update `src/app/index.tsx` (or main game component) to initialize and call `useGameLoop`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Dynamic Spawning System (Priority: P2)

**Goal**: Spawn obstacles and coffee cups automatically ahead of the player.

**Independent Test**: Verify that entities appear in random lanes at the configured interval.

### Implementation for User Story 2

- [x] T006 [P] [US2] Create `src/utils/spawner.ts` logic for calculating spawn times and lanes
- [x] T007 [US2] Integrate spawning into `src/hooks/useGameLoop.ts` to manage `entities` SharedValue
- [x] T008 [P] [US2] Update rendering in `src/components/Obstacle.tsx` and `src/components/Coffee.tsx` to render based on shared value arrays

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Real-time Collision Detection (Priority: P1)

**Goal**: Detect when the player hits an obstacle (Game Over) or a coffee cup (Score +).

**Independent Test**: Verify Game Over triggers on obstacle hit, and score increments on coffee collection.

### Implementation for User Story 3

- [x] T009 [P] [US3] Implement AABB collision check in `src/utils/collision.ts`
- [x] T010 [US3] Add collision detection check within `src/hooks/useGameLoop.ts` on every frame
- [x] T011 [US3] Increment score and remove entity in `src/hooks/useGameLoop.ts` when hitting coffee
- [x] T012 [US3] Trigger Game Over state in `src/store/useGameStore.ts` when hitting obstacles

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: User Story 4 - Difficulty Progression (Priority: P3)

**Goal**: Make the game progressively harder the longer the player survives.

**Independent Test**: Observe movement speed increase and spawn intervals decrease over >30s of play.

### Implementation for User Story 4

- [x] T013 [P] [US4] Create `src/hooks/useDifficulty.ts` hook to scale speed and spawn intervals over time
- [x] T014 [US4] Integrate `src/hooks/useDifficulty.ts` into the main game component `src/app/index.tsx` to adjust store state

**Checkpoint**: Difficulty progression active.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T015 Run manual validations defined in `specs/007-core-gameplay-and-progression/quickstart.md`
- [x] T016 Verify 60FPS using React Native performance monitor

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - Sequential execution recommended for MVP: US1 -> US2 -> US3 -> US4

### User Story Dependencies

- **User Story 1 (P1)**: Core loop required for everything else.
- **User Story 2 (P2)**: Requires Game Loop (US1).
- **User Story 3 (P1)**: Requires Spawning (US2).
- **User Story 4 (P3)**: Requires full loop and spawning (US1, US2).

### Parallel Opportunities

- T006 (Spawner logic), T008 (UI components), T009 (Collision math), and T013 (Difficulty hook) can be developed in parallel since they don't depend on the hook integrations directly.

## Implementation Strategy

### MVP First

1. Complete Phase 1 & 2
2. Complete Phase 3 (Game Loop)
3. Complete Phase 4 (Spawning)
4. Complete Phase 5 (Collision)
5. Test End-to-End Core Gameplay
