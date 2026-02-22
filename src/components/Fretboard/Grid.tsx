import React from 'react';
import { Config } from '../../data/config';

export const Grid: React.FC = () => {
    const fretMarkers = [3, 5, 7, 9, 12];

    const renderMarkers = () => {
        return fretMarkers.flatMap(fret => {
            const cx = Config.startX + (fret - 0.5) * Config.fretSpacing;
            const cy = Config.startY + 2.5 * Config.stringSpacing;

            const markers = [
                <circle key={`marker-${fret}-1`} cx={cx} cy={cy} r="12" className="fret-marker" />
            ];

            if (fret === 12) {
                markers.push(
                    <circle key={`marker-${fret}-2`} cx={cx} cy={cy - Config.stringSpacing} r="12" className="fret-marker" />,
                    <circle key={`marker-${fret}-3`} cx={cx} cy={cy + Config.stringSpacing} r="12" className="fret-marker" />
                );
            }
            return markers;
        });
    };

    const renderFrets = () => {
        return Array.from({ length: Config.frets + 1 }).map((_, i) => {
            const x = Config.startX + i * Config.fretSpacing;
            const className = i === 0 ? 'nut' : 'fret';
            return (
                <line
                    key={`fret-${i}`}
                    x1={x}
                    y1={Config.startY}
                    x2={x}
                    y2={Config.startY + 5 * Config.stringSpacing}
                    className={className}
                />
            );
        });
    };

    const renderStrings = () => {
        return Array.from({ length: Config.strings }).map((_, i) => {
            const y = Config.startY + i * Config.stringSpacing;
            const className = i > 2 ? 'string-thick' : 'string';
            return (
                <line
                    key={`string-${i}`}
                    x1={Config.startX}
                    y1={y}
                    x2={Config.startX + Config.frets * Config.fretSpacing}
                    y2={y}
                    className={className}
                />
            );
        });
    };

    return (
        <>
            {renderMarkers()}
            {renderFrets()}
            {renderStrings()}
        </>
    );
};
