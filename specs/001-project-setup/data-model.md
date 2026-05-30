# Data Model and Configuration Schema

For the Project Setup phase, our data models are configuration schemas and manifests that define the application's runtime structure.

## 1. App Configuration (`app.json`)

Defines the Expo build and configuration options.

| Field | Type | Description |
|---|---|---|
| `name` | String | User-facing display name of the application (`Coffee Runner`). |
| `slug` | String | URL-friendly name for Expo publishing (`coffee-runner`). |
| `version` | String | Application version (`1.0.0`). |
| `orientation` | String | Locked screen orientation (`portrait` as per endless runner standards). |
| `icon` | String | Path to application icon. |
| `userInterfaceStyle` | String | Supported system theme (`automatic` / `dark`). |
| `splash` | Object | Splash screen configuration (background color, image path). |
| `ios` | Object | iOS bundle and target settings (e.g., `supportsTablet: false`). |
| `android` | Object | Android package name and configuration. |

## 2. Dependency Registry (`package.json`)

Identifies package requirements and build/lint scripts.

### Build and Launch Scripts
* `npm run start`: Runs Expo packager.
* `npm run lint`: Performs ESLint check.
* `npm run test`: Executes Jest test suite (to be added in setup tasks).
* `npm run tsc`: Executes TypeScript type check.

### Installed Dependencies
* `zustand`: State management store.
* `@react-native-async-storage/async-storage`: Persistent score storage.
* `jest` & `jest-expo`: Unit testing framework and Expo mock environment.
