# Research Findings: Project Setup

This document consolidates research and design decisions for Phase 0 (Project Setup).

## 1. Testing Framework (Jest & jest-expo)

* **Decision**: Install `jest` (29.7.0), `jest-expo` (56.0.4), and `react-test-renderer` (19.2.3) as devDependencies. Configure them in `package.json` with the `jest-expo` preset.
* **Rationale**: `jest-expo` provides a pre-configured environment out-of-the-box optimized for Expo, handling Babel/TypeScript translation and mocking Expo-specific APIs automatically.
* **Alternatives Considered**: 
  - `ts-jest` directly (rejected because it lacks the built-in React Native/Expo mocks, which would lead to heavy configuration overhead and mock issues).

## 2. State Management (Zustand)

* **Decision**: Install `zustand` (~5.0.14) to handle global game states (score, speed, lane position, etc.).
* **Rationale**: Zustand is extremely lightweight, uses hooks, has zero boilerplate compared to Redux, and is the mandated state management solution in the Coffee Runner Constitution.
* **Alternatives Considered**: 
  - Redux Toolkit (rejected due to excess boilerplate and complexity for a simple arcade runner).
  - Context API (rejected because it can trigger unnecessary re-renders of the game loop/components when state updates frequently at high frame rates).

## 3. Persistent Storage (AsyncStorage)

* **Decision**: Install `@react-native-async-storage/async-storage` (2.2.0).
* **Rationale**: It is the standard persistent storage package recommended by Expo.
* **Alternatives Considered**: 
  - `expo-secure-store` (rejected because we only need to persist high scores and settings, which are not sensitive/private user data).

## 4. Linting and Code Quality (ESLint)

* **Decision**: Fix the active ESLint error in `src/hooks/use-color-scheme.web.ts` and set up standard formatting/lint rules.
* **Analysis of current lint error**:
  ```text
  /Users/vinaysaichelupuri/Documents/projects/coffee-runner/src/hooks/use-color-scheme.web.ts:11:5
  Avoid calling setState() directly within an effect
  ```
  The code is setting the hydrated state directly inside a `useEffect` layout block synchronously. To avoid this React 19 / ESLint warning, we should use a state transition or standard delayed execution, or simplify the hydration check to occur when mounting finishes or adjust how we set state.
* **Alternatives Considered**:
  - Disable the rule (rejected because proper state handling prevents infinite loop / rendering issues).
