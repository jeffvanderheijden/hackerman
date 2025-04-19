import { useEffect } from 'react';

export default function useControls(keys, velRef, posRef) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === "ArrowLeft") {
                keys.current.left = true;
                velRef.current.x = -2;
            } else if (e.code === "ArrowRight") {
                keys.current.right = true;
                velRef.current.x = 2;
            } else if (e.code === "Space") {
                if (posRef.current.y === 0) {
                    velRef.current.y = 10;
                }
            }
        };

        const handleKeyUp = (e) => {
            if (e.code === "ArrowLeft") {
                keys.current.left = false;
                velRef.current.x = keys.current.right ? 2 : 0;
            } else if (e.code === "ArrowRight") {
                keys.current.right = false;
                velRef.current.x = keys.current.left ? -2 : 0;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);
}
