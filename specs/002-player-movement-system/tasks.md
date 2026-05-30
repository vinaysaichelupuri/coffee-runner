# Tasks: player-movement-system

**Input**: Design documents from `/specs/002-player-movement-system/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Verify project structure per implementation plan (setup was completed in Phase 0)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Create game constants for lane positions in src/constants/gameConstants.ts
- [x] T003 [P] Create base Zustand store for player in src/store/usePlayerStore.ts

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Swipe to change lanes (Priority: P1) 🎯 MVP

**Goal**: As a player, I want to swipe left and right on the screen so that the character moves between the three available lanes (left, center, right) to avoid obstacles and collect items.

**Independent Test**: Can be fully tested by swiping left and right on the screen and observing the character entity changing its lane position.

### Tests for User Story 1

- [x] T003.5 [P] [US1] Write unit tests for basic lane switching in tests/store/usePlayerStore.test.ts

### Implementation for User Story 1

- [x] T004 [US1] Implement moveLeft and moveRight actions in src/store/usePlayerStore.ts
- [x] T005 [P] [US1] Implement swipe detection in src/hooks/useSwipeGesture.ts
- [x] T006 [P] [US1] Create Player component in src/components/Player.tsx
- [x] T007 [US1] Integrate Player component with swipe gesture and store in src/components/Player.tsx

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Prevent invalid lane movement (Priority: P2)

**Goal**: As a player, I want the character to stay within the boundaries of the three lanes when I swipe outwards from the edge lanes, so that I don't go off-screen.

**Independent Test**: Can be tested by swiping left while in the leftmost lane, and verifying the character does not move further left.

### Tests for User Story 2

- [x] T008 [P] [US2] Write unit tests for lane boundary checks in tests/store/usePlayerStore.test.ts

### Implementation for User Story 2

- [x] T009 [US2] Add boundary checks to moveLeft and moveRight in src/store/usePlayerStore.ts

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Smooth movement animations (Priority: P3)

**Goal**: As a player, I want the character's movement between lanes to be smooth and animated rather than instantly teleporting, so that the game feels polished and responsive.

**Independent Test**: Can be tested visually by observing the character model transitioning smoothly over a short duration between lane coordinates.

### Implementation for User Story 3

- [x] T010 [P] [US3] Add isMoving state to src/store/usePlayerStore.ts
- [x] T011 [US3] Update Player component to use Reanimated useSharedValue and withTiming/withSpring in src/components/Player.tsx

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T012 Run quickstart.md validation manually

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed sequentially in priority order (US1 → US2 → US3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Extends US1 boundary logic
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Upgrades US1 visual rendering

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Store logic before UI components
- Story complete before moving to next priority

### Parallel Opportunities

- Store creation and game constants can be done in parallel
- Swipe hook and Player component scaffolding can be done in parallel
