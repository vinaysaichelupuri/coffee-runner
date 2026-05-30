---

description: "Task list for Coffee Collection System implementation"
---

# Tasks: Coffee Collection System

**Input**: Design documents from `/specs/005-coffee-collection-system/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

*(No setup tasks needed as this is an incremental feature built on the existing structure)*

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core data models and state management that MUST be complete before user stories can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T001 Update `Coffee` entity type definition in `src/types/game.ts`
- [X] T002 Implement unit tests for coffee state management in `src/store/__tests__/useGameStore.test.ts`
- [X] T003 Update `useGameStore` with `coffees` array and actions (`addCoffee`, `removeCoffee`, `clearCoffees`, `collectCoffee`) in `src/store/useGameStore.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Continuous Coffee Spawning (Priority: P1) 🎯 MVP

**Goal**: As a player, I want coffee cups to appear automatically and move toward me so that I have items to collect.

**Independent Test**: Can be fully tested by starting the game loop and verifying coffee cups spawn at random lanes and move down the screen.

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T004 [P] [US1] Unit test for `useCoffeeSpawner` interval logic and lane overlap checks in `src/hooks/__tests__/useCoffeeSpawner.test.ts`

### Implementation for User Story 1

- [X] T005 [P] [US1] Create the `useCoffeeSpawner` hook in `src/hooks/useCoffeeSpawner.ts` to randomly spawn coffee cups over time
- [X] T006 [P] [US1] Create the `Coffee` UI component leveraging Reanimated for movement in `src/components/Coffee.tsx`
- [X] T007 [US1] Integrate `useCoffeeSpawner` and render the list of `Coffee` components inside `src/screens/GameScreen.tsx`

**Checkpoint**: At this point, User Story 1 should be fully functional with cups spawning and moving

---

## Phase 4: User Story 2 - Coffee Collection and Scoring (Priority: P1)

**Goal**: As a player, I want to collect coffee cups by colliding with them and see my score increase so that I am rewarded for playing well.

**Independent Test**: Can be fully tested by placing a coffee cup in the player's path and verifying the score increases upon collision and the cup disappears.

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [X] T008 [P] [US2] Update store tests to verify `collectCoffee` increments the score correctly in `src/store/__tests__/useGameStore.test.ts`

### Implementation for User Story 2

- [X] T009 [US2] Add collision detection logic inside `Coffee` component using `useAnimatedReaction` to check overlap with player lane/Y-position in `src/components/Coffee.tsx`
- [X] T010 [US2] Use `runOnJS` to trigger `collectCoffee` action when collision occurs in `src/components/Coffee.tsx`

**Checkpoint**: Both User Stories should now work independently, delivering the full feature

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T011 Run manual tests according to `quickstart.md`
- [X] T012 Run Jest test suite to ensure all new and existing tests pass

---

## Dependencies & Execution Order

### Phase Dependencies

- **Foundational (Phase 2)**: BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - Proceed sequentially: US1 → US2

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2).
- **User Story 2 (P1)**: Integrates directly into US1's `Coffee` component, so depends on US1 being complete.

### Parallel Opportunities

- Tests and implementations marked with `[P]` within a Phase can be worked on concurrently if multiple resources are available.

## Implementation Strategy

### Incremental Delivery

1. Complete Foundational (Types and Store).
2. Complete US1 (Cups spawn and move). Visually verify.
3. Complete US2 (Collision detection). Verify score updates.
