function validateNameInput(input) {
  return {
    line: (vars) => `Nice to meet you, ${input}.`,
    options: ["Continue"],
    set: { playerName: input, metByte: true }, // ✅ store name & flag
    next: { "Continue": "greetingAgain" }
  };
}

const dialogue = {
  greeting: {
    line: (vars) =>
      vars.metByte
        ? `Hello again, ${vars.playerName || 'stranger'}.`
        : "Hello, human.",
    options: ["Who are you?", "Where am I?", "Bye."],
    next: {
      "Who are you?": "who",
      "Where am I?": null,
      "Bye.": null
    }
  },
  who: {
    line: "I'm Byte. Who are you?",
    options: ["I don't remember my name.."],
    next: {
      "I don't remember my name..": "more"
    }
  },
  more: {
    line: "No name, huh? Fine, we'll store one for you. In code, we use a variable. It's like a labeled box where we keep stuff.",
    type: "input",
    validate: validateNameInput
  },
  greetingAgain: {
    line: (vars) => `Ready to continue, ${vars.playerName || 'stranger'}?`,
    options: ["Yes", "Not yet"],
    next: {
      "Yes": null,
      "Not yet": null
    }
  }
};

export default dialogue;
