// useDialogue.js
import { useState } from 'react';
import dialogue1 from './../dialogue/greeting.js';
import dialogue2 from './../dialogue/ifelse.js'; // import new dialogue

const combinedDialogue = {
  ...dialogue1,
  ...dialogue2,
};

export default function useDialogue() {
  const [variables, setVariables] = useState({});
  const [interactionKey, setInteractionKey] = useState(null);
  const [customInteraction, setCustomInteraction] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState(new Set());

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
      const nextKey = interaction?.next?.[result] || null;
      setInteractionKey(nextKey);
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
    selectedOptions
  };
}
