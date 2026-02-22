import React from 'react';
import { FretboardProvider } from './context/FretboardContext';
import { Sidebar } from './components/Sidebar/Sidebar';
import { FretboardCanvas } from './components/Fretboard/FretboardCanvas';
import './styles/global.css';

const App: React.FC = () => {
    return (
        <FretboardProvider>
            <div className="app-container">
                <Sidebar />
                <FretboardCanvas />
            </div>
        </FretboardProvider>
    );
};

export default App;
