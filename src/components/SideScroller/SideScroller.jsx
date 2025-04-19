import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import ParallaxLayer from './components/ParallaxLayer';
import Player from './components/Player';
import NPC from './components/NPC';
import NPC2 from './components/NPC2';
import Tile from './components/Tile';
import HUD from './components/HUD';
import Bug from './components/Bug';
import Boss from './components/Boss';
import CharacterBar from './components/CharacterBar';
import {
    TILE_SIZE,
    HUD_HEIGHT,
    npcPosition,
    npc2Position
} from './game/constants';

import backgroundImage from '/images/background1.png';
import backgroundImage2 from '/images/background2.png';

import useDialogue from './game/useDialogue';
import usePlayer from './game/usePlayer';

import "./SideScroller.css";

const NUM_TILES = 100;

function SideScroller() {
    const [isFading, setIsFading] = useState(false);
    const [cameraOffset, setCameraOffset] = useState(0);
    const [health, setHealth] = useState(100);
    const [lastHitTime, setLastHitTime] = useState(0);
    const [isInvincible, setIsInvincible] = useState(false);
    const [activeNpcPos, setActiveNpcPos] = useState(null);

    const defaultInteraction = {
        line: "Use ← → to move. Press Space to jump. Press [E] to interact.",
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
        setPos,
        posRef,
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
        const INTERACTION_DISTANCE = TILE_SIZE * 2;

        if (activeNpcPos !== null && interaction) {
            const distance = Math.abs(pos.x - activeNpcPos);
            if (distance > INTERACTION_DISTANCE) {
                handleSelect(null); // only closes when walking away from the active NPC
                setActiveNpcPos(null);
            }
        }
    }, [pos.x, interaction, activeNpcPos]);

    const triggerRespawn = () => {
        setIsFading(true); // trigger fade in

        setTimeout(() => {
            setHealth(100);
            setIsInvincible(true);
            setLastHitTime(Date.now());
            setCameraOffset(0);
            setPos({ x: 0, y: 0 });
            posRef.current = { x: 0, y: 0 };

            setIsFading(false); // trigger fade out

            setTimeout(() => {
                setIsInvincible(false);
            }, 2000);
        }, 1000); // delay before respawn
    };

    return (
        <div className={"sideScroller"}>
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
                        playerName={variables.playerName}
                        onInteract={() => {
                            handleNPCInteract("greeting");
                            setActiveNpcPos(npcPosition.x * TILE_SIZE);
                        }}
                    />
                    <NPC2
                        x={npc2Position.x * TILE_SIZE}
                        y={npc2Position.y * TILE_SIZE}
                        size={TILE_SIZE}
                        offset={HUD_HEIGHT}
                        playerX={pos.x}
                        playerName={variables.playerName}
                        onInteract={() => {
                            handleNPCInteract("greeting_ifelse");
                            setActiveNpcPos(npc2Position.x * TILE_SIZE);
                        }}
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
                                const newHealth = Math.max(health - 25, 0);
                                setHealth(newHealth);
                                setLastHitTime(now);
                                setIsInvincible(true);

                                setTimeout(() => setIsInvincible(false), 2000); // 2s invincible

                                if (newHealth <= 0) {
                                    triggerRespawn();
                                }
                            }
                        }}
                    />
                    <Bug
                        x={45 * TILE_SIZE}
                        y={0}
                        size={TILE_SIZE}
                        playerX={pos.x}
                        playerY={pos.y}
                        onCollide={() => {
                            const now = Date.now();
                            if (!isInvincible && now - lastHitTime > 1000) {
                                const newHealth = Math.max(health - 25, 0);
                                setHealth(newHealth);
                                setLastHitTime(now);
                                setIsInvincible(true);

                                setTimeout(() => setIsInvincible(false), 2000); // 2s invincible

                                if (newHealth <= 0) {
                                    triggerRespawn();
                                }
                            }
                        }}
                    />
                    <Boss
                        x={100 * TILE_SIZE}
                        y={0}
                        size={TILE_SIZE}
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

            <AnimatePresence>
                {isFading && (
                    <motion.div
                        className="fade-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    />
                )}
            </AnimatePresence>
            
            <HUD
                interaction={resolvedInteraction}
                onSelect={handleSelect}
                variables={variables}
                selectedOptions={selectedOptions}
            />
        </div>
    );
}

export default SideScroller;
