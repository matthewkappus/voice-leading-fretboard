
System Objective:
Refactor a monolithic Vanilla JS/HTML/CSS single-page application (an Interactive Voice Leading Guitar Fretboard) into a modular, strictly typed, and fully testable React + TypeScript application using Vite.
Core Directives:
 * Preserve the Logic: The ChordLibrary data matrix contains manually calculated music theory intervals. Do not alter the data structures or values within this library. 2.  Separate Concerns: Strictly separate the UI controls (Sidebar/Buttons), the State Management, the Mathematical Logic (SVG coordinates/drag math), and the Rendering layer (SVG shapes).
 * Ensure Testability: Extract all coordinate math and state transitions into pure functions so they can be tested independently of the DOM.
 * Preserve the Styling: Maintain the exact CSS look and feel of the original application.
📂 Target File Tree Architecture
Please build the application matching this exact directory structure:
/
├── public/
├── src/
│   ├── components/
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.tsx           # Container for the modules
│   │   │   ├── ChordModule.tsx       # Individual chord card (Dm, G, C)
│   │   │   ├── DropdownControls.tsx  # String Set and Inversion selects
│   │   │   └── DPad.tsx              # Directional pad controls
│   │   ├── Fretboard/
│   │   │   ├── FretboardCanvas.tsx   # Main SVG container
│   │   │   ├── Grid.tsx              # Renders strings, frets, and markers
│   │   │   ├── VoicePaths.tsx        # Renders the curved dashed lines
│   │   │   └── ChordShape.tsx        # Renders notes and handles drag events
│   ├── context/
│   │   └── FretboardContext.tsx      # Global state for current/previous chords & positions
│   ├── data/
│   │   ├── chordLibrary.ts           # The raw music theory matrix (DO NOT ALTER)
│   │   └── config.ts                 # Fretboard dimensions (strings, spacing, offsets)
│   ├── hooks/
│   │   ├── useDragInteraction.ts     # Custom hook for SVG drag-and-drop logic
│   │   └── useVoiceLeading.ts        # Custom hook for state transitions (dSet, dInv)
│   ├── types/
│   │   └── index.ts                  # Shared TypeScript interfaces (Note, Chord, State)
│   ├── utils/
│   │   └── geometry.ts               # Pure functions: getCoords(), calculateCurve()
│   ├── App.tsx                       # Main layout (Sidebar + Main Content)
│   ├── main.tsx                      # React root
│   └── styles/
│       └── global.css                # Ported CSS from original HTML
├── tests/
│   ├── unit/
│   │   ├── geometry.test.ts          # Tests coordinate calculations
│   │   └── state.test.ts             # Tests boundaries of dSet/dInv movements
│   └── components/
│       └── Fretboard.test.tsx        # Tests rendering and drag event firing
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts

🛠️ Step-by-Step Execution Plan
Step 1: Type Definitions (src/types/index.ts)
 * Create interfaces for Note ({ s: number, f: number, n: string, id: string, lead?: boolean, res?: boolean }).
 * Create interfaces for the ChordLibrary matrix.
 * Create the AppState interface to track currentChordId, previousChordId, and the specific set (0-3) and inv (0-2) of each chord.
Step 2: Data & Config Extraction (src/data/)
 * Migrate Config into config.ts.
 * Migrate ChordLibrary strictly as-is into chordLibrary.ts and apply the new TypeScript types.
Step 3: Utility Functions (src/utils/geometry.ts)
 * Extract the getCoords(string, fret) logic into a pure function.
 * Extract the path curve calculation (the math generating the Q bezier curve) into a pure function: calculatePath(startCoords, endCoords, isLeadingTone).
Step 4: State Management (src/context/FretboardContext.tsx)
 * Set up a React Context provider or Zustand store to hold the application state.
 * Implement the moveRelative(chordId, dSet, dInv) logic. Ensure bounds checking prevents set from dropping below 0 or above 3, and inv from dropping below 0 or above 2.
Step 5: Interactive Hooks (src/hooks/useDragInteraction.ts)
 * Convert the vanilla JS drag logic into a React Hook.
 * It should track isDragging, startX/Y, and currentX/Y.
 * On mouseUp, it must calculate the grid snap (Math.round(currentY / Config.stringSpacing)) and dispatch the moveRelative action to the Context.
Step 6: UI Component Implementation (src/components/)
 * Sidebar: Pass down the active state from Context to ChordModule.
 * D-Pad: Map the arrow buttons to dispatch moveRelative. Apply disabled states dynamically based on the current set and inv values.
 * Fretboard Canvas: Map over the Context state to render the active ChordShape and any VoicePaths connecting the previous chord to the current one. Use SVG transform attributes to handle the visual dragging offset in real-time.
Step 7: Testing Setup
 * Install Vitest and React Testing Library.
 * Write unit tests for geometry.ts to ensure getCoords returns accurate x,y pixel values.
 * Write unit tests ensuring the D-Pad boundaries work (e.g., calling moveRelative('dm', -1, 0) when set === 0 should not change the state).
