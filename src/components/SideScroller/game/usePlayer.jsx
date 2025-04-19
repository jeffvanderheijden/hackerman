import { useRef, useState } from 'react';
import useControls from './useControls';
import useGameLoop from './useGameLoop';
import { TILE_SIZE, GRAVITY } from './constants';

export default function usePlayer(numTiles) {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const posRef = useRef(pos);
    const velRef = useRef({ x: 0, y: 0 });
    const keys = useRef({ left: false, right: false });

    useControls(keys, velRef, posRef);
    useGameLoop(posRef, velRef, setPos, numTiles, TILE_SIZE, GRAVITY);

    const isMoving = keys.current.left || keys.current.right;
    const isJumping = pos.y > 0;
    const isMovingLeft = keys.current.left && !keys.current.right;

    return { pos, posRef, velRef, keys, isMoving, isJumping, isMovingLeft, setPos};
}
