# Tasks: collision-detection

**Input**: Design documents from `/specs/006-collision-detection/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

*(No additional project setup required for this phase as it integrates into the existing loop)*

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T001 [P] Create BoundingBox interface and `isColliding` utility in `src/utils/collision.ts` (handling fractional mid-transition lanes)
- [x] T002 Create unit tests for `isColliding` logic in `src/utils/__tests__/collision.test.ts` (including mid-transition edge cases)

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Obstacle Collision Triggers Game Over (Priority: P1) 🎯 MVP

**Goal**: When the player hits an obstacle, the game immediately ends to provide the primary failure condition.

**Independent Test**: Can be fully tested by forcing an obstacle into the player's position and verifying the game state transitions to "Game Over".

### Implementation for User Story 1

- [x] T003 [P] [US1] Implement `handleObstacleCollision` or similar Game Over action in `src/store/gameStore.ts`
- [x] T004 [US1] Integrate obstacle collision detection into the main loop in `src/hooks/useGameLoop.ts`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Coffee Collection Increases Score (Priority: P2)

**Goal**: When the player navigates through a coffee cup, it is collected and points are awarded.

**Independent Test**: Can be fully tested by spawning a coffee cup at the player's position and verifying the score increments and cup disappears.

### Implementation for User Story 2

- [x] T005 [P] [US2] Implement `handleCoffeeCollision` action to increment score and remove coffee in `src/store/gameStore.ts`
- [x] T006 [US2] Integrate coffee collision detection into the main loop in `src/hooks/useGameLoop.ts`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T007 Code cleanup and refactoring in `src/hooks/useGameLoop.ts` and `src/utils/collision.ts`
- [x] T008 Run manual testing as per `quickstart.md` validation.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: N/A
- **Foundational (Phase 2)**: BLOCKS all user stories
- **User Stories (Phase 3+)**: Depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2). No dependencies on other stories.
- **User Story 2 (P2)**: Can start after Foundational (Phase 2). Should be independently testable.

### Parallel Opportunities

- Utility creation and tests (T001, T002) can be done together.
- Game store actions (T003, T005) can be added in parallel if desired.

---

## Parallel Example: Foundational & Integration

```bash
# Developer A implements collision utility and tests
Task: "Create BoundingBox interface and isColliding utility in src/utils/collision.ts"
Task: "Create unit tests for isColliding logic in src/utils/__tests__/collision.test.ts"

# Developer B sets up store actions
Task: "Implement handleObstacleCollision or similar Game Over action in src/store/gameStore.ts"
Task: "Implement handleCoffeeCollision action to increment score and remove coffee in src/store/gameStore.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
2. Complete Phase 3: User Story 1
3. **STOP and VALIDATE**: Test User Story 1 independently

### Incremental Delivery

1. Complete Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
