import React from 'react';
import './CharacterBar.css';

const CharacterBar = ({ health = 100 }) => {
    const clampedHealth = Math.max(0, Math.min(100, health));
    const imageUrl = `/images/playerAvatar.png`;

    let fillColor = '#00FF00'; // green
    if (clampedHealth <= 25) fillColor = '#FF0000'; // red
    else if (clampedHealth <= 50) fillColor = '#FFA500'; // orange

    return (
        <div className="char-bar">
            <img src={imageUrl} alt="Character" className="char-icon" />
            <div className="char-stats">
                <div className="char-label">HP</div>
                <div className="char-health">
                    <div
                        className="char-health-fill"
                        style={{
                            width: `${clampedHealth}%`,
                            backgroundColor: fillColor,
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default CharacterBar;
