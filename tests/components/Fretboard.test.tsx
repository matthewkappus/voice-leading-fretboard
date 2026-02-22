import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../src/App';
import { FretboardProvider } from '../../src/context/FretboardContext';
import { FretboardCanvas } from '../../src/components/Fretboard/FretboardCanvas';

describe('Fretboard Component', () => {
    it('renders grid, current notes, and chord label', () => {
        render(
            <FretboardProvider>
                <FretboardCanvas />
            </FretboardProvider>
        );

        // Initial chord is Dm, Set 1 = index 1 (Strings 2-3-4), Pos 1 = index 0
        // The label is Set 2, Pos 1 (it's 1-indexed in UI)
        const label = screen.getByText('D minor (ii) - Set 2, Pos 1');
        expect(label).toBeInTheDocument();

        // Notes for Dm, Set 1, Inv 0: D, A, F
        expect(screen.getByText('D')).toBeInTheDocument();
        expect(screen.getByText('A')).toBeInTheDocument();
        expect(screen.getByText('F')).toBeInTheDocument();
    });

    it('fires drag events on chord shape', () => {
        render(<App />);

        // Grab the first note group (part of chord shape)
        const notesGroup = document.querySelector('.chord-group') as Element;
        expect(notesGroup).toBeTruthy();

        // Trigger mousedown to start drag
        fireEvent.mouseDown(notesGroup, { clientX: 100, clientY: 100 });

        // Check if dragging state is active (transform translate added based on mouse movement)
        fireEvent.mouseMove(document, { clientX: 120, clientY: 120 });

        const transform = notesGroup.getAttribute('transform');
        expect(transform).toContain('translate');

        // Mouse up
        fireEvent.mouseUp(document);
    });
});
