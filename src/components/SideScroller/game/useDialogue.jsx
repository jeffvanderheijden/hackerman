// useDialogue.js
import { useState } from 'react';
import dialogue1 from './../dialogue/variable.js';
import dialogue2 from './../dialogue/ifelse.js';
import dialogue3 from './../dialogue/loops.js';
import bossDialogue from './../dialogue/boss.js';

const combinedDialogue = {
  ...dialogue1,
  ...dialogue2,
  ...dialogue3,
  ...bossDialogue
};

export default function useDialogue(setHealth) {
  const [variables, setVariables] = useState({});
  const [interactionKey, setInteractionKey] = useState(null);
  const [customInteraction, setCustomInteraction] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState(new Set());
  const [hasCompletedGame, setHasCompletedGame] = useState(false);

  const rawInteraction = customInteraction || (interactionKey ? combinedDialogue[interactionKey] : null);
  const interaction = typeof rawInteraction?.line === 'function'
    ? { ...rawInteraction, line: rawInteraction.line(variables) }
    : rawInteraction;

  const handleNPCInteract = (key = "greeting") => {
    setInteractionKey(key);
    setCustomInteraction(null);
  };

  const handleSelect = (result) => {
    if (typeof result === 'object' && result !== null && result.line) {
      if (result.set) {
        setVariables(prev => ({ ...prev, ...result.set }));
      }
      if (result.effect) {
        result.effect();
      }
      setCustomInteraction(result);
    } else if (typeof result === 'string') {
      const nextKey = interaction?.next?.[result];
      const nextInteraction = combinedDialogue[nextKey];

      // 💥 Check for damage
      if (nextInteraction?.damage) {
        setHealth?.(prev => Math.max(prev - nextInteraction.damage, 0));
      }

      // 🏁 Game complete detection
      if (interactionKey === "boss_defeated" && result === "Escape the program") {
        setHasCompletedGame(true);
      }

      setInteractionKey(nextKey || null);
      setCustomInteraction(null);
      setSelectedOptions(prev => new Set(prev).add(result));
    } else {
      setInteractionKey(null);
      setCustomInteraction(null);
    }
  };

  return {
    interaction,
    variables,
    handleSelect,
    handleNPCInteract,
    selectedOptions,
    hasCompletedGame
  };
}
