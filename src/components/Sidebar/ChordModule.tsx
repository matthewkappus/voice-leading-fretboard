import React from 'react';
import { useFretboard } from '../../context/FretboardContext';
import { useVoiceLeading } from '../../hooks/useVoiceLeading';
import { DropdownControls } from './DropdownControls';
import { DPad } from './DPad';

interface ChordModuleProps {
    chordId: string;
    label: string;
}

export const ChordModule: React.FC<ChordModuleProps> = ({ chordId, label }) => {
    const { state, selectChord } = useFretboard();
    const { chordState, setAbsolute, moveRelative } = useVoiceLeading(chordId);

    const isActive = state.currentChordId === chordId;

    if (!chordState) return null;

    return (
        <div className={`chord-module ${isActive ? 'active' : ''}`}>
            <button className="chord-btn" onClick={() => selectChord(chordId)}>
                {label} <span style={{ display: isActive ? 'inline' : 'none' }}>→</span>
            </button>

            <DropdownControls
                set={chordState.set}
                inv={chordState.inv}
                onChangeAbsolute={setAbsolute}
            />

            <div className="controls-row">
                <div className="helper-text" style={{ fontSize: '11px' }}>
                    Use D-Pad or Drag SVG
                </div>
                <DPad
                    onMove={moveRelative}
                    disableUp={chordState.set <= 0}
                    disableDown={chordState.set >= 3}
                    disableLeft={chordState.inv <= 0}
                    disableRight={chordState.inv >= 2}
                />
            </div>
        </div>
    );
};
