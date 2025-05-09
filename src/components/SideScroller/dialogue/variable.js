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
  },

  // Boss Fight
  greeting_boss: {
    line: "HAHAHAHA! I told you I'd be back.",
    options: ["You're that bug from before!"],
    next: {
        "You're that bug from before!": "explanation_boss"
      }
    },
    explanation_boss: {
      line: "That's right! You've done well to avoid my smaller bugs so far. But let's test those developer skills of yours..",
      options: ["Fine!"],
    next: {
      "Fine!": "boss_question1"
    }
  },
  boss_question1: {
    line: "What is a variable in programming?",
    options: [
      "A container to store data",
      "A fancy name for a function",
      "A bug in your code"
    ],
    next: {
      "A container to store data": "boss_question2",
      "A fancy name for a function": "wrong1",
      "A bug in your code": "wrong1"
    }
  },

  wrong1: {
    line: "I knew that robot Byte couldn't teach you anything useful!",
    options: ["Next question."],
    damage: 25,
    next: {
      "Next question.": "boss_question2"
    }
  },

  boss_question2: {
    line: "Hmm.. Lucky guess. How do we make decisions in code?",
    options: [
      "If/Else statements",
      "Using console.log",
      "Jumping over bugs"
    ],
    next: {
      "If/Else statements": "boss_question3",
      "Using console.log": "wrong2",
      "Jumping over bugs": "wrong2"
    }
  },

  wrong2: {
    line: "Hahahaha, wrong! Last question..",
    options: ["Final question."],
    damage: 25,
    next: {
      "Back to question": "boss_question3"
    }
  },
};

export default dialogue;
