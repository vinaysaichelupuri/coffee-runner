# Tasks: Project Setup

**Input**: Design documents from `/specs/001-project-setup/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/navigation-routes.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Paths shown below assume single project structure

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project configuration fixes and setup check

- [x] T001 [P] Fix React lifecycle hook sync rendering warning in `src/hooks/use-color-scheme.web.ts`
- [x] T002 [P] Configure global ESLint parameters in `eslint.config.js` to ensure clean run
- [x] T003 [P] Verify TypeScript compilation config file `tsconfig.json` contains proper module resolution path aliases

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Install packages needed for gameplay and unit testing infrastructure

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Install compatible dependency `zustand` (~5.0.14) and `@react-native-async-storage/async-storage` (~2.2.0) using Expo CLI in `package.json`
- [x] T005 Install development dependencies `jest` (29.7.0) and `jest-expo` (56.0.4) using Expo CLI in `package.json`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Barebones Application Launches on Devices (Priority: P1) 🎯 MVP

**Goal**: Compile and launch the boilerplate app on mobile targets.

**Independent Test**: Launch App via simulator/emulator; welcome screen loads without runtime/native errors.

### Implementation for User Story 1

- [x] T006 [US1] Run native iOS build simulation using script `npm run ios` and verify welcome page launches
- [x] T007 [US1] Run native Android build simulation using script `npm run android` and verify welcome page launches

**Checkpoint**: Welcome page renders on target platforms without native compilation errors.

---

## Phase 4: User Story 2 - Base Project Directory Structure and Configuration (Priority: P2)

**Goal**: Standardize directory layout under `src/` folder.

**Independent Test**: Check directories exist under `src/`.

### Implementation for User Story 2

- [x] T008 [P] [US2] Create directory `src/assets` and add a placeholder/README.md
- [x] T009 [P] [US2] Create directory `src/components` and add a placeholder/README.md
- [x] T010 [P] [US2] Create directory `src/screens` and add a placeholder/README.md
- [x] T011 [P] [US2] Create directory `src/hooks` and add a placeholder/README.md
- [x] T012 [P] [US2] Create directory `src/store` and add a placeholder/README.md
- [x] T013 [P] [US2] Create directory `src/utils` and add a placeholder/README.md
- [x] T014 [P] [US2] Create directory `src/constants` and add a placeholder/README.md
- [x] T015 [P] [US2] Create directory `src/types` and add a placeholder/README.md

**Checkpoint**: Directory structure matches Coffee Runner Constitution folder layout standards.

---

## Phase 5: User Story 3 - Core Global Libraries Initialized (Priority: P3)

**Goal**: Verify library configurations (Zustand, Reanimated, Gesture Handler, AsyncStorage, Jest) build and execute correctly.

**Independent Test**: Compile simple imports without errors; Jest test suite executes.

### Implementation for User Story 3

- [x] T016 [US3] Create demo/test Zustand store file in `src/store/gameStore.ts` to verify state initialization works
- [x] T017 [US3] Configure Jest test scripts and environment configs in `package.json`
- [x] T018 [US3] Create a sample React Native verification test using Jest in `src/__tests__/app.test.tsx` to verify component testing works

**Checkpoint**: Core libraries successfully imported and verified via automated build checks.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T019 Run full eslint audit using `npm run lint` and verify zero errors
- [x] T020 Run strict typechecking using `npx tsc --noEmit` and verify zero compilation errors
- [x] T021 Run Jest tests using `npm run test` and verify verification test suite succeeds
- [x] T022 Clean up placeholder/demo state code used for library verification in `src/store/gameStore.ts`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phases 3 to 5)**: All depend on Foundational phase completion
  - User Story 1 (P1) is the MVP launch criteria and must be completed first
  - User Story 2 (P2) and User Story 3 (P3) can run in parallel after US1 launch is verified
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2).
- **User Story 2 (P2)**: Can run in parallel with US1/US3 or after US1.
- **User Story 3 (P3)**: Depends on package installations in Phase 2.

### Parallel Opportunities

- All Setup tasks (T001, T002, T003) marked [P] can run in parallel.
- Directory creations in US2 (T008 to T015) are independent and can be run in parallel.
- Code quality checks in Polish (T019, T020) can run in parallel before final clean up.

---

## Parallel Example: User Story 2

```bash
# Developers can create multiple folders in parallel
Task: "Create directory src/assets and add a placeholder/README.md"
Task: "Create directory src/components and add a placeholder/README.md"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (blocking npm packages setup)
3. Complete Phase 3: User Story 1 (running simulator / build test)
4. **STOP and VALIDATE**: Verify empty app runs successfully on emulators
5. Proceed to UI layout and logic setups (US2 and US3)
