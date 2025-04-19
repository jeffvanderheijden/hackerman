import React from "react";
import Player from "./Player";

const Tile = ({ tile, isPlayer }) => {
    const getEmoji = () => {
        switch (tile) {
            case 'N': return "👨‍🏫";
            case 'D': return "🚪";
            case 'P': return "🪴";
            case 'B': return "🪑";
            case 'C': return "📹";
            case 'V': return "🥤";
            case 'S': return "🪧";
            case 'L': return "🔒";
            default: return null;
        }
    };

    return (
        <div className={`tile ${tile === 'W' ? 'tile-wall' : 'tile-floor'}`}>
            {!isPlayer && getEmoji() && <span className="npc">{getEmoji()}</span>}
            {isPlayer && <Player />}
        </div>
    );
};

export default Tile;
