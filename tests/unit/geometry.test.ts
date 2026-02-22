import { describe, it, expect } from 'vitest';
import { getCoords, calculatePath } from '../../src/utils/geometry';
import { Config } from '../../src/data/config';

describe('Geometry Utils', () => {
    describe('getCoords', () => {
        it('calculates correct coordinates for fretted notes', () => {
            // string 1, fret 3
            const coords = getCoords(1, 3);
            expect(coords.x).toBe(Config.startX + 2.5 * Config.fretSpacing);
            expect(coords.y).toBe(Config.startY);
        });

        it('calculates correct coordinates for open strings (nut)', () => {
            const coords = getCoords(1, 0);
            expect(coords.x).toBe(Config.startX);
            expect(coords.y).toBe(Config.startY);
        });

        it('calculates correct vertical position for different strings', () => {
            const coords1 = getCoords(1, 1);
            const coords6 = getCoords(6, 1);
            expect(coords6.y - coords1.y).toBe(5 * Config.stringSpacing);
        });
    });

    describe('calculatePath', () => {
        it('generates a valid SVG path for a straight line with a curve offset', () => {
            const start = { x: 100, y: 100 };
            const end = { x: 200, y: 100 };
            const path = calculatePath(start, end);

            // distY = 0 <= 50, so offset is 30
            // control point Y = (100+100)/2 - 30 = 70
            // control point X = (100+200)/2 = 150
            expect(path).toBe(`M 100 100 Q 150 70 200 100`);
        });

        it('generates a larger curve offset for distances > 50', () => {
            const start = { x: 100, y: 100 };
            const end = { x: 200, y: 200 };
            const path = calculatePath(start, end);

            // distY = 100 > 50, so offset is 60
            // control point Y = (100+200)/2 - 60 = 150 - 60 = 90
            // control point X = (100+200)/2 = 150
            expect(path).toBe(`M 100 100 Q 150 90 200 200`);
        });
    });
});
