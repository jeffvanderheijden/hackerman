import React, { useEffect, useState } from 'react';

const FRAME_COUNT = 3;
const ANIMATION_SPEED = 200; // ms per frame

const Boss = ({ x, y, size, state = 'idle', facing = 'left' }) => {
    const [frame, setFrame] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setFrame((prev) => (prev + 1) % FRAME_COUNT);
        }, ANIMATION_SPEED);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setFrame(0);
    }, [state]);

    const imagePath = `/images/Boss/${state}/frame${frame}.png`;

    return (
        <img
            src={imagePath}
            alt={`Boss ${state} frame`}
            style={{
                position: 'absolute',
                left: x,
                bottom: y,
                width: size * 3,
                height: size * 3,
                imageRendering: 'pixelated',
                transform: facing === 'left' ? 'scaleX(-1)' : 'none',
                zIndex: 5,
            }}
        />
    );
};

export default Boss;