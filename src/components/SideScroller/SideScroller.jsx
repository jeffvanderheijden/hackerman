import React, { useState, useEffect } from 'react';
import ParallaxLayer from './components/ParallaxLayer';
import Player from './components/Player';
import NPC from './components/NPC';
import Tile from './components/Tile';
import HUD from './components/HUD';
import Bug from './components/Bug';
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
    const [health, setHealth] = useState(100);
    const [lastHitTime, setLastHitTime] = useState(0);
    const [isInvincible, setIsInvincible] = useState(false);

    const defaultInteraction = {
        line: "Use ← → to move. Press ↑ or Space to jump. Press [E] to interact.",
        options: []
    };

    const {
        interaction,
        variables,
        handleSelect,
        handleNPCInteract,
        selectedOptions,
    } = useDialogue();

    const resolvedInteraction = interaction
        ? {
            ...interaction,
            line: typeof interaction.line === 'function'
                ? interaction.line(variables)
                : interaction.line,
            options: typeof interaction.options === 'function'
                ? interaction.options(variables)
                : interaction.options
        }
        : defaultInteraction;


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

    useEffect(() => {
        const distance = Math.abs(pos.x - npcPosition.x * TILE_SIZE);
        const INTERACTION_DISTANCE = TILE_SIZE * 2;

        if (distance > INTERACTION_DISTANCE && interaction) {
            // Close the dialogue if player walks away
            handleSelect(null);
        }
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
                    <Bug
                        x={25 * TILE_SIZE}
                        y={0}
                        size={TILE_SIZE}
                        playerX={pos.x}
                        playerY={pos.y}
                        onCollide={() => {
                            const now = Date.now();
                            if (!isInvincible && now - lastHitTime > 1000) {
                                setHealth(h => Math.max(h - 25, 0));
                                setLastHitTime(now);
                                setIsInvincible(true);
                                setTimeout(() => setIsInvincible(false), 2000); // 1 second invincibility
                            }
                        }}
                    />
                    <Player
                        x={pos.x}
                        y={pos.y}
                        size={TILE_SIZE}
                        offset={HUD_HEIGHT}
                        isInvincible={isInvincible}
                        state={isJumping ? 'jump' : isMoving ? 'walk' : 'idle'}
                        facing={isMovingLeft ? 'left' : 'right'}
                    />
                </div>

                <CharacterBar health={health} />
            </div>

            <HUD
                interaction={resolvedInteraction}
                onSelect={handleSelect}
                variables={variables}
                selectedOptions={selectedOptions}
            />
        </>
    );
}

export default SideScroller;
