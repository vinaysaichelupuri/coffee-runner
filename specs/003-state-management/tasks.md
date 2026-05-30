# Tasks: State Management

**Input**: Design documents from `/specs/003-state-management/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create store directory structure `src/store/` and `src/store/__tests__/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Define `GameState` TypeScript interface (score, highScore, speed, activeLane, status) and actions in `src/store/useGameStore.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Centralized Game State (Priority: P1) 🎯 MVP

**Goal**: As the game system, I need a centralized way to manage and access the current score, high score, speed, active lane, and game status, so that all game components can stay synchronized.

**Independent Test**: Can be tested by dispatching state updates and verifying that the stored values reflect the changes accurately via unit tests.

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T003 [P] [US1] Setup unit test suite for state updates and bounds validation in `src/store/__tests__/useGameStore.test.ts`

### Implementation for User Story 1

- [x] T004 [US1] Implement Zustand store creation with initial state (score: 0, highScore: 0, speed: 1, activeLane: 1, status: 'idle') in `src/store/useGameStore.ts`
- [x] T005 [US1] Implement basic setters (`setScore`, `setHighScore`, `setSpeed`, `setStatus`) in `src/store/useGameStore.ts`
- [x] T006 [US1] Implement `setActiveLane` with validation logic (must be 0, 1, or 2) in `src/store/useGameStore.ts`
- [x] T007 [US1] Implement `resetGame` action to reset properties to initial state in `src/store/useGameStore.ts`
- [x] T008 [US1] Implement test cases to pass unit tests in `src/store/__tests__/useGameStore.test.ts`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T009 Code cleanup and run TypeScript linting for `src/store/useGameStore.ts`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Story complete before moving to next priority

### Parallel Opportunities

- Tests creation (T003) and Interface definition (T002) can run in parallel.

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
