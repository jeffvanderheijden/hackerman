import React, { useState } from "react";
import MapGrid from "./MapGrid";
import DialogueBox from "./DialogueBox";
import { usePlayerControls } from "./../../hooks/usePlayerControls";
import maps from "./Maps";

const GameMap = () => {
    const [currentMapKey, setCurrentMapKey] = useState("schoolEntrance");
    const [showDialogue, setShowDialogue] = useState(false);
    const [dialogueText, setDialogueText] = useState("");
    const [inventory, setInventory] = useState([]);

    const currentMap = maps[currentMapKey];
    const tileMap = currentMap.layout;

    const { playerPos } = usePlayerControls({
        currentMapKey,
        setCurrentMapKey,
        maps,
        tileMap,
        setShowDialogue,
        setDialogueText,
        inventory,
        setInventory,
    });

    return (
        <div style={{ position: "relative" }}>
            <MapGrid tileMap={tileMap} playerPos={playerPos} />
            {showDialogue && <DialogueBox message={dialogueText} />}
        </div>
    );
};

export default GameMap;
