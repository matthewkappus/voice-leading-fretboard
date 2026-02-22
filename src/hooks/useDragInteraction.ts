import { useState, useCallback, useEffect } from 'react';
import { Config } from '../data/config';
import { useFretboard } from '../context/FretboardContext';

export function useDragInteraction(chordId: string) {
    const { moveRelative } = useFretboard();

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const [currentY, setCurrentY] = useState(0);

    const startDrag = useCallback((e: React.MouseEvent<SVGGElement> | React.TouchEvent<SVGGElement>) => {
        setIsDragging(true);
        let clientX, clientY;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        setStartX(clientX);
        setStartY(clientY);
        setCurrentX(0);
        setCurrentY(0);
    }, []);

    useEffect(() => {
        const handleDrag = (e: MouseEvent | TouchEvent) => {
            if (!isDragging) return;
            let clientX, clientY;
            if (window.TouchEvent && e instanceof TouchEvent) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = (e as MouseEvent).clientX;
                clientY = (e as MouseEvent).clientY;
            }
            setCurrentX(clientX - startX);
            setCurrentY(clientY - startY);
        };

        const handleEndDrag = () => {
            if (!isDragging) return;
            setIsDragging(false);

            const stringMove = Math.round(currentY / Config.stringSpacing);
            const fretMove = Math.round(currentX / Config.fretSpacing);

            const dSet = stringMove > 0 ? 1 : (stringMove < 0 ? -1 : 0);
            const dInv = fretMove > 0 ? 1 : (fretMove < 0 ? -1 : 0);

            if (dSet !== 0 || dInv !== 0) {
                moveRelative(chordId, dSet, dInv);
            }

            setCurrentX(0);
            setCurrentY(0);
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleDrag);
            document.addEventListener('mouseup', handleEndDrag);
            document.addEventListener('touchmove', handleDrag);
            document.addEventListener('touchend', handleEndDrag);
        }

        return () => {
            document.removeEventListener('mousemove', handleDrag);
            document.removeEventListener('mouseup', handleEndDrag);
            document.removeEventListener('touchmove', handleDrag);
            document.removeEventListener('touchend', handleEndDrag);
        };
    }, [isDragging, startX, startY, currentX, currentY, chordId, moveRelative]);

    return { isDragging, currentX, currentY, startDrag };
}
