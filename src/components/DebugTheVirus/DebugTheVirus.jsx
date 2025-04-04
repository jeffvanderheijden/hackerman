// DebugTheVirus.jsx
import React, { useEffect, useState } from "react";
import "./DebugTheVirus.css";

const TOTAL_BUGS = 10;

const DebugTheVirus = () => {
    const [bugs, setBugs] = useState([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(20);
    const [gameStatus, setGameStatus] = useState("Time left: 20 seconds");

    useEffect(() => {
        const newBugs = Array.from({ length: TOTAL_BUGS }, (_, i) => ({
            id: i,
            error: `ERROR: 0x${Math.floor(Math.random() * 9999).toString(16).toUpperCase()}`,
            top: `${Math.random() * 75}%`,
            left: `${Math.random() * 90}%`
        }));
        setBugs(newBugs);
    }, []);

    useEffect(() => {
        if (timeLeft <= 0) {
            if (score < TOTAL_BUGS) {
                setGameStatus("💀 SYSTEM FAILURE. VIRUS TOOK OVER!");
                setBugs([]);
            }
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft, score]);

    useEffect(() => {
        if (score >= TOTAL_BUGS) {
            setGameStatus("✅ SYSTEM CLEANED. VIRUS DEFEATED!");
        }
    }, [score]);

    const handleClick = (id) => {
        setBugs(prev => prev.filter(b => b.id !== id));
        setScore(prev => prev + 1);
    };

    return (
        <div className="debug-container">
            <div className="game-area">
                {bugs.map(bug => (
                    <div
                        key={bug.id}
                        className="code-line"
                        style={{ top: bug.top, left: bug.left }}
                        onClick={() => handleClick(bug.id)}
                    >
                        {bug.error}
                    </div>
                ))}
            </div>
            <div className="status-text">
                {score < TOTAL_BUGS ? `Time left: ${timeLeft} seconds` : gameStatus}
            </div>
        </div>
    );
};

export default DebugTheVirus;
