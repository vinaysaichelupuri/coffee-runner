# Coffee Runner Quickstart

This document contains commands to set up the development environment, build the project, and run quality verification checks.

## Onboarding and Installation

1. **Install Node.js Dependencies**:
   ```bash
   npm install
   ```

2. **Install Core Features Dependencies (Zustand & AsyncStorage)**:
   ```bash
   npx expo install @react-native-async-storage/async-storage zustand
   ```

3. **Install Unit Testing dependencies (Jest)**:
   ```bash
   npx expo install jest-expo jest -- --save-dev
   ```

## Running the Application

* **Start the development packager**:
   ```bash
   npm run start
   ```
* **Launch on iOS Simulator**:
   ```bash
   npm run ios
   ```
* **Launch on Android Emulator**:
   ```bash
   npm run android
   ```
* **Launch on Web (Browser fallback)**:
   ```bash
   npm run web
   ```

## Code Quality Verification

* **Execute TypeScript Compile Type-checking**:
   ```bash
   npx tsc --noEmit
   ```
* **Execute ESLint Check**:
   ```bash
   npm run lint
   ```
* **Execute Jest Unit Tests**:
   ```bash
   npm run test
   ```
