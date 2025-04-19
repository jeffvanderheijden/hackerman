import React, { useState, useEffect } from 'react';
import ParallaxLayer from './components/ParallaxLayer';
import Player from './components/Player';
import NPC from './components/NPC';
import Tile from './components/Tile';
import HUD from './components/HUD';
import CharacterBar from './components/CharacterBar';
import {
    TILE_SIZE,
    HUD_HEIGHT,
    npcPosition
} from './game/constants';

import backgroundImage from '/images/background1.png';
import backgroundImage2 from '/images/background2.png';

import useDialogue from './game/useDialogue';
import usePlayer from './game/usePlayer';

import "./SideScroller.css";

const NUM_TILES = 100;

function SideScroller() {
    const [cameraOffset, setCameraOffset] = useState(0);

    const {
        interaction,
        variables,
        handleSelect,
        handleNPCInteract
    } = useDialogue();

    const {
        pos,
        isMoving,
        isJumping,
        isMovingLeft
    } = usePlayer(NUM_TILES);

    useEffect(() => {
        const scrollThreshold = 300;
        const newOffset = pos.x > scrollThreshold ? pos.x - scrollThreshold : 0;
        setCameraOffset((prevOffset) => (prevOffset !== newOffset ? newOffset : prevOffset));
    }, [pos.x]);

    return (
        <>
            <div className={"sideScrollerContainer"}>
                <ParallaxLayer image={backgroundImage} speed={0.3} opacity={0.3} zIndex={0} offset={cameraOffset} />
                <ParallaxLayer image={backgroundImage2} speed={0.6} opacity={0.8} zIndex={1} offset={cameraOffset} />

                <div
                    className={"scrollLayer"}
                    style={{ transform: `translateX(${-cameraOffset}px)` }}
                >
                    <div className={"ground"}>
                        {Array.from({ length: NUM_TILES }).map((_, i) => (
                            <Tile key={i} size={TILE_SIZE} />
                        ))}
                    </div>

                    <NPC
                        x={npcPosition.x * TILE_SIZE}
                        y={npcPosition.y * TILE_SIZE}
                        size={TILE_SIZE}
                        offset={HUD_HEIGHT}
                        playerX={pos.x}
                        onInteract={handleNPCInteract}
                    />
                    <Player
                        x={pos.x}
                        y={pos.y}
                        size={TILE_SIZE}
                        offset={HUD_HEIGHT}
                        state={isJumping ? 'jump' : isMoving ? 'walk' : 'idle'}
                        facing={isMovingLeft ? 'left' : 'right'}
                    />
                </div>

                <CharacterBar />
            </div>

            <HUD
                interaction={interaction}
                onSelect={handleSelect}
                variables={variables}
            />
        </>
    );
}

export default SideScroller;
