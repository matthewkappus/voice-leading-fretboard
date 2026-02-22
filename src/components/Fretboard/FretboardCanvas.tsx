import React from 'react';
import { useFretboard } from '../../context/FretboardContext';
import { ChordLibrary } from '../../data/chordLibrary';
import { Grid } from './Grid';
import { VoicePaths } from './VoicePaths';
import { ChordShape } from './ChordShape';

export const FretboardCanvas: React.FC = () => {
    const { state, getNotes } = useFretboard();

    const currentNotes = getNotes(state.currentChordId);
    const previousNotes = state.previousChordId ? getNotes(state.previousChordId) : null;

    const chordData = ChordLibrary[state.currentChordId];
    const chordState = state.chords[state.currentChordId];
    const chordLabelText = chordData && chordState ? `${chordData.name} - Set ${chordState.set + 1}, Pos ${chordState.inv + 1}` : '';

    return (
        <main className="main-content">
            <svg viewBox="0 0 1100 320" className="fretboard-canvas">
                <Grid />

                {state.previousChordId && state.previousChordId !== state.currentChordId && (
                    <VoicePaths prevNotes={previousNotes} currNotes={currentNotes} />
                )}

                {currentNotes && currentNotes.length > 0 && (
                    <ChordShape chordId={state.currentChordId} notes={currentNotes} />
                )}

                <text x="50" y="290" className="chord-label">
                    {chordLabelText}
                </text>
            </svg>
        </main>
    );
};
