import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppState, Note } from '../types';
import { ChordLibrary } from '../data/chordLibrary';

interface FretboardContextType {
    state: AppState;
    selectChord: (chordId: string) => void;
    setAbsolute: (chordId: string, newSet: number, newInv: number) => void;
    moveRelative: (chordId: string, dSet: number, dInv: number) => void;
    getNotes: (chordId: string) => Note[];
}

const defaultState: AppState = {
    order: ['dm', 'g', 'c'],
    currentChordId: 'dm',
    previousChordId: null,
    chords: {
        'dm': { set: 1, inv: 0 },
        'g': { set: 1, inv: 0 },
        'c': { set: 1, inv: 1 }
    }
};

const FretboardContext = createContext<FretboardContextType | undefined>(undefined);

export const FretboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AppState>(defaultState);

    const selectChord = (chordId: string) => {
        setState((prevState) => {
            if (chordId !== prevState.currentChordId) {
                return {
                    ...prevState,
                    previousChordId: prevState.currentChordId,
                    currentChordId: chordId,
                };
            }
            return prevState;
        });
    };

    const setAbsolute = (chordId: string, newSet: number, newInv: number) => {
        setState((prevState) => ({
            ...prevState,
            chords: {
                ...prevState.chords,
                [chordId]: { set: newSet, inv: newInv },
            }
        }));
    };

    const moveRelative = (chordId: string, dSet: number, dInv: number) => {
        setState((prevState) => {
            const currentState = prevState.chords[chordId];
            // Keep boundaries for sets (0-3) and inversions (0-2)
            const newSet = Math.max(0, Math.min(3, currentState.set + dSet));
            const newInv = Math.max(0, Math.min(2, currentState.inv + dInv));

            return {
                ...prevState,
                chords: {
                    ...prevState.chords,
                    [chordId]: { set: newSet, inv: newInv }
                }
            };
        });
    };

    const getNotes = (chordId: string): Note[] => {
        const chordState = state.chords[chordId];
        if (!chordState) return [];
        return ChordLibrary[chordId].matrix[chordState.set][chordState.inv];
    };

    return (
        <FretboardContext.Provider value={{ state, selectChord, setAbsolute, moveRelative, getNotes }}>
            {children}
        </FretboardContext.Provider>
    );
};

export const useFretboard = () => {
    const context = useContext(FretboardContext);
    if (context === undefined) {
        throw new Error('useFretboard must be used within a FretboardProvider');
    }
    return context;
};
