import React from 'react';
import { Note } from '../../types';
import { getCoords, calculatePath } from '../../utils/geometry';

interface VoicePathsProps {
    prevNotes: Note[] | null;
    currNotes: Note[];
}

export const VoicePaths: React.FC<VoicePathsProps> = ({ prevNotes, currNotes }) => {
    if (!prevNotes || !currNotes) return null;

    return (
        <>
            {currNotes.map(note => {
                const prevNote = prevNotes.find(n => n.id === note.id);
                if (prevNote) {
                    const start = getCoords(prevNote.s, prevNote.f);
                    const end = getCoords(note.s, note.f);

                    if (start.x !== end.x || start.y !== end.y) {
                        const pathClass = prevNote.lead ? 'voice-path leading-path' : 'voice-path';
                        const pathData = calculatePath(start, end);
                        return (
                            <path key={`path-${note.id}`} d={pathData} className={pathClass} />
                        );
                    }
                }
                return null;
            })}
        </>
    );
};
