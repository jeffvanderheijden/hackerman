import React, { useEffect, useState } from 'react';

const FRAME_COUNT = 3;
const ANIMATION_SPEED = 200; // ms per frame
const SPEECH_TEXT = "Hello, human.";

const NPC = ({ x, y, size, offset, onInteract, playerX }) => {
  const [frame, setFrame] = useState(0);
  const [isNearby, setIsNearby] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % FRAME_COUNT);
    }, ANIMATION_SPEED);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsNearby(Math.abs(playerX - x) < size);
  }, [playerX, x, size]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'KeyE' && isNearby) {
        if (document.activeElement.tagName === 'INPUT') return;
        
        setShowBubble(true);
        setTypedText("");
        onInteract?.({
            line: SPEECH_TEXT,
            options: ["Who are you?", "Where am I?", "Bye."]
        });
        let index = 0;
        const typeInterval = setInterval(() => {
          setTypedText((prev) => {
            const next = prev + SPEECH_TEXT[index];
            index++;
            if (index >= SPEECH_TEXT.length) clearInterval(typeInterval);
            return next;
          });
        }, 30);

        setTimeout(() => setShowBubble(false), 3000);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isNearby, onInteract]);

  const imagePath = `/images/NPC1/idle/frame${frame}.png`;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        bottom: y - 8,
        width: size,
        height: size + 10,
        imageRendering: 'pixelated',
        zIndex: 1,
      }}
    >
      {showBubble && (
        <div
          style={{
            position: 'absolute',
            top: -40,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0, 0, 0, 0.6)',
            borderRadius: '10px',
            color: '#FFF',
            fontFamily: 'monospace',
            padding: '6px 10px',
            fontSize: '12px',
            whiteSpace: 'nowrap',
          }}
        >
          {typedText}
          <div
            style={{
              position: 'absolute',
              bottom: -2,
              left: '50%',
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid rgba(0, 0, 0, 0.6)',
              transform: 'translateX(-50%)',
            }}
          />
        </div>
      )}
      <img
        src={imagePath}
        alt="Cyberpunk Robot NPC"
        style={{
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default NPC;
