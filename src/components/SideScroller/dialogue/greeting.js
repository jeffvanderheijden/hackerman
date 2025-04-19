function validateNameInput(input) {
  return {
    line: () => `Nice. We'll store "${input}" in a variable.`,
    options: ["OK"],
    set: { playerName: input, metByte: true },
    next: { "OK": "quickIntro" }
  };
}

const dialogue = {
  greeting: {
    line: (vars) =>
      vars.metByte
        ? `Back again, ${vars.playerName}?`
        : "Hey. You must be the new student.",
    options: (vars) => {
      const opts = [];
      if (!vars.metByte) {
        opts.push("Who are you?");
      } else {
        opts.push("Can you explain variables again?");
      }
      return opts;
    },
    next: {
      "Who are you?": "who",
      "Can you explain variables again?": "quickIntro"
    }
  },

  who: {
    line: "I'm Byte. What's your name?",
    options: ["I don't remember my name."],
    next: {
      "I don't remember my name.": "nameInput"
    }
  },

  nameInput: {
    line: "No problem. In code, we use variables to remember stuff. What would you like to be called?",
    type: "input",
    validate: validateNameInput
  },

  quickIntro: {
    line: (vars) => `A variable is like a labeled box in your code — it stores information you want to use later. For example:

let name = "${vars.playerName || 'you'}";

This saves your name in a box called “name”. Later on, if you write:

console.log(name);

It will show what’s inside the box: "${vars.playerName || 'you'}"`,
    options: ["Got it"],
    next: {
      "Got it": "wrapUp"
    }
  },

  wrapUp: {
    line: (vars) => `You've just used ${vars.metByte ? 'a' : 'your first'} variable. Easy, right?`,
    options: ["Yep!", "I want even more info"],
    next: {
      "Yep!": "bugWarning",
      "I want even more info": "variableMoreInfo"
    }
  },

  variableMoreInfo: {
    line: "Here's a cool video that explains variables even more. Opening it now...",
    options: ["Continue"],
    next: {
      "Continue": "bugWarning"
    },
    effect: () => {
      window.open("https://www.youtube.com/watch?v=ghCbURMWBD8", "_blank");
    }
  },

  bugWarning: {
    line: "Oh and watch out for bugs. Annoying little things.",
    options: ["Understood."],
    next: {
      "Understood.": null
    }
  }
};

export default dialogue;
