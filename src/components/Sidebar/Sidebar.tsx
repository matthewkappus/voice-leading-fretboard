import React from 'react';
import { ChordModule } from './ChordModule';

export const Sidebar: React.FC = () => {
    return (
        <aside className="sidebar">
            <h2>Progression</h2>
            <ChordModule chordId="dm" label="1. Dm (ii)" />
            <ChordModule chordId="g" label="2. G Major (V)" />
            <ChordModule chordId="c" label="3. C Major (I)" />
        </aside>
    );
};
