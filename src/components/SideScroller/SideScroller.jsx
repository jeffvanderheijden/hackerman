import React, { useState, useRef, useEffect } from 'react';
import Player from './components/PlayerAnimated';
import NPC from './components/NPC';
import Tile from './components/Tile';
import HUD from './components/HUD';
import CharacterBar from './components/CharacterBar';
import useControls from './game/useControls';
import useGameLoop from './game/useGameLoop';
import {
    TILE_SIZE,
    GRAVITY,
    HUD_HEIGHT,
    npcPosition
} from './game/constants';
import dialogue from './dialogue/greeting.js';

import backgroundImage from '/images/background1.png';
import backgroundImage2 from '/images/background2.png';

const NUM_TILES = 100;

function SideScroller() {
    const [variables, setVariables] = useState({});
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [cameraOffset, setCameraOffset] = useState(0);
    const [interactionKey, setInteractionKey] = useState(null);
    const [customInteraction, setCustomInteraction] = useState(null);

    const posRef = useRef(pos);
    const velRef = useRef({ x: 0, y: 0 });
    const keys = useRef({ left: false, right: false });

    useControls(keys, velRef, posRef);
    useGameLoop(posRef, velRef, setPos, NUM_TILES, TILE_SIZE, GRAVITY);

    useEffect(() => {
        const scrollThreshold = 300;
        const newOffset = pos.x > scrollThreshold ? pos.x - scrollThreshold : 0;
        setCameraOffset((prevOffset) => (prevOffset !== newOffset ? newOffset : prevOffset));
    }, [pos.x]);

    const isMoving = keys.current.left || keys.current.right;
    const isJumping = pos.y > 0;
    const isMovingLeft = keys.current.left && !keys.current.right;

    const rawInteraction = customInteraction || (interactionKey ? dialogue[interactionKey] : null);
    const interaction = typeof rawInteraction?.line === 'function'
        ? { ...rawInteraction, line: rawInteraction.line(variables) }
        : rawInteraction;

    const handleNPCInteract = () => {
        setInteractionKey("greeting");
        setCustomInteraction(null);
    };

    const handleSelect = (result) => {
        if (typeof result === 'object' && result !== null && result.line) {
            if (result.set) {
                setVariables(prev => ({ ...prev, ...result.set }));
            }
            setCustomInteraction(result);
        } else if (typeof result === 'string') {
            const nextKey = interaction?.next?.[result] || null;
            setInteractionKey(nextKey);
            setCustomInteraction(null);
        } else {
            setInteractionKey(null);
            setCustomInteraction(null);
        }
    };

    return (
        <>
            <div style={styles.container}>
                {/* Parallax Background Layer 1 */}
                <div
                    style={{
                        ...styles.parallax,
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundPosition: `${-cameraOffset * 0.3}px center`,
                        opacity: 0.3,
                        zIndex: 0,
                    }}
                />

                {/* Parallax Background Layer 2 (new) */}
                <div
                    style={{
                        ...styles.parallax,
                        backgroundImage: `url(${backgroundImage2})`,
                        backgroundPosition: `${-cameraOffset * 0.6}px center`,
                        opacity: 0.8,
                        zIndex: 1,
                    }}
                />

                <div
                    style={{
                        ...styles.scrollLayer,
                        transform: `translateX(${-cameraOffset}px)`
                    }}
                >
                    <div style={styles.ground}>
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

const styles = {
    container: {
        position: 'relative',
        backgroundColor: 'black',
        height: '320px',
        width: '50%',
        paddingBottom: `${HUD_HEIGHT}px`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },
    parallax: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundRepeat: 'repeat-x',
        backgroundSize: 'auto 100%',
        pointerEvents: 'none',
    },
    scrollLayer: {
        position: 'relative',
        transition: 'transform 0.01s linear',
        zIndex: 1,
    },
    ground: {
        display: 'flex',
    },
};

export default SideScroller;
