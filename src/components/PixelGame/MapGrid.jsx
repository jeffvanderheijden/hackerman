import React from "react";
import Tile from "./Tile";

const MapGrid = ({ tileMap, playerPos }) => {
    return (
        <div
            className="grid"
            style={{ gridTemplateColumns: `repeat(${tileMap[0].length}, 32px)` }}
        >
            {tileMap.map((row, y) =>
                row.map((tile, x) => {
                    const isPlayer = playerPos.x === x && playerPos.y === y;
                    return (
                        <Tile key={`${x}-${y}`} tile={tile} isPlayer={isPlayer} />
                    );
                })
            )}
        </div>
    );
};

export default MapGrid;
