import { useEffect } from 'react';

export default function useGameLoop(posRef, velRef, setPos, NUM_TILES, TILE_SIZE, GRAVITY) {
    useEffect(() => {
        let rafId;
        const frame = () => {
            let px = posRef.current.x;
            let py = posRef.current.y;
            let vx = velRef.current.x;
            let vy = velRef.current.y;

            px += vx;
            py += vy;

            if (py > 0 || vy > 0) vy -= GRAVITY;
            if (py <= 0) { py = 0; vy = 0; }
            if (px < 0) px = 0;
            if (px > (NUM_TILES - 1) * TILE_SIZE) px = (NUM_TILES - 1) * TILE_SIZE;

            posRef.current = { x: px, y: py };
            velRef.current.y = vy;
            setPos({ x: px, y: py });

            rafId = requestAnimationFrame(frame);
        };
        rafId = requestAnimationFrame(frame);
        return () => cancelAnimationFrame(rafId);
    }, []);
}
