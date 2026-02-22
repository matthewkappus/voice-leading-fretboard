import { ChordData } from '../types';

export const ChordLibrary: Record<string, ChordData> = {
    'dm': {
        name: "D minor (ii)",
        matrix: [
            [[{ s: 1, f: 1, n: "F", id: "v1" }, { s: 2, f: 3, n: "D", id: "v2" }, { s: 3, f: 2, n: "A", id: "v3" }],
            [{ s: 1, f: 5, n: "A", id: "v1" }, { s: 2, f: 6, n: "F", id: "v2" }, { s: 3, f: 7, n: "D", id: "v3" }],
            [{ s: 1, f: 10, n: "D", id: "v1" }, { s: 2, f: 10, n: "A", id: "v2" }, { s: 3, f: 10, n: "F", id: "v3" }]],
            [[{ s: 2, f: 3, n: "D", id: "v1" }, { s: 3, f: 2, n: "A", id: "v2" }, { s: 4, f: 3, n: "F", id: "v3" }],
            [{ s: 2, f: 6, n: "F", id: "v1" }, { s: 3, f: 7, n: "D", id: "v2" }, { s: 4, f: 7, n: "A", id: "v3" }],
            [{ s: 2, f: 10, n: "A", id: "v1" }, { s: 3, f: 10, n: "F", id: "v2" }, { s: 4, f: 12, n: "D", id: "v3" }]],
            [[{ s: 3, f: 2, n: "A", id: "v1" }, { s: 4, f: 3, n: "F", id: "v2" }, { s: 5, f: 5, n: "D", id: "v3" }],
            [{ s: 3, f: 7, n: "D", id: "v1" }, { s: 4, f: 7, n: "A", id: "v2" }, { s: 5, f: 8, n: "F", id: "v3" }],
            [{ s: 3, f: 10, n: "F", id: "v1" }, { s: 4, f: 12, n: "D", id: "v2" }, { s: 5, f: 12, n: "A", id: "v3" }]],
            [[{ s: 4, f: 3, n: "F", id: "v1" }, { s: 5, f: 5, n: "D", id: "v2" }, { s: 6, f: 5, n: "A", id: "v3" }],
            [{ s: 4, f: 7, n: "A", id: "v1" }, { s: 5, f: 8, n: "F", id: "v2" }, { s: 6, f: 10, n: "D", id: "v3" }],
            [{ s: 4, f: 12, n: "D", id: "v1" }, { s: 5, f: 12, n: "A", id: "v2" }, { s: 6, f: 13, n: "F", id: "v3" }]]
        ]
    },
    'g': {
        name: "G Major (V)",
        matrix: [
            [[{ s: 1, f: 3, n: "G", id: "v1" }, { s: 2, f: 3, n: "D", id: "v2" }, { s: 3, f: 4, n: "B", id: "v3", lead: true }],
            [{ s: 1, f: 7, n: "B", id: "v1", lead: true }, { s: 2, f: 8, n: "G", id: "v2" }, { s: 3, f: 7, n: "D", id: "v3" }],
            [{ s: 1, f: 10, n: "D", id: "v1" }, { s: 2, f: 12, n: "B", id: "v2", lead: true }, { s: 3, f: 12, n: "G", id: "v3" }]],
            [[{ s: 2, f: 3, n: "D", id: "v1" }, { s: 3, f: 4, n: "B", id: "v2", lead: true }, { s: 4, f: 5, n: "G", id: "v3" }],
            [{ s: 2, f: 8, n: "G", id: "v1" }, { s: 3, f: 7, n: "D", id: "v2" }, { s: 4, f: 9, n: "B", id: "v3", lead: true }],
            [{ s: 2, f: 12, n: "B", id: "v1", lead: true }, { s: 3, f: 12, n: "G", id: "v2" }, { s: 4, f: 12, n: "D", id: "v3" }]],
            [[{ s: 3, f: 4, n: "B", id: "v1", lead: true }, { s: 4, f: 5, n: "G", id: "v2" }, { s: 5, f: 5, n: "D", id: "v3" }],
            [{ s: 3, f: 7, n: "D", id: "v1" }, { s: 4, f: 9, n: "B", id: "v2", lead: true }, { s: 5, f: 10, n: "G", id: "v3" }],
            [{ s: 3, f: 12, n: "G", id: "v1" }, { s: 4, f: 12, n: "D", id: "v2" }, { s: 5, f: 14, n: "B", id: "v3", lead: true }]],
            [[{ s: 4, f: 5, n: "G", id: "v1" }, { s: 5, f: 5, n: "D", id: "v2" }, { s: 6, f: 7, n: "B", id: "v3", lead: true }],
            [{ s: 4, f: 9, n: "B", id: "v1", lead: true }, { s: 5, f: 10, n: "G", id: "v2" }, { s: 6, f: 10, n: "D", id: "v3" }],
            [{ s: 4, f: 12, n: "D", id: "v1" }, { s: 5, f: 14, n: "B", id: "v2", lead: true }, { s: 6, f: 15, n: "G", id: "v3" }]]
        ]
    },
    'c': {
        name: "C Major (I)",
        matrix: [
            [[{ s: 1, f: 3, n: "G", id: "v1" }, { s: 2, f: 5, n: "E", id: "v2" }, { s: 3, f: 5, n: "C", id: "v3", res: true }],
            [{ s: 1, f: 8, n: "C", id: "v1", res: true }, { s: 2, f: 8, n: "G", id: "v2" }, { s: 3, f: 9, n: "E", id: "v3" }],
            [{ s: 1, f: 12, n: "E", id: "v1" }, { s: 2, f: 13, n: "C", id: "v2", res: true }, { s: 3, f: 12, n: "G", id: "v3" }]],
            [[{ s: 2, f: 1, n: "C", id: "v1", res: true }, { s: 3, f: 0, n: "G", id: "v2" }, { s: 4, f: 2, n: "E", id: "v3" }],
            [{ s: 2, f: 5, n: "E", id: "v1" }, { s: 3, f: 5, n: "C", id: "v2", res: true }, { s: 4, f: 5, n: "G", id: "v3" }],
            [{ s: 2, f: 8, n: "G", id: "v1" }, { s: 3, f: 9, n: "E", id: "v2" }, { s: 4, f: 10, n: "C", id: "v3", res: true }]],
            [[{ s: 3, f: 5, n: "C", id: "v1", res: true }, { s: 4, f: 5, n: "G", id: "v2" }, { s: 5, f: 7, n: "E", id: "v3" }],
            [{ s: 3, f: 9, n: "E", id: "v1" }, { s: 4, f: 10, n: "C", id: "v2", res: true }, { s: 5, f: 10, n: "G", id: "v3" }],
            [{ s: 3, f: 12, n: "G", id: "v1" }, { s: 4, f: 14, n: "E", id: "v2" }, { s: 5, f: 15, n: "C", id: "v3", res: true }]],
            [[{ s: 4, f: 2, n: "E", id: "v1" }, { s: 5, f: 3, n: "C", id: "v2", res: true }, { s: 6, f: 3, n: "G", id: "v3" }],
            [{ s: 4, f: 5, n: "G", id: "v1" }, { s: 5, f: 7, n: "E", id: "v2" }, { s: 6, f: 8, n: "C", id: "v3", res: true }],
            [{ s: 4, f: 10, n: "C", id: "v1", res: true }, { s: 5, f: 10, n: "G", id: "v2" }, { s: 6, f: 12, n: "E", id: "v3" }]]
        ]
    }
};
