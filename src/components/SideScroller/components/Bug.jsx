import React, { useEffect, useState } from 'react';

const FRAME_COUNT = 3;
const ANIMATION_SPEED = 200; // ms per frame

const Bug = ({ x, y, size, playerX, playerY, onCollide }) => {
    const [position, setPosition] = useState(x);
    const [direction, setDirection] = useState(1); // 1 = right, -1 = left
    const [frame, setFrame] = useState(0);

    useEffect(() => {
        const moveInterval = setInterval(() => {
            setPosition(prev => {
                let next = prev + direction * 1.5;
                if (next > x + size * 3 || next < x - size * 3) {
                    setDirection(d => -d); // turn around
                }
                return next;
            });
        }, 50);

        return () => clearInterval(moveInterval);
    }, [x, size, direction]);

    useEffect(() => {
        const distanceX = Math.abs(position + size * 0.25 - size * 0.2 - playerX);
        const distanceY = Math.abs(playerY - (y + size * 0.25));
        const hitboxSize = size * 0.5;
        if (distanceX < hitboxSize && distanceY < hitboxSize) {
            onCollide?.();
        }
    }, [playerX, playerY, position, onCollide, size, y]);

    useEffect(() => {
        const animationInterval = setInterval(() => {
            setFrame(prev => (prev + 1) % FRAME_COUNT);
        }, ANIMATION_SPEED);
        return () => clearInterval(animationInterval);
    }, []);

    const imagePath = `/images/Bug/walk/frame${frame}.png`;

    return (
        <img
            src={imagePath}
            alt="Bug"
            style={{
                position: 'absolute',
                left: position,
                bottom: y,
                width: size * 0.75,
                height: size * 0.75,
                imageRendering: 'pixelated',
                zIndex: 2,
                transform: direction === -1 ? 'scaleX(-1)' : 'none'
            }}
        />
    );
};

export default Bug;
