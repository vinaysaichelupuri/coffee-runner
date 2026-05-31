# Feature Specification: collision-detection

**Feature Branch**: `006-collision-detection`

**Created**: 2026-05-31

**Status**: Draft

**Input**: User description: "create the spec for @[docs/implementation-plan.md] phase-6"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Obstacle Collision Triggers Game Over (Priority: P1)

When the player is navigating the lanes and fails to dodge an obstacle, colliding with it should immediately end the current run.

**Why this priority**: Avoiding obstacles is the primary challenge and core mechanic of the game. Without game over on collision, there is no failure state.

**Independent Test**: Can be fully tested by forcing an obstacle into the player's position and verifying the game state transitions to "Game Over".

**Acceptance Scenarios**:

1. **Given** the player is active in a specific lane, **When** an obstacle moves into the exact same spatial bounds as the player, **Then** the game immediately transitions to a "Game Over" state.
2. **Given** the player is transitioning between lanes, **When** they overlap with an obstacle's bounding box during the transition, **Then** the game immediately transitions to a "Game Over" state.

---

### User Story 2 - Coffee Collection Increases Score (Priority: P2)

When the player successfully navigates their character through a coffee cup, it should be "collected" and reward the player with points.

**Why this priority**: This represents the reward system and gives players a secondary objective beyond just surviving, encouraging risk-taking.

**Independent Test**: Can be fully tested by spawning a coffee cup at the player's position and verifying the score increments.

**Acceptance Scenarios**:

1. **Given** the player is active in a specific lane, **When** a coffee cup moves into the exact same spatial bounds as the player, **Then** the coffee cup is removed from the screen and the score increments.

### Edge Cases

- What happens when the player collides with a coffee cup and an obstacle at the exact same time?
- How does the system handle collisions when the game is paused?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST implement a reliable spatial overlap detection mechanism between the player and other game entities (obstacles, coffee).
- **FR-002**: System MUST accurately detect collisions when the player and entity are in the same lane.
- **FR-003**: System MUST accurately detect collisions when the player is mid-transition between lanes.
- **FR-004**: System MUST trigger the "Game Over" state immediately upon player-obstacle collision.
- **FR-005**: System MUST trigger a collection event upon player-coffee collision.
- **FR-006**: System MUST increment the game score and remove the coffee entity from active play upon a collection event.

### Key Entities

- **Player Bounding Box**: Spatial representation of the player character used for collision testing.
- **Obstacle Bounding Box**: Spatial representation of hazards that end the game.
- **Coffee Bounding Box**: Spatial representation of collectible items.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of visible overlaps between player and obstacles result in a Game Over state.
- **SC-002**: 100% of visible overlaps between player and coffee cups result in a collection event.
- **SC-003**: Collision detection logic executes efficiently enough to maintain smooth 60FPS gameplay.

## Assumptions

- Entity positions and dimensions are clearly defined within the state management system.
- The game loop updates frequently enough that entities do not "tunnel" through each other between frames.
- A basic bounding-box or radius-based collision check is sufficient given the lane-based nature of the game.
