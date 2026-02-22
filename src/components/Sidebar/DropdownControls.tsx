import React from 'react';

interface DropdownControlsProps {
    set: number;
    inv: number;
    onChangeAbsolute: (set: number, inv: number) => void;
}

export const DropdownControls: React.FC<DropdownControlsProps> = ({ set, inv, onChangeAbsolute }) => {
    return (
        <div className="dropdown-group">
            <select
                value={set}
                onChange={(e) => onChangeAbsolute(parseInt(e.target.value, 10), inv)}
            >
                <option value={0}>Strings 1-2-3</option>
                <option value={1}>Strings 2-3-4</option>
                <option value={2}>Strings 3-4-5</option>
                <option value={3}>Strings 4-5-6</option>
            </select>
            <select
                value={inv}
                onChange={(e) => onChangeAbsolute(set, parseInt(e.target.value, 10))}
            >
                <option value={0}>Pos 1</option>
                <option value={1}>Pos 2</option>
                <option value={2}>Pos 3</option>
            </select>
        </div>
    );
};
