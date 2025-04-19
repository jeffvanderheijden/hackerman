import { useState } from 'react';
import dialogue from './../dialogue/greeting.js';

export default function useDialogue() {
    const [variables, setVariables] = useState({});
    const [interactionKey, setInteractionKey] = useState(null);
    const [customInteraction, setCustomInteraction] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState(new Set());

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
            setSelectedOptions(prev => new Set(prev).add(result));
        } else {
            setInteractionKey(null);
            setCustomInteraction(null);
        }
    };

    return { interaction, variables, handleSelect, handleNPCInteract, selectedOptions };
}
