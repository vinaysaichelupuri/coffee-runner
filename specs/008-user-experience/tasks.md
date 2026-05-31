# Tasks: User Experience & Visual Feedback

**Input**: Design documents from `/specs/008-user-experience/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Install `expo-av` dependency for audio playback
- [x] T002 Create dummy audio files in `assets/sounds/` (e.g., `coffee.mp3`, `crash.mp3`, `click.mp3`) using `generate_image` or basic file creation scripts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

*(No foundational tasks required beyond existing Phase 7 game loop architecture).*

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - App Navigation (Priority: P1) 🎯 MVP

**Goal**: Users can navigate seamlessly between Home Screen, Gameplay, and Game Over Screen.

**Independent Test**: Start the app, press Play, lose the game, and press Restart to verify all screens transition smoothly without restarting the entire app.

### Implementation for User Story 1

- [x] T003 [P] [US1] Create `src/components/HomeOverlay.tsx` to render the Title, High Score, and Play Button.
- [x] T004 [P] [US1] Create `src/components/GameOverOverlay.tsx` to render the Game Over screen with Final Score, High Score, and Restart Button.
- [x] T005 [US1] Update `src/screens/GameScreen.tsx` to conditionally render `HomeOverlay` and `GameOverOverlay` based on `status` from `useGameStore`.
- [x] T006 [US1] Ensure `resetGame` logic triggers correctly from the Game Over screen button to restart the loop.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Visual Motion (Priority: P2)

**Goal**: Users perceive continuous forward movement through a scrolling road effect.

**Independent Test**: During gameplay, observe the background moving downward constantly, matching the perceived speed of the game.

### Implementation for User Story 2

- [x] T007 [US2] Create `src/components/Background.tsx` using `react-native-reanimated` that reads `globalDistance` and translates a repeating visual tile downwards.
- [x] T008 [US2] Integrate `Background` into `src/screens/GameScreen.tsx` behind the gameplay layer.

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Audio Feedback (Priority: P3)

**Goal**: Users receive auditory confirmation for interactions and key gameplay events.

**Independent Test**: Play the game with sound enabled and perform actions to trigger sounds reliably.

### Implementation for User Story 3

- [x] T009 [P] [US3] Create `src/hooks/useAudio.ts` to preload and expose playback functions (`playClick`, `playCoffee`, `playCrash`) using `expo-av`.
- [x] T010 [US3] Integrate `useAudio` into `src/hooks/useGameLoop.ts` to trigger `playCoffee` and `playCrash` on respective collisions.
- [x] T011 [US3] Integrate `useAudio` into UI components (`HomeOverlay.tsx`, `GameOverOverlay.tsx`) to trigger `playClick` on button presses.

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T012 Run `quickstart.md` validation to ensure all end-to-end flows work with audio and animations on Android/iOS.
- [x] T013 Optimize Reanimated background tiles to ensure steady 60fps on low-end devices.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can proceed sequentially in priority order (P1 → P2 → P3) or in parallel.
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### Parallel Opportunities

- The creation of Overlay UI components (T003, T004) can be done in parallel.
- Audio Hook development (T009) can run in parallel with Visual Motion (T007).

---

## Implementation Strategy

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories
