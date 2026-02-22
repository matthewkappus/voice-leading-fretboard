import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { FretboardProvider, useFretboard } from '../../src/context/FretboardContext';

describe('Fretboard Context State', () => {
    it('initializes with default state', () => {
        const { result } = renderHook(() => useFretboard(), { wrapper: FretboardProvider });

        expect(result.current.state.currentChordId).toBe('dm');
        expect(result.current.state.chords['dm'].set).toBe(1);
        expect(result.current.state.chords['dm'].inv).toBe(0);
    });

    it('selects a different chord', () => {
        const { result } = renderHook(() => useFretboard(), { wrapper: FretboardProvider });

        act(() => {
            result.current.selectChord('g');
        });

        expect(result.current.state.currentChordId).toBe('g');
        expect(result.current.state.previousChordId).toBe('dm');
    });

    it('moves relative within boundaries', () => {
        const { result } = renderHook(() => useFretboard(), { wrapper: FretboardProvider });

        act(() => {
            // Dm starts at set: 1, inv: 0
            result.current.moveRelative('dm', 1, 1);
        });

        expect(result.current.state.chords['dm'].set).toBe(2);
        expect(result.current.state.chords['dm'].inv).toBe(1);
    });

    it('enforces boundaries when navigating the D-Pad', () => {
        const { result } = renderHook(() => useFretboard(), { wrapper: FretboardProvider });

        act(() => {
            // Dm starts at set: 1, inv: 0. Set can go 0-3, inv 0-2.
            // Move set down (negative) a bunch, and inv negative.
            result.current.moveRelative('dm', -5, -5);
        });

        expect(result.current.state.chords['dm'].set).toBe(0);
        expect(result.current.state.chords['dm'].inv).toBe(0);

        act(() => {
            // Move set up (positive) a bunch, and inv positive.
            result.current.moveRelative('dm', 10, 10);
        });

        expect(result.current.state.chords['dm'].set).toBe(3);
        expect(result.current.state.chords['dm'].inv).toBe(2);
    });

    it('sets absolute position', () => {
        const { result } = renderHook(() => useFretboard(), { wrapper: FretboardProvider });

        act(() => {
            result.current.setAbsolute('dm', 3, 2);
        });

        expect(result.current.state.chords['dm'].set).toBe(3);
        expect(result.current.state.chords['dm'].inv).toBe(2);
    });
});
