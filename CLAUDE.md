# CLAUDE.md — Voice Leading Fretboard

This file describes the codebase for AI assistants working in this repository.

## Project Overview

**Voice Leading Fretboard** is a React/TypeScript single-page application that visualizes guitar chord voice leading. It displays an interactive guitar fretboard where users can select chords (Dm, G, C), choose string sets and inversions, and see animated Bezier curves showing how individual notes move between chords (voice paths).

The app was refactored from a monolithic Vanilla JS implementation into a modular React + TypeScript architecture with a clear separation of concerns and comprehensive tests.

---

## Tech Stack

| Layer | Tool |
|---|---|
| UI Framework | React 18 |
| Language | TypeScript 5.5 (strict mode) |
| Build Tool | Vite 5 |
| Testing | Vitest + React Testing Library + jsdom |
| Styling | Plain CSS (global.css, no Tailwind/CSS Modules) |
| State | React Context API (no Redux/Zustand) |
| Package Manager | npm |

---

## Directory Structure

```
voice-leading-fretboard/
├── src/
│   ├── components/
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.tsx           # Container for all ChordModules
│   │   │   ├── ChordModule.tsx       # Per-chord controls (select + DPad)
│   │   │   ├── DPad.tsx              # Directional pad (↑↓←→) for relative navigation
│   │   │   └── DropdownControls.tsx  # String-set and inversion dropdowns
│   │   └── Fretboard/
│   │       ├── FretboardCanvas.tsx   # Root SVG canvas
│   │       ├── Grid.tsx              # Fret lines, string lines, inlay markers
│   │       ├── ChordShape.tsx        # Draggable note circles with labels
│   │       └── VoicePaths.tsx        # Animated Bezier curves between notes
│   ├── context/
│   │   └── FretboardContext.tsx      # Global state: chord positions, selections
│   ├── data/
│   │   ├── chordLibrary.ts           # Immutable chord data (3 chords × 4 sets × 3 inversions)
│   │   └── config.ts                 # Fretboard dimensions (strings, frets, spacing)
│   ├── hooks/
│   │   ├── useVoiceLeading.ts        # Convenience hook wrapping context for a chord
│   │   └── useDragInteraction.ts     # SVG drag-and-drop with grid snapping
│   ├── types/
│   │   └── index.ts                  # Shared interfaces: Note, ChordData, AppState
│   ├── utils/
│   │   └── geometry.ts               # Pure functions: getCoords(), calculatePath()
│   ├── styles/
│   │   └── global.css                # All styles (~60 lines, Google Material palette)
│   ├── App.tsx                       # Root layout: FretboardProvider + Sidebar + Canvas
│   └── main.tsx                      # React entry point (mounts to #root)
├── tests/
│   ├── unit/
│   │   ├── geometry.test.ts          # Tests for pure geometry utilities
│   │   └── state.test.ts             # Tests for context actions and state boundaries
│   └── components/
│       └── Fretboard.test.tsx        # Integration tests for rendered components
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── agent.md                          # Original refactoring design document
└── deploy.md                         # GitHub Pages deployment guide
```

---

## Development Commands

```bash
npm run dev          # Start Vite dev server (hot reload)
npm run build        # Type-check (tsc -b) then produce production build
npm run preview      # Serve the production build locally
npm run test         # Run all tests once (vitest run)
npm run test:watch   # Run tests in watch mode
```

**Always run `npm run build` before committing** to catch type errors that tests may not surface.

---

## Architecture & Key Conventions

### State Management

State lives entirely in `FretboardContext.tsx` via React Context. The `AppState` shape is:

```typescript
{
  order: ['dm', 'g', 'c'],       // Fixed chord progression order
  currentChordId: string,        // Which chord is selected in the sidebar
  previousChordId: string | null,// For voice path rendering
  chords: {
    [chordId]: { set: number, inv: number }
  }
}
```

**Context actions** (dispatch via `useFretboard()` hook):
- `selectChord(chordId)` — sets current/previous chord IDs
- `moveRelative(chordId, dSet, dInv)` — adjusts set/inversion by delta; boundaries: set 0–3, inv 0–2
- `setAbsolute(chordId, newSet, newInv)` — direct absolute positioning from dropdowns
- `getNotes(chordId)` — returns `Note[]` from the chord library

**Do not** add new global state outside this context. Prefer local `useState` for ephemeral UI state (e.g., hover, drag in-progress).

### Chord Library (Immutable Data)

`src/data/chordLibrary.ts` contains manually calculated note positions for:
- **3 chords**: Dm, G, C
- **4 string sets** per chord: different string groupings across the fretboard
- **3 inversions** per set: root, first inversion, second inversion

This data must remain musically accurate. Do not auto-generate or algorithmically compute it — treat it as a fixed dataset. If adding new chords, follow the exact same `ChordData` shape defined in `types/index.ts`.

### Geometry Utilities

`src/utils/geometry.ts` contains only pure functions with no side effects:
- `getCoords(fret, string, config)` — converts fret/string indices to SVG pixel coordinates
- `calculatePath(fromNote, toNote, config)` — produces an SVG `d` attribute string using quadratic Bezier curves

These functions are unit-tested exhaustively. Keep them pure and add tests for any new geometry functions.

### Component Conventions

- **SVG rendering**: The fretboard is rendered as a single SVG. Components that render SVG elements (`Grid`, `ChordShape`, `VoicePaths`) return SVG-compatible JSX, not HTML elements.
- **Drag interaction**: `useDragInteraction` handles pointer events and snaps released notes to the nearest string. Grid snapping uses `config.stringSpacing` from `data/config.ts`.
- **ChordShape is draggable** — do not add `onClick` handlers to note circles that would conflict with drag detection.
- **No CSS Modules or utility frameworks**: All styles go in `src/styles/global.css` using plain class selectors.

### TypeScript Conventions

- Strict mode is enabled (`noImplicitAny`, `strictNullChecks`, etc.)
- `noUnusedLocals` and `noUnusedParameters` are enforced — do not leave dead code
- All shared types live in `src/types/index.ts`
- Prefer `interface` over `type` for object shapes

---

## Testing Conventions

Tests live in `tests/` mirroring `src/`:
- `tests/unit/` — pure function and hook tests
- `tests/components/` — component rendering and event tests

**Patterns used**:

```typescript
// Hook testing with context
import { renderHook, act } from '@testing-library/react';
renderHook(() => useFretboard(), { wrapper: FretboardProvider });

// State updates require act()
act(() => { result.current.dispatch(...) });

// SVG queries use querySelector (Testing Library doesn't handle SVG roles)
container.querySelector('circle');
container.querySelector('[data-testid="fretboard-canvas"]');
```

**Write tests for**:
1. Any new pure utility functions (unit tests)
2. Any new context actions (state tests)
3. Any new interactive component behavior (component tests)

Run `npm run test` and ensure all tests pass before committing.

---

## Fretboard Configuration

Constants in `src/data/config.ts`:

| Constant | Value | Meaning |
|---|---|---|
| `NUM_STRINGS` | 6 | Guitar strings (1=high e, 6=low E) |
| `NUM_FRETS` | 14 | Frets displayed |
| `FRET_SPACING` | 40px | Horizontal distance between frets |
| `STRING_SPACING` | 40px | Vertical distance between strings |

Inlay markers appear at frets 3, 5, 7, 9, and 12 (standard guitar positions).

---

## Styling Guide

Color palette (defined in `global.css`):

| Use | Value |
|---|---|
| Primary blue | `#1a73e8` |
| Leading tone (unresolved) | `#d93025` (red) |
| Resolved tone | `#188038` (green) |
| Text | `#202124` |
| Border/divider | `#dadce0` |
| Background | `#f8f9fa` |

- Sidebar is fixed at **360px** width
- Active chord module gets a blue border + light blue background + box shadow
- Voice paths are rendered as **3px dashed** SVG strokes with a 20s looping dash animation
- Note circles are **16px** radius with white labels

---

## Git Workflow

- **Default branch**: `main` (also has `master` remote)
- **Feature branches**: prefix with `claude/` for AI-generated branches
- Run `npm run build` and `npm run test` before committing

```bash
git checkout -b claude/<feature-name>
# make changes
npm run build && npm run test
git add <files>
git commit -m "descriptive message"
git push -u origin claude/<feature-name>
```

---

## Files to Know First

When starting any task, read these files to build context quickly:

1. `src/types/index.ts` — all shared TypeScript interfaces
2. `src/data/config.ts` — fretboard constants
3. `src/context/FretboardContext.tsx` — global state shape and actions
4. `src/data/chordLibrary.ts` — music theory data (do not modify lightly)
5. `src/utils/geometry.ts` — coordinate math

---

## Out of Scope / Do Not Change

- **chordLibrary.ts**: Music data is hand-calculated. Do not auto-generate or algorithmically alter chord positions without explicit instruction.
- **TypeScript strict mode**: Do not disable or loosen any `tsconfig.json` strict settings.
- **Global CSS**: Do not introduce CSS-in-JS, CSS Modules, or Tailwind unless explicitly requested.
- **State management library**: Do not add Redux, Zustand, or similar — the app intentionally uses React Context.
