import React, { useEffect, useState } from 'react';

const FRAME_COUNT = 3;
const ANIMATION_SPEED = 150; // ms per frame

const Player = ({ x, y, size, state, facing = 'right' }) => {
  const [frame, setFrame] = useState(0);

  // Animate frames on a steady interval
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % FRAME_COUNT);
    }, ANIMATION_SPEED);
    return () => clearInterval(interval);
  }, []); // Only run once

  // Reset frame when state changes
  useEffect(() => {
    setFrame(0);
  }, [state]);

  const imagePath = `/images/playerAnimation/${state}/frame${frame}.png`;

  return (
    <img
      key={`${state}-${frame}`}
      src={imagePath}
      alt={`${state} frame`}
      style={{
        position: 'absolute',
        left: x,
        bottom: y + 8,
        width: size,
        height: size + 14,
        imageRendering: 'pixelated',
        transform: facing === 'left' ? 'scaleX(-1)' : 'none',
      }}
    />
  );
};

export default Player;