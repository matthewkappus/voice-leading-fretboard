export interface Note {
    s: number;    // string
    f: number;    // fret
    n: string;    // note name
    id: string;   // vertex id
    lead?: boolean; // leading tone
    res?: boolean;  // resolved tone
}

export type ChordMatrixPosition = Note[];
export type ChordMatrixInversions = ChordMatrixPosition[]; // The different inversions for a string set
export type ChordMatrixSets = ChordMatrixInversions[]; // The 4 string sets

export interface ChordData {
    name: string;
    matrix: ChordMatrixSets;
}

export interface AppState {
    order: string[];
    currentChordId: string;
    previousChordId: string | null;
    chords: {
        [chordId: string]: {
            set: number;
            inv: number;
        };
    };
}

export interface DragInteractionHookProps {
    svgRef: React.RefObject<SVGSVGElement>;
    isDragging: boolean;
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
}
