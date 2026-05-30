---

description: "Task list for Obstacle System implementation"
---

# Tasks: Obstacle System

**Input**: Design documents from `/specs/004-obstacle-system/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

*(No additional project setup required as this is an incremental feature on the existing codebase)*

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T001 [P] Add `Obstacle` and related types in `src/types/game.ts`
- [X] T002 [P] Define `OBSTACLE_SPAWN_INTERVAL` and `OBSTACLE_SPEED` in `src/utils/constants.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Continuous Obstacle Generation (Priority: P1) 🎯 MVP

**Goal**: As a player, I want obstacles to appear automatically and move toward me so that I have a challenge to avoid.

**Independent Test**: Can be fully tested by starting the game loop and verifying obstacles spawn at random lanes and move down the screen.

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T003 [P] [US1] Create unit tests for obstacle state logic in `src/store/__tests__/useGameStore.test.ts`
- [X] T004 [P] [US1] Create unit tests for spawning and cleanup logic in `src/hooks/__tests__/useObstacleSpawner.test.ts`

### Implementation for User Story 1

- [X] T005 [US1] Update `src/store/useGameStore.ts` to manage obstacle state array (`obstacles`, `addObstacle`, `removeObstacle`, `clearObstacles`)
- [X] T006 [P] [US1] Create `src/components/Obstacle.tsx` with Reanimated movement logic based on state
- [X] T007 [US1] Create `src/hooks/useObstacleSpawner.ts` to handle periodic spawning and cleanup logic
- [X] T008 [US1] Integrate `useObstacleSpawner` and render the list of active `Obstacle` components in the main game screen

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T009 Code cleanup and verifying memory stability (no leaks during continuous spawning)
- [X] T010 Run quickstart.md validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: N/A
- **Foundational (Phase 2)**: BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories

### Within Each User Story

- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- Foundational tasks (T001, T002) can run in parallel
- Tests (T003, T004) can run in parallel
- T006 can be built in parallel with T005/T007 since the UI component can mock state for testing.

---

## Parallel Example: User Story 1

```bash
# Launch types and constants together:
Task: "Add Obstacle and related types in src/types/game.ts"
Task: "Define OBSTACLE_SPAWN_INTERVAL and OBSTACLE_SPEED in src/utils/constants.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
2. Complete Phase 3: User Story 1
3. **STOP and VALIDATE**: Test User Story 1 independently
4. Run quickstart.md checks
5. Deploy/demo if ready

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
