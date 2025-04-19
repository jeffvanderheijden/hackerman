import { useEffect, useState } from "react";

const isWalkable = (tile) => tile === '.' || tile === 'N' || tile === 'D' || tile === 'E';

export const usePlayerControls = ({
    currentMapKey,
    setCurrentMapKey,
    maps,
    tileMap,
    setShowDialogue,
    setDialogueText,
    inventory,
    setInventory,
}) => {
    const [playerPos, setPlayerPos] = useState(maps[currentMapKey].startingPosition);
    const [facingDirection, setFacingDirection] = useState({ dx: 0, dy: -1 });

    const movePlayer = (dx, dy) => {
        const newX = playerPos.x + dx;
        const newY = playerPos.y + dy;
        const row = tileMap[newY];
        if (!row) return;

        const tile = row[newX];
        if (!isWalkable(tile)) return;

        setPlayerPos({ x: newX, y: newY });

        setTimeout(() => {
            handleTileInteraction(tile, newX, newY);
        }, 0);
    };

    const handleFacingInteraction = () => {
        const targetX = playerPos.x + facingDirection.dx;
        const targetY = playerPos.y + facingDirection.dy;
        const tile = tileMap?.[targetY]?.[targetX];
        if (tile) {
            handleTileInteraction(tile, targetX, targetY);
        }
    };

    const handleTileInteraction = (tile, x, y) => {
        if (tile === 'N') {
            setDialogueText("Welcome to 404 High! Welcome to 404 High!");
            setShowDialogue(true);
        } else if (tile === 'D') {
            const nextMapKey = currentMapKey === 'schoolEntrance' ? 'classroom1' : 'schoolEntrance';
            const returnPoint = maps[nextMapKey].entryFrom[currentMapKey];
            setCurrentMapKey(nextMapKey);
            setPlayerPos(returnPoint);
            setShowDialogue(false);
        } else if (tile === 'S') {
            const messages = [
                "S..Sy..Syntax...Err...or...",
                "Print your ID to continue...",
                "Access denied? Accepted? Both?",
                "404: Sign not found.",
            ];
            setDialogueText(messages[Math.floor(Math.random() * messages.length)]);
            setShowDialogue(true);
        } else if (tile === 'V') {
            const accepted = window.confirm("Insert a boolean value (true/false)?");
            if (accepted) {
                if (!inventory.includes("keycard")) {
                    setInventory([...inventory, "keycard"]);
                }
                setDialogueText("🥤 Vending success: You received... a keycard?");
            } else {
                setDialogueText("⚠️ The machine groans and spits out nothing.");
            }
            setShowDialogue(true);
        } else if (tile === 'L') {
            if (inventory.includes("keycard")) {
                const nextMapKey = "lockedHallway";
                const returnPoint = maps[nextMapKey]?.entryFrom?.[currentMapKey] || { x: 1, y: 1 };
                setCurrentMapKey(nextMapKey);
                setPlayerPos(returnPoint);
                setShowDialogue(false);
            } else {
                setDialogueText("🔒 Locked. Requires keycard.");
                setShowDialogue(true);
            }
        } else {
            setShowDialogue(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setShowDialogue(false);
            return;
        }

        switch (e.key) {
            case "ArrowUp":
                setFacingDirection({ dx: 0, dy: -1 });
                movePlayer(0, -1);
                break;
            case "ArrowDown":
                setFacingDirection({ dx: 0, dy: 1 });
                movePlayer(0, 1);
                break;
            case "ArrowLeft":
                setFacingDirection({ dx: -1, dy: 0 });
                movePlayer(-1, 0);
                break;
            case "ArrowRight":
                setFacingDirection({ dx: 1, dy: 0 });
                movePlayer(1, 0);
                break;
            case " ":
            case "e":
            case "E":
                handleFacingInteraction();
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    });

    return {
        playerPos,
        facingDirection,
        setFacingDirection,
    };
};

export default usePlayerControls;