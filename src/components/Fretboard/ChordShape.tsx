import React from 'react';
import { Note } from '../../types';
import { getCoords } from '../../utils/geometry';
import { useDragInteraction } from '../../hooks/useDragInteraction';

interface ChordShapeProps {
    chordId: string;
    notes: Note[];
}

export const ChordShape: React.FC<ChordShapeProps> = ({ chordId, notes }) => {
    const { isDragging, currentX, currentY, startDrag } = useDragInteraction(chordId);

    const transform = isDragging ? `translate(${currentX}, ${currentY})` : undefined;

    return (
        <g
            className="chord-group"
            transform={transform}
            onMouseDown={startDrag}
            onTouchStart={startDrag}
        >
            {notes.map(note => {
                const coords = getCoords(note.s, note.f);
                const stateClass = note.lead ? 'leading-tone' : (note.res ? 'resolved-tone' : '');

                return (
                    <g
                        key={note.id}
                        className={`note ${stateClass}`}
                        transform={`translate(${coords.x}, ${coords.y})`}
                    >
                        <circle r="16" className="note-circle" />
                        <text className="note-text">{note.n}</text>
                    </g>
                );
            })}
        </g>
    );
};
