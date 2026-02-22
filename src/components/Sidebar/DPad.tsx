import React from 'react';

interface DPadProps {
    onMove: (dSet: number, dInv: number) => void;
    disableUp?: boolean;
    disableDown?: boolean;
    disableLeft?: boolean;
    disableRight?: boolean;
}

export const DPad: React.FC<DPadProps> = ({
    onMove,
    disableUp = false,
    disableDown = false,
    disableLeft = false,
    disableRight = false,
}) => {
    return (
        <div className="d-pad">
            <button className="up" disabled={disableUp} onClick={() => onMove(-1, 0)}>▲</button>
            <button className="left" disabled={disableLeft} onClick={() => onMove(0, -1)}>◀</button>
            <button className="right" disabled={disableRight} onClick={() => onMove(0, 1)}>▶</button>
            <button className="down" disabled={disableDown} onClick={() => onMove(1, 0)}>▼</button>
        </div>
    );
};
