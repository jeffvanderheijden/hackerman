// LevelComplete.jsx
import React, { useEffect, useState } from 'react';
import './LevelComplete.css'; // import the styles

export default function LevelComplete({ onContinue }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleKey = () => {
            setVisible(false);
            onContinue();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onContinue]);

    if (!visible) return null;

    return (
        <div className="level-complete-overlay">
            <h1 className="level-complete-text">LEVEL COMPLETE</h1>
            <p className="continue-hint">Press any key to continue</p>
        </div>
    );
}
