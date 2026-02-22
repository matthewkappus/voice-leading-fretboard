import { useFretboard } from '../context/FretboardContext';

// Simple wrapper hook combining context actions, essentially just passing through.
export function useVoiceLeading(chordId: string) {
    const { state, setAbsolute, moveRelative } = useFretboard();

    return {
        chordState: state.chords[chordId],
        setAbsolute: (set: number, inv: number) => setAbsolute(chordId, set, inv),
        moveRelative: (dSet: number, dInv: number) => moveRelative(chordId, dSet, dInv)
    };
}
