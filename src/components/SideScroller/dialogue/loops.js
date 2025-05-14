const dialogueLoops = {
    greeting_loops: {
      line: (vars) => `Hey ${vars.playerName || "coder"}, ready to repeat yourself?`,
      options: ["Huh?", "Not really."],
      next: {
        "Huh?": "intro",
        "Not really.": null
      }
    },
  
    intro: {
      line: "I’m talking about loops. In code, we use loops to repeat things without writing them over and over.",
      options: ["Give me an example"],
      next: {
        "Give me an example": "example"
      }
    },
  
    example: {
      line: "Say we want to say 'Hi!' 5 times. We’d use a `for` loop:\n\nfor (let i = 0; i < 5; i++) {\n  console.log('Hi!');\n}",
      options: ["Makes sense!", "Why not copy-paste it 5 times?"],
      next: {
        "Makes sense!": "uses",
        "Why not copy-paste it 5 times?": "copyPaste"
      }
    },
  
    copyPaste: {
      line: "You *could*, but loops are smarter. What if you want to say it 1000 times? Or change 'Hi!' to something else?",
      options: ["Ah, got it."],
      next: {
        "Ah, got it.": "uses"
      }
    },
  
    uses: {
      line: "Loops help with all kinds of tasks: animations, checking lists, timing... They're everywhere.",
      options: ["Thanks LoopBot!"],
      next: {
        "Thanks LoopBot!": null
      }
    }
  };
  
  export default dialogueLoops;
  