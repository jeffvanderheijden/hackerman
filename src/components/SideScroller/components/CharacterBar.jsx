import React from 'react';
import './CharacterBar.css';

const CharacterBar = ({ health = 100 }) => {
    const clampedHealth = Math.max(0, Math.min(100, health));
    const imageUrl = `/images/playerAvatar.png`;

    return (
        <div className="char-bar">
            <img src={imageUrl} alt="Character" className="char-icon" />
            <div className="char-stats">
                <div className="char-label">HP</div>
                <div className="char-health">
                    <div
                        className="char-health-fill"
                        style={{ width: `${clampedHealth}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default CharacterBar;
