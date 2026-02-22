import { Config } from '../data/config';

export function getCoords(string: number, fret: number): { x: number; y: number } {
    return {
        x: fret === 0 ? Config.startX : Config.startX + (fret - 0.5) * Config.fretSpacing,
        y: Config.startY + (string - 1) * Config.stringSpacing
    };
}

export function calculatePath(
    startCoords: { x: number; y: number },
    endCoords: { x: number; y: number }
): string {
    const distY = Math.abs(endCoords.y - startCoords.y);
    const curveOffset = distY > 50 ? 60 : 30;
    return `M ${startCoords.x} ${startCoords.y} Q ${(startCoords.x + endCoords.x) / 2} ${(startCoords.y + endCoords.y) / 2 - curveOffset} ${endCoords.x} ${endCoords.y}`;
}
